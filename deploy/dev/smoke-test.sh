#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../.."
scratch=$(mktemp -d "${TMPDIR:-/tmp}/kan47.XXXXXX")
project="kan47-test-$(date +%s)-$$"
password=$(openssl rand -hex 24)
http_port=${KAN47_TEST_HTTP_PORT:-18080}
https_port=${KAN47_TEST_HTTPS_PORT:-18443}

stack() {
  docker compose --project-name "$project" --env-file "$scratch/stack.env" \
    -f deploy/dev/compose.yml "$@"
}

cleanup() {
  result=$?
  trap - EXIT
  if ! stack down --volumes --remove-orphans; then
    echo 'Could not remove the temporary test stack.' >&2
    result=1
  fi
  rm -rf "$scratch"
  exit "$result"
}

mkdir "$scratch/tls"
openssl req -x509 -newkey rsa:2048 -nodes -days 1 \
  -keyout "$scratch/tls/privkey.pem" -out "$scratch/tls/fullchain.pem" \
  -subj /CN=localhost -addext subjectAltName=DNS:localhost >/dev/null 2>&1
cat > "$scratch/stack.env" <<EOF
API_IMAGE=${KAN47_TEST_IMAGE:-messenger-api:kan47}
API_DOMAIN=localhost
CORS_ORIGIN=http://localhost:3000
POSTGRES_DB=messenger
POSTGRES_USER=messenger
POSTGRES_PASSWORD=$password
TLS_CERTS_DIR=$scratch/tls
HTTP_BIND=127.0.0.1
HTTP_PORT=$http_port
HTTPS_PORT=$https_port
EOF
chmod 600 "$scratch/stack.env"
trap cleanup EXIT

stack config --quiet
stack up -d --wait --wait-timeout 180
stack exec -T nginx nginx -t

health() {
  curl --fail --silent --show-error --cacert "$scratch/tls/fullchain.pem" \
    "https://localhost:$https_port/api/health"
}
test "$(health)" = '{"status":"ok"}'
headers=$(curl --fail --silent --show-error --cacert "$scratch/tls/fullchain.pem" \
  -H 'Origin: http://localhost:3000' -D - -o /dev/null \
  "https://localhost:$https_port/api/health")
[[ "$headers" == *'access-control-allow-origin: http://localhost:3000'* ]]
headers=$(curl --silent --show-error -D - -o /dev/null "http://localhost:$http_port/api/health")
[[ "$headers" == *'308 Permanent Redirect'* ]]
[[ "$headers" == *'Location: https://localhost/api/health'* ]]
echo 'PASS: HTTPS with certificate verification, API health, CORS and HTTP redirect'

for service in postgres redis api; do
  bindings=$(docker inspect --format '{{json .HostConfig.PortBindings}}' "$(stack ps -q "$service")")
  [[ "$bindings" == '{}' || "$bindings" == 'null' ]]
done
stack exec -T api node --input-type=module -e '
  import assert from "node:assert/strict";
  import fs from "node:fs";
  import { createRequire } from "node:module";
  const require = createRequire(import.meta.url);
  const shared = require("@app/shared");
  assert.equal(shared.SocketEvents.MESSAGE_SEND, "message:send");
  assert.equal(shared.UserSchema.safeParse({}).success, false);
  assert.notEqual(process.getuid(), 0);
  assert.equal(fs.existsSync("src"), false);
  assert.equal(fs.existsSync(".env"), false);
  for (const pkg of ["typescript", "@nestjs/cli", "vitest"]) {
    assert.throws(() => require.resolve(pkg), { code: "MODULE_NOT_FOUND" });
  }
'
echo 'PASS: internal ports unpublished, non-root runtime, compiled shared, no API sources/dev tools/env'

# A transport fixture checks the proxy without adding Socket.IO to the real API.
stack exec -d api node --input-type=module -e '
  import http from "node:http";
  import { createHash } from "node:crypto";
  const server = http.createServer((req, res) => {
    if (req.url !== "/socket.io/?EIO=4&transport=polling") {
      res.writeHead(400).end(); return;
    }
    res.end("polling-ok");
  });
  server.on("upgrade", (req, socket) => {
    const accept = createHash("sha1")
      .update(req.headers["sec-websocket-key"] + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
      .digest("base64");
    socket.end("HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: " + accept + "\r\n\r\n");
  });
  server.listen(3002, "0.0.0.0");
'
stack exec -T nginx sh -c "sed -i 's/api:3001/api:3002/' /etc/nginx/conf.d/default.conf && nginx -s reload"
for attempt in {1..15}; do
  polling=$(curl --silent --show-error --cacert "$scratch/tls/fullchain.pem" \
    "https://localhost:$https_port/socket.io/?EIO=4&transport=polling")
  [[ "$polling" == polling-ok ]] && break
  sleep 1
done
test "$polling" = polling-ok
docker run --rm --network "${project}_edge" \
  -v "$scratch/tls/fullchain.pem:/tmp/ca.pem:ro" \
  "${KAN47_TEST_IMAGE:-messenger-api:kan47}" node --input-type=module -e '
    import tls from "node:tls";
    import fs from "node:fs";
    import assert from "node:assert/strict";
    const socket = tls.connect({
      host: "nginx", port: 443, servername: "localhost",
      ca: fs.readFileSync("/tmp/ca.pem"),
    });
    const timeout = setTimeout(() => { socket.destroy(); process.exit(1); }, 5000);
    socket.on("error", (err) => { console.error(err); process.exit(1); });
    socket.on("secureConnect", () => socket.write(
      "GET /socket.io/?EIO=4&transport=websocket HTTP/1.1\r\nHost: localhost\r\nConnection: Upgrade\r\nUpgrade: websocket\r\nSec-WebSocket-Version: 13\r\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\r\n\r\n"
    ));
    let headers = "";
    socket.on("data", data => {
      headers += data;
      if (!headers.includes("\r\n\r\n")) return;
      assert.match(headers, /^HTTP\/1.1 101 Switching Protocols/);
      assert.match(headers, /sec-websocket-accept: s3pPLMBiTxaQ9kYGzzhZRbK\+xOo=/i);
      clearTimeout(timeout);
      socket.destroy();
    });
  '
stack exec -T nginx sh -c "sed -i 's/api:3002/api:3001/' /etc/nginx/conf.d/default.conf && nginx -s reload"
echo 'PASS: polling path/query preserved and WebSocket upgrade forwarded (transport fixture)'

stack exec -T postgres psql -U messenger -d messenger -v ON_ERROR_STOP=1 \
  -c 'CREATE TABLE kan47_probe (value text); INSERT INTO kan47_probe VALUES ('"'persisted'"');' >/dev/null
stack exec -T redis redis-cli SET kan47:probe persisted >/dev/null
# Redis AOF uses appendfsync everysec; wait for its disk sync before recreation.
sleep 2
nginx_id=$(stack ps -q nginx)
stack up -d --no-deps --force-recreate --wait --wait-timeout 120 api
test "$(stack ps -q nginx)" = "$nginx_id"
for attempt in {1..15}; do
  if response=$(health 2>/dev/null) && [[ "$response" == '{"status":"ok"}' ]]; then
    break
  fi
  sleep 1
done
test "$response" = '{"status":"ok"}'
echo 'PASS: Nginx reaches the recreated API without restarting Nginx'

stack down
stack up -d --wait --wait-timeout 180
test "$(stack exec -T postgres psql -U messenger -d messenger -Atc 'SELECT value FROM kan47_probe')" = persisted
test "$(stack exec -T redis redis-cli GET kan47:probe)" = persisted
test "$(health)" = '{"status":"ok"}'
logs=$(stack logs --no-color)
[[ "$logs" != *"$password"* ]]
echo 'PASS: PostgreSQL/Redis data survives down/up; generated password absent from service logs'
stack ps -a
echo 'KAN-47 smoke test passed'

# Общий dev-стенд

[KAN-47](https://project-group-11.atlassian.net/browse/KAN-47): конфигурация API, PostgreSQL, Redis и Nginx.
Команды выполняются из корня монорепозитория. Нужны Docker с Compose и существующие сертификаты.
Локальная инфраструктура по-прежнему запускается через `pnpm infra:up`; это отдельный Compose-проект.

## Образ API

```sh
docker build -f apps/api/Dockerfile -t messenger-api:kan47 .
```

Контекст сборки — корень монорепозитория. В сборке используются Node.js `24.22.3-bookworm-slim`
и pnpm `9.15.0` из `packageManager`. Зависимости устанавливаются по `pnpm-lock.yaml`.
В финальном образе — собранный API и production-зависимости, включая скомпилированный `@app/shared`.
Сам пакет в репозитории продолжает отдавать TypeScript. Процесс запускается пользователем `node`, без pnpm,
dev-зависимостей и исходников API. Этот Dockerfile предназначен и для будущего production.

Compose получает готовый образ через `API_IMAGE`; сборки на VDS нет. В KAN-49 здесь будет образ GHCR
с полным SHA проверенного коммита. Конфигурация стенда должна браться из того же коммита.

## Настройка и запуск

1. Скопируйте [шаблон переменных](./dev/.env.example) **вне репозитория**, например в
   `/etc/messenger-dev/stack.env`, и ограничьте права: `chmod 600 /etc/messenger-dev/stack.env`.
2. Заполните `API_IMAGE`, домен и пароль PostgreSQL. Никаких секретов в Git, аргументах сборки или образе.
3. Подготовьте существующий каталог `TLS_CERTS_DIR` с `fullchain.pem` (полная цепочка) и `privkey.pem`.
   Nginx монтирует его только для чтения. Для ACME-каталогов с символическими ссылками монтируйте весь каталог,
   содержащий и ссылки, и их цели, либо подготовьте отдельный каталог с копиями файлов.
   Права должны позволять master-процессу Nginx прочитать ключ, без общего доступа к нему.
4. Проверьте конфигурацию и запустите сервисы:

```sh
docker compose --env-file /etc/messenger-dev/stack.env -f deploy/dev/compose.yml config --quiet
docker compose --env-file /etc/messenger-dev/stack.env -f deploy/dev/compose.yml up -d --wait --wait-timeout 180
docker compose --env-file /etc/messenger-dev/stack.env -f deploy/dev/compose.yml ps -a
curl --fail https://api.example.com/api/health
```

Не выводите `docker compose config` без `--quiet`: развёрнутая конфигурация содержит пароль.
Переменные терминала имеют приоритет над `--env-file`; перед запуском проверьте, что в терминале нет
переменных от другого окружения. Обязательные пустые значения останавливают Compose до запуска.

| Переменная                     | Назначение                                                                        |
| ------------------------------ | --------------------------------------------------------------------------------- |
| `API_IMAGE`                    | Готовый образ API с тегом коммита; для локальной проверки — `messenger-api:kan47` |
| `API_DOMAIN`                   | DNS-имя без схемы, порта и пути, например `api.example.com`                       |
| `CORS_ORIGIN`                  | Один разрешённый origin локального фронтенда, например `http://localhost:3000`    |
| `POSTGRES_DB`, `POSTGRES_USER` | Имя базы и пользователь; обязательны                                              |
| `POSTGRES_PASSWORD`            | Обязательный пароль, без значения по умолчанию                                    |
| `TLS_CERTS_DIR`                | Абсолютный путь к существующему каталогу сертификата и ключа                      |
| `HTTP_BIND`                    | По умолчанию `0.0.0.0`; для локальной проверки — `127.0.0.1`                      |
| `HTTP_PORT`, `HTTPS_PORT`      | По умолчанию `80`, `443`; тест использует `18080`, `18443`                        |

Внутренние адреса API: `postgres:5432`, `redis:6379`, HTTP-порт `3001`. Порты PostgreSQL, Redis и API
на хост не публикуются. PostgreSQL и Redis находятся в сети `backend` с `internal: true`.
API и Nginx находятся также в сети `edge`; API может обращаться к внешним сервисам.
Redis работает без пароля в изолированной сети и сохраняет AOF с синхронизацией раз в секунду.

Nginx передаёт исходный путь и query string, заголовки HTTPS и WebSocket; polling Socket.IO тоже идёт в API.
`proxy_read_timeout=75s` должен превышать сумму `pingInterval + pingTimeout` будущего сервера Socket.IO.
Docker DNS перечитывается после смены IP API. HTTP перенаправляется на стандартный HTTPS-порт 443.
При локальной проверке с нестандартным портом используйте HTTPS-адрес явно.

## Проверки, данные и остановка

```sh
docker compose --env-file /etc/messenger-dev/stack.env -f deploy/dev/compose.yml exec nginx nginx -t
docker compose --env-file /etc/messenger-dev/stack.env -f deploy/dev/compose.yml logs --tail 100 api nginx
docker compose --env-file /etc/messenger-dev/stack.env -f deploy/dev/compose.yml down
```

Compose-проект имеет фиксированное имя `messenger-dev`: обновления из разных каталогов используют те же
volumes `postgres_data` и `redis_data`. `down` и пересоздание контейнеров сохраняют данные.
Не применяйте `down --volumes` на стенде: это удаляет данные. Смена пароля в env-файле не меняет пароль
в уже созданной базе. Резервные копии volumes — отдельная эксплуатационная задача.

Healthcheck PostgreSQL проверяет готовность сервера, Redis — `PING`, API — ответ `/api/health` со статусом `ok`,
Nginx — собственный внутренний HTTP endpoint на неопубликованном порту 8080. Внешнюю доступность проверяйте
через HTTPS. `/api/health` пока показывает только работоспособность HTTP-процесса: подключение PostgreSQL
проверяется при старте API, Redis-клиент и Socket.IO ещё не реализованы.
`restart: unless-stopped` восстанавливает завершившиеся процессы; статус `unhealthy` сам по себе не перезапускает
контейнер и не заменяет внешний мониторинг.

Повторяемая проверка на отдельном временном Compose-проекте (нужны также Bash, curl и OpenSSL):

```sh
bash deploy/dev/smoke-test.sh
```

Тест создаёт временный пароль и самоподписанный сертификат, запускает стек на loopback,
проверяет HTTPS/CORS, отсутствие публикации внутренних портов и сохранение данных после пересоздания.
Проверка polling и WebSocket использует временный HTTP-сервер в тестовом контейнере: это проверка
транспорта через Nginx, а не полноценного сервера Socket.IO, которого в API пока нет.
После теста удаляет только свой временный проект и его volumes. Существующие локальные сервисы не затрагивает.

## Следующие подзадачи

- KAN-48: подготовка VDS, DNS, первый выпуск сертификата и автоматическое продление с reload Nginx,
  согласование CORS и проверка другим разработчиком. После обновления файлов сертификата необходим reload:
  `docker compose --env-file /etc/messenger-dev/stack.env -f deploy/dev/compose.yml exec nginx nginx -s reload`.
  Публичный HTTPS без действующего сертификата не запустится; сертификаты и ключи не входят в репозиторий.
- KAN-49: сборка/публикация образа, доставка конфигурации, повторы деплоя и откат; выполнение миграций
  согласуется с появлением схемы БД. Сейчас таблиц и миграций нет, образ API не запускает миграции автоматически.
- KAN-50: Grafana, Loki, Alloy, ротация Docker-логов и внешний мониторинг. Сейчас логи идут в stdout/stderr.
  Access log Nginx не содержит query string, заголовков и тела; диагностические error logs Nginx могут
  содержать URI запроса. Не передавайте секреты в URL; не логируйте токены и содержимое переписок в API.

Production получит отдельный `deploy/prod/` с собственными секретами, данными и фронтендом.
Решение по структуре и Nginx — [ADR-0013](../docs/adr/0013-shared-dev-environment.md).

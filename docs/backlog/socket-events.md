# События WebSocket в `@app/shared`

[← к бэклогу](./README.md) · Jira: —

## Зачем

Realtime в ТЗ — socket.io. Swagger описывает только HTTP, поэтому события WebSocket (названия и формат данных) нужно
описать отдельно, и это главная работа для `@app/shared`: его импортируют и бэкенд, и фронтенд, значит при изменении
события TypeScript подсветит обе стороны.

Отдельный документ (например, AsyncAPI) не нужен: для одной монорепы на TypeScript типов в `@app/shared` достаточно.

## Что сделать

- [ ] Описать события как интерфейсы `ClientToServerEvents` и `ServerToClientEvents` — socket.io принимает их
      дженериками и на сервере, и в клиенте (проверить по документации socket.io раздел про TypeScript).
- [ ] Данные событий **обоих направлений** описать Zod-схемами в `@app/shared`, типы для интерфейсов выше — через
      `z.infer`. Бэкенд обязательно проверяет то, что прислал клиент, так же, как тело HTTP-запроса — клиенту доверять
      нельзя. Фронтенд проверяет данные от сервера той же схемой — как ответы HTTP.
- [ ] Заменить текущий `enum SocketEvents` и пример `UserSchema` в `packages/shared/src/index.ts`.
- [ ] Учесть требования ТЗ: проверка прав на каждое событие; удалённый из канала участник перестаёт получать сообщения
      через уже открытое соединение; повторная отправка сообщения не создаёт дубль (id сообщения от клиента). Как
      именно — [ADR-0010](../adr/0010-realtime-messaging.md).

## Набросок контракта (из прототипа KAN-33)

Прототип проверял только новые сообщения (`message:send`, `message:new`, догрузку). Номера `seq`/`changeSeq`,
изменения, треды и стриминг добавлены по решениям [ADR-0010](../adr/0010-realtime-messaging.md) и в прототипе не
проверялись.
Имена и поля окончательно фиксируются в этой задаче.

```ts
type Message = {
  id: string // bigint из Postgres приходит строкой: number в JS точен только до 2^53
  seq: string // место в ленте канала, выдаётся при создании
  changeSeq: string // номер последнего изменения в канале; догрузка идёт по нему
  clientId: string // uuid от клиента, уникален вместе с userId
  userId: string
  channelId: string
  parentId: string | null // id исходного сообщения, если это ответ в треде
  text: string // пустой у удалённого
  createdAt: string // ISO
  editedAt: string | null
  deletedAt: string | null // удаление мягкое: строка остаётся, чтобы догрузка могла сообщить об удалении
}

type Ack<T> = (response: ({ ok: true } & T) | { ok: false; error: string }) => void

interface ClientToServerEvents {
  'message:send': (payload: { channelId: string; clientId: string; text: string }, ack: Ack<{ message: Message }>) => void
  'message:sync': (
    payload: { channelId: string; afterChangeSeq: string | null },
    ack: Ack<{ messages: Message[]; hasMore: boolean }>,
  ) => void
}

interface ServerToClientEvents {
  'message:new': (message: Message) => void
  'message:updated': (message: Message) => void // правка, удаление, реакции — текущее состояние целиком
  'ai:stream': (payload: { channelId: string; requestId: string; delta: string }) => void // без БД, только живым
}
```

- `message:send` на повтор с тем же `clientId` отвечает `ok: true` с уже сохранённым сообщением и не рассылает его.
- `message:new` получают все в комнате канала, кроме отправляющего сокета: отправитель узнаёт результат из ack.
- `message:sync` клиент вызывает на каждом `connect`, пока `hasMore`. Ответ — текущее состояние сообщений, изменённых
  после `afterChangeSeq`. Клиент заменяет сообщение по `id` и запоминает наибольший `changeSeq`.
- Ответы в треде — те же `message:new` / `message:updated` с `parentId`. В ленте канала клиент их не показывает, а
  под исходным сообщением обновляет счётчик ответов.
- `ai:stream` — куски ответа ИИ во время генерации. Готовый ответ приходит обычным `message:new`.

Установка socket.io — после согласия команды.

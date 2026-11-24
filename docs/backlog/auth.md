# Авторизация

[← к бэклогу](./README.md) · Jira: [KAN-51](https://project-group-11.atlassian.net/browse/KAN-51) (бэкенд),
[KAN-56](https://project-group-11.atlassian.net/browse/KAN-56) (вход через GitHub)

## Зачем

Способ входа выбран: email и пароль, серверная сессия в `httpOnly`-cookie —
[ADR-0013](../adr/0013-auth-server-session.md). Здесь — что осталось сделать вне задачи бэкенда.

## Фронтенд

- [ ] Страниц входа и регистрации ещё нет: `features/auth` — заготовка из шаблона. В настоящей форме входа нет
      «Запомнить меня»: в контракте её нет, срок сессии один для всех.
- [ ] До первой формы — [клиент API](./api-client.md): клиент Orval должен ходить на бэкенд и видеть ответы 4xx.
      При запросах напрямую на `API_URL` — с `credentials: 'include'`, иначе браузер не отправит cookie сессии.
- [ ] `apps/web/src/shared/api/session.ts` проверяет ответ через `UserSchema` из `@app/shared` — заменить на тип `User`,
      сгенерированный Orval для `GET /api/auth/me` (то же в тесте `features/auth/model/schemas.test.ts`), а `UserSchema`
      из `@app/shared` удалить. HTTP-схемы живут в `apps/api` ([ADR-0009](../adr/0009-api-contract-openapi-orval.md)).

## WebSocket

- [ ] Когда подключим socket.io: пользователь определяется по той же cookie при подключении; при выходе или удалении
      из канала сервер отключает соединение или выводит его из комнаты канала.

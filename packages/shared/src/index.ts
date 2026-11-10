import { z } from "zod";

export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string().min(2),
});

export type User = z.infer<typeof UserSchema>;

export enum SocketEvents {
  MESSAGE_SEND = "message:send",
  MESSAGE_RECEIVE = "message:receive",
}

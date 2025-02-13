import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";

export async function UsersRoutes(app: FastifyInstance) {
  app.post("/users", register);

  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);
}

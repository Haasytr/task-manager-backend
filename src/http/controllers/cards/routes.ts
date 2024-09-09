import { FastifyInstance } from "fastify";
import { create } from "domain";
import { get } from "./get";
import { update } from "./update";
import { remove } from "./remove";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function CardsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/cards/create", create);

  app.get("/cards/get", get);

  app.patch("/cards/update", update);

  app.delete("/cards/delete/:id", remove);
}

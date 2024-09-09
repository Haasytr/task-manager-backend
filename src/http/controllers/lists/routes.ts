import { FastifyInstance } from "fastify";
import { get } from "./get";
import { update } from "./update";
import { remove } from "./remove";
import { create } from "./create";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function ListsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
  app.post("/lists/create", create);

  app.get("/lists/get", get);

  app.patch("/lists/update", update);

  app.delete("/lists/delete/:id", remove);
}

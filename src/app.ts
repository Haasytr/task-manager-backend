import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import { UsersRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { ListsRoutes } from "./http/controllers/lists/routes";
import { CardsRoutes } from "./http/controllers/cards/routes";

import cors from "@fastify/cors";

export const app = fastify();

app.register(cors);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "7d",
  },
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
});
app.register(fastifyCookie);

app.register(UsersRoutes);
app.register(ListsRoutes);
app.register(CardsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO here we hsould log to an external tool like Datadog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error." });
});

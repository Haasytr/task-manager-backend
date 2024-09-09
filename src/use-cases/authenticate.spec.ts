import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });
  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Jonh Doe",
      email: "jonhdoe@exemple.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "jonhdoe@exemple.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("not should be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "jonhdoe@exemple.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("not should be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "Jonh Doe",
      email: "jonhdoe@exemple.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "jonhdoe@exemple.com",
        password: "123",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});

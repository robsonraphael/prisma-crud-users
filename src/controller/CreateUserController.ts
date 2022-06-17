import { Prisma } from "../database/prismaClient";
import { Request, Response } from "express";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, name, password } = request.body;

    const user = await Prisma.user
      .create({
        data: {
          name,
          email,
          password,
        },
      })
      .then(() => {
        return "👨🏾 Registered User";
      })
      .catch((error) => {
        return error;
      });

    return response.json(user);
  }
}

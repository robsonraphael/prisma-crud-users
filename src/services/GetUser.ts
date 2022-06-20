import { Prisma } from "../database/prismaClient";
import { Request, Response } from "express";

export const GetUser: any = async (request: Request, response: Response) => {
  const { id }: any = request.params;
  const user: object = await Prisma.user
    .findUnique({
      where: {
        id,
      },
      select: {
        createdAt: true,
        name: true,
        email: true,
        salt: true,
        hash: true,
      },
    })
    .then((sucess) => {
      if (sucess === null) {
        return response.status(401).json("⚠️ Error User Not Found");
      } else {
        return response.status(201).json(sucess);
      }
    })
    .catch(() => {
      return response.status(401).json("⚠️ Error User Not Found");
    });
};

import { Prisma } from "../database/prismaClient";
import { Request, Response } from "express";

export const GetAllUsers: any = async (
  request: Request,
  response: Response
) => {
  const user: object = await Prisma.user
    .findMany({
      select: {
        name: true,
      },
    })
    .then((sucess) => {
      return response.status(201).json(sucess);
    })
    .catch((error) => {
      return response.status(401).json(error);
    });
};

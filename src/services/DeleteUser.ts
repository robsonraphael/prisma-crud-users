import { Prisma } from "../database/prismaClient";
import { Request, Response } from "express";

export const DeleteUser: any = async (request: Request, response: Response) => {
  const { id }: any = request.params;
  const user : object = await Prisma.user
    .delete({
      where: {
        id,
      },
    })
    .then((sucess) => {
      if (sucess === null) {
        return response.status(404).json("⚠️ Error User Not Found");
      }
      return  response.json(sucess)
    })
    .catch(() => {
      return response.status(404).json("⚠️ Error User not found");
    });
};

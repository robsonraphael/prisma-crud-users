import { Prisma } from "../database/prismaClient";
import { Request, Response } from "express";

// validation
import { _passwordIsValid } from "../validation/passwordValidate";
import bcrypt from "bcrypt";

export const UpdatePassword : any = async (request: Request, response: Response) => {
  const { id } : any = request.params;
  const { password } : any = request.body;
  let salt: any, hash: any;
  let STATUS: any = {};

  const passwordIsValid: boolean = (function () {
    if (!!_passwordIsValid.validate(password)) {
      salt = bcrypt.genSaltSync(10);
      hash = bcrypt.hashSync(password, salt);
      return true;
    } else {
      STATUS.password = "⚠️ Error, Password is Invalid";
      return false;
    }
  })();

  if (!!passwordIsValid) {
    const update : object = await Prisma.user
      .update({
        where: {
          id,
        },
        data: {
          salt,
          hash,
        },
      })
      .then((sucess) => {
        if (sucess === null) {
          return response.status(403).json("⚠️ Error User Not Found");
        }
        return response.status(203).json(sucess);
      })
      .catch(() => {
        return response.status(403).json("⚠️ Error User not Found");
      });
  } else {
    return response.status(403).json(STATUS);
  }
};

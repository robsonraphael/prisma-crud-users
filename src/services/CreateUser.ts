import { Prisma } from "../database/prismaClient";
import { Request, Response } from "express";

// Validation
import { _passwordIsValid } from "../validation/passwordValidate";
import { _emailIsValid } from "../validation/emailValidate";
import bcrypt from "bcrypt";

export const CreateUser: any = async (request: Request, response: Response) => {
  const { email, name, password }: any = request.body;
  let salt: any, hash: any;
  let STATUS: any = {};

  const userIsValid: boolean = (function () {
    // Name Validate
    const nameIsValid: boolean = (function () {
      if (
        !!name &&
        !RegExp("[0-9]").test(name) &&
        !!RegExp("[A-Z]").test(name)
      ) {
        return true;
      } else {
        STATUS.name = "Error, Name is Invalid";
        return false;
      }
    })();

    // Email Validade
    const emailIsValid: boolean = (function () {
      if (!!_emailIsValid.validate(email)) {
        return true;
      } else {
        STATUS.email = "Error, Email is Invalid";
        return false;
      }
    })();

    // Password Validate
    const passwordIsValid: boolean = (function () {
      if (!!_passwordIsValid.validate(password)) {
        salt = bcrypt.genSaltSync(10);
        hash = bcrypt.hashSync(password, salt);
        return true;
      } else {
        STATUS.password = "Error, Password is Invalid";
        return false;
      }
    })();

    // Is Valid ?
    if (!!nameIsValid && !!emailIsValid && !!passwordIsValid) {
      return true;
    } else {
      return false;
    }
  })();

  // Add User to db
  const addUserDB: object = (async function () {
    if (!!userIsValid) {
      const user: object = await Prisma.user
        .create({
          data: {
            name,
            email,
            salt,
            hash,
          },
        })
        .then(() => {
          return response.status(200).json("👨🏾 User Registered");
        })
        .catch((error) => {
          return response.status(400).json(error);
        });
    } else {
      response.statusCode = 400;
      return response.json(STATUS);
    }
  })();
};

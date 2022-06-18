import { Prisma } from "../database/prismaClient";
import { Request, Response} from "express";

// Validation
import { _passwordIsValid } from "../validation/passwordValidate";
import { _emailIsValid } from "../validation/emailValidate";
import bcrypt from 'bcrypt';

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, name, password } = request.body;
    let salt : any, hash : any;
    let STATUS : any = {}

    let userIsValid : boolean = (function () {
      // Name Validate
      const nameIsValid : boolean = (function () {
        if (!!name && !/[0-9]/.test(name)) {
          return true;
        } else {
          STATUS.name = "Error, Name is Invalid"
          return false
        }
      })();
      console.log(`${name}: ${nameIsValid}`);

      // Email Validade
      const emailIsValid : boolean = (function () {
        if (!!_emailIsValid.validate(email)) {
          return true;
        } else {
          STATUS.email = "Error, Email is Invalid"
          return false;
        }
      })();
      console.log(`${email}: ${emailIsValid}`);

      // Password Validate
      const passwordIsValid = (function () {
        if (!!_passwordIsValid.validate(password)) {
          salt = bcrypt.genSaltSync(10);
          hash = bcrypt.hashSync(password, salt);
          console.log(`salt: ${salt} \n hash: ${hash}`)
          return true;
        } else {
          STATUS.password = "Error, Password is Invalid"
          return false;
        }
      })();
      console.log(`${password}: ${passwordIsValid}`);

      // Is Valid ?
      if (!!nameIsValid && !!emailIsValid && !!passwordIsValid) {
        return true;
      } else {
        return false;
      }
    })();
    
    // Add User to db
    if (!!userIsValid) {
      const user = await Prisma.user
        .create({
          data: {
            name,
            email,
            salt,
            hash,
          },
        })
        .then(() => {
          response.statusCode = 200
          return response.json("👨🏾 Registered User");
        })
        .catch((error) => {
          response.statusCode = 400
          return response.json(error);
        });
      console.log(user);
    } else {
      response.statusCode = 401
      return response.json(STATUS);
    }
  }
}

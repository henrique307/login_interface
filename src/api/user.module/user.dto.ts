import { IsEmail, Length } from "class-validator";
import { addEmitHelpers } from "typescript";

class userDTO {
  constructor(
    obj: {
      email:string,
      senha:string
    }
  ) {
    this.email = obj.email
    this.senha = obj.senha
  }
  @IsEmail( {}, {message:"formato do campo email é invalido"} )
  email: string;

  @Length(10, 50, {message:"sua senha deve conter entre 10 e 50 caracteres"})
  senha: string;
};

export { userDTO };

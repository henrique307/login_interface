import { IsEmail, Length } from "class-validator";
import { addEmitHelpers } from "typescript";
import bcrypt from 'bcrypt';

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
  readonly email: string;

  @Length(10, 50, {message:"sua senha deve conter entre 10 e 50 caracteres"})
  private senha: string;

  encryptaSenha() {
    this.senha = bcrypt.hashSync(this.senha, 15)
  }

  compara(senha:string) {
    return bcrypt.compareSync(senha, this.senha)
  }

  senhaGetter() {
    return this.senha
  }
}; 

export { userDTO };

import { NotFoundException } from "@nestjs/common";
import { validateSync, ValidationError } from "class-validator";
import { Request, Response } from "express";
import { userDTO } from "./user.dto";

class UserController {

  static usuarios: Array<userDTO> = [
    new userDTO({email: "henrique@email.com", senha:"senhaSegura"})
  ]

  static login(req:Request, res:Response) {
    const usuario = new userDTO(req.body)

    const encontrado = !!UserController.usuarios.find((usr:userDTO) => {
      return usr.email === usuario.email && usr.senha === usuario.senha
    })

    if(!encontrado) {
      res.status(404).send(new NotFoundException("Usuário não encontrado").getResponse())
      return;
    }

    res.status(200).send("bem vindo!");
  }
  
  static cadastro(req:Request, res:Response) {
    const usuario = new userDTO(req.body);
    
    const erros = validateSync(usuario).map((erro:ValidationError) => {
      return {
        campo: erro.property,
        mensagem: erro.constraints
      }
    })

    if(erros.length) {
      res.status(400).send(erros)
      return
    }

    UserController.usuarios.push(usuario)

    res.status(200).send("usuario cadastrado com sucesso!")
  }
}

export { UserController }
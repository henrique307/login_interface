import { BadRequestException, NotFoundException } from "@nestjs/common";
import { validateSync, ValidationError } from "class-validator";
import { Request, Response } from "express";
import { userDTO } from "./user.dto";

class UserController {

  static usuarios: Array<userDTO> = [
    new userDTO({
      email: 'henrique@email.com',
      senha: '$2b$15$hWgTsqRSBESo85PlI6haV.G5l1OJf2wiZA7MvST8ggtNxOuoNo/Ny'
    })
  ]

  static login(req:Request, res:Response) {
    const usuario:userDTO = new userDTO(req.body)

    const usuarioEncontrado = UserController.usuarios.find((usr:userDTO) => usr.email === usuario.email)

    const senhasCombinam = usuarioEncontrado.compara(usuario.senhaGetter())

    if(!usuarioEncontrado || !senhasCombinam) {
      res.status(400)
         .send(new BadRequestException("credenciais não coincidem")
         .getResponse())
      
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

    console.log(req.query)

    usuario.encryptaSenha()

    if(erros.length) {
      res.status(400).send(erros)
      return
    }

    UserController.usuarios.push(usuario)

    console.log(usuario)

    res.status(200).send("usuario cadastrado com sucesso!")
  }
}

export { UserController }
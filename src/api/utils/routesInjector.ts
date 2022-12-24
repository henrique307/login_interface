import express, { Request, Response } from 'express'
import { Application } from "express";
import { userRouter } from '../user.module/user.router';

function routesInjector(app:Application) {
  app.get('/', (req:Request, res:Response) => {
    res.send({message:"tudo rodando bonitinho por aqui =)"})
  })

  app.use(
    express.json(),
    userRouter
  )
}

export { routesInjector }
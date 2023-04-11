import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Routes from './routes'
import { container, injectable } from 'tsyringe'

@injectable()
class App {
  public express: express.Application
  private routes: Routes

  public constructor () {
    this.express = express()
    this.routes = container.resolve(Routes)

    this.initMiddlewares()
    this.initDatabase()
    this.initRoutes()
  }

  private initMiddlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private initDatabase (): void {
    mongoose.connect('mongodb://127.0.0.1:27017/agendamento')
  }

  private initRoutes (): void {
    this.express.use(this.routes.getRoutes())
  }
}

export default App

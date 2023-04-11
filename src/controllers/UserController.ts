import { Request, Response } from 'express'
import { injectable, container } from 'tsyringe'

import User from '../models/User'
import CrudService from '../services/CrudService'

@injectable()
class UserController {
  private crudService: CrudService

  constructor () {
    this.crudService = container.resolve(CrudService)
  }

  public create = async (req: Request, res: Response) => {
    try {
      const { email } = req.body

      const responseService = await this.crudService.create({
        model: User,
        paramsFilter: { email },
        paramsSave: req.body
      })

      if (!responseService.status) {
        return res.status(400).send({ error: responseService.message })
      }

      return res.send(responseService.object)
    } catch (e) {
      console.error(e)
      return res.status(400).send({ error: 'Error to create user' })
    }
  }

  public async index (req: Request, res: Response) {
    const users = await User.find()

    return res.json(users)
  }
}

export default UserController

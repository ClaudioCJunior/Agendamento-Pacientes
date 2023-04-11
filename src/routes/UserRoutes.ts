import { Router } from 'express'
import { container, injectable } from 'tsyringe'

import UserController from '../controllers/UserController'

@injectable()
class UserRoutes {
  public router: Router

  constructor () {
    this.router = Router()
    this.router.route('/').post(container.resolve(UserController).create)
  }
}

export default UserRoutes

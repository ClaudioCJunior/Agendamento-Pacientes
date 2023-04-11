import { Router } from 'express'
import { container, injectable } from 'tsyringe'

import AuthController from '../controllers/AuthController'

@injectable()
class AuthRoutes {
  public router: Router

  constructor () {
    this.router = Router()
    this.router.route('/').post(container.resolve(AuthController).authenticate)
  }
}

export default AuthRoutes

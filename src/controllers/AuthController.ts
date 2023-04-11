import { Response, Request } from 'express'
import User from '../models/User'
import * as bcrypt from 'bcryptjs'
import AuthService from '../services/AuthService'
import { container, injectable } from 'tsyringe'

@injectable()
class AuthController {
  private authService: AuthService

  constructor () {
    this.authService = container.resolve(AuthService)
  }

  public authenticate = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) return res.status(400).send({ error: 'User not found' })

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ error: 'Password Invalid' })
      }

      return res.send({
        user,
        token: this.authService.generateToken({ id: user.id })
      })
    } catch (e) {
      console.log(e)

      return res.status(400).send({ error: 'Registration Failed' })
    }
  }
}

export default AuthController

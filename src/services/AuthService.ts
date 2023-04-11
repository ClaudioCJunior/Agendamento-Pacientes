import * as jwt from 'jsonwebtoken'
import * as authConfig from '../config/auth.json'
import { injectable } from 'tsyringe'

@injectable()
class AuthService {
  public generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
      expiresIn: 86400
    })
  }
}

export default AuthService

import * as jwt from 'jsonwebtoken'
import * as authConfig from '../config/auth.json'
import { Response, Request, NextFunction } from 'express'
import TokenInterface from '../Interfaces/TokenInterface'
import { injectable } from 'tsyringe'

@injectable()
class AuthMiddleware {
  public auth = async (req: Request, res: Response, next: NextFunction) => {
    const validToken = await this.validateToken(req)

    if (!validToken.validate) {
      return res.status(401).send({ error: validToken.message })
    }

    (<any>req).userId = validToken.userId

    return next()
  }

  private validateToken = async (req: Request): Promise<TokenInterface> => {
    const authHeader = req.headers.authorization

    if (!authHeader) return { validate: false, message: 'No token provided' }

    const partsToken = authHeader.split(' ')

    if (partsToken.length !== 2) return { validate: false, message: 'Token error' }

    const [scheme, token] = partsToken

    if (!/^Bearer$/i.test(scheme)) return { validate: false, message: 'Token malformatted' }

    try {
      const decoded = jwt.verify(token, authConfig.secret)

      return { validate: true, message: 'Token valid', userId: (<any>decoded).id }
    } catch (err) {
      return { validate: false, message: 'Token Invalid' }
    }
  }
}

export default AuthMiddleware

import UserRoutes from './routes/UserRoutes'
import AuthRoutes from './routes/AuthRoutes'
import { Router } from 'express'
import { container, injectable } from 'tsyringe'
import AuthMiddleware from './middlewares/AuthMiddleware'
import PatientRoutes from './routes/PatientRoutes'

@injectable()
class Routes {
  private routes: Router

  private authMiddleware: AuthMiddleware

  private userRoutes: UserRoutes
  private authRoutes: AuthRoutes
  private patientRoutes: PatientRoutes

  constructor () {
    this.routes = Router()

    this.authMiddleware = container.resolve(AuthMiddleware)

    this.userRoutes = container.resolve(UserRoutes)
    this.authRoutes = container.resolve(AuthRoutes)
    this.patientRoutes = container.resolve(PatientRoutes)

    this.generateRoutes()
  }

  private generateRoutes () {
    this.routes.use('/user', this.userRoutes.router)
    this.routes.use('/auth', this.authRoutes.router)
    this.routes.use('/patient', this.authMiddleware.auth, this.patientRoutes.router)
  }

  public getRoutes () {
    return this.routes
  }
}

export default Routes

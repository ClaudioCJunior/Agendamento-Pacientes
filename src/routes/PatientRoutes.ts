import { Router } from 'express'
import { container, injectable } from 'tsyringe'

import PatientController from '../controllers/PatientController'

@injectable()
class PatientRoutes {
  public router: Router
  private patientController: PatientController

  constructor () {
    this.router = Router()

    this.patientController = container.resolve(PatientController)

    this.router.route('/').get(this.patientController.list).post(this.patientController.create)
    this.router
      .route('/:id')
      .get(this.patientController.findOne)
      .patch(this.patientController.update)
      .delete(this.patientController.delete)
  }
}

export default PatientRoutes

import { Request, Response } from 'express'
import { injectable, container } from 'tsyringe'

import CrudService from '../services/CrudService'
import Patient from '../models/Patient'

@injectable()
class PatientController {
  private crudService: CrudService

  constructor () {
    this.crudService = container.resolve(CrudService)
  }

  public create = async (req: Request, res: Response) => {
    try {
      const { name, surname, phone } = req.body

      const responseService = await this.crudService.create({
        model: Patient,
        paramsFilter: { name, surname },
        paramsSave: req.body
      })

      if (await Patient.findOne({ phone })) {
        return res.status(400).send({ error: 'Phone linked to another user' })
      }

      if (!responseService.status) {
        return res.status(400).send({ error: responseService.message })
      }

      return res.send(responseService.object)
    } catch (e) {
      console.error(e)
      return res.status(400).send({ error: 'Error to create user' })
    }
  }

  public list = async (req: Request, res: Response) => {
    try {
      const { page, perPage } = req.query

      const userId = (<any>req).userId

      const responseService = await this.crudService.list({
        model: Patient,
        paramsFilter: { userId },
        limit: perPage !== undefined ? +perPage : undefined,
        page: page !== undefined ? +page : undefined,
        order: 'createdAt'
      })

      if (!responseService.status) {
        return res.status(400).send({ error: responseService.message })
      }

      return res.send(responseService.objects)
    } catch (e) {
      console.error(e)
      return res.status(400).send({ error: 'Error to create user' })
    }
  }

  public findOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const responseService = await this.crudService.getOne({
        model: Patient,
        paramsFilter: { _id: id }
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

  public update = async (req: Request, res: Response) => {
    try {
      const { id } = <any>req.params
      const userId = (<any>req).userId

      const responseService = await this.crudService.update({
        model: Patient,
        paramsFilter: { userId, _id: id },
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

  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const userId = (<any>req).userId

      const responseService = await this.crudService.delete({
        model: Patient,
        paramsFilter: { userId, _id: id }
      })

      if (!responseService.status) {
        return res.status(400).send({ error: responseService.message })
      }

      return res.send(responseService.message)
    } catch (e) {
      console.error(e)
      return res.status(400).send({ error: 'Error to create user' })
    }
  }
}

export default PatientController

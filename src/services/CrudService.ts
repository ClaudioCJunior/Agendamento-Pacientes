import { injectable } from 'tsyringe'
import CrudRequestInterface from '../Interfaces/CrudRequestInterface'
import CrudResponseInterface from '../Interfaces/CrudResponseInterface'
import { Document } from 'mongoose'

@injectable()
class CrudService {
  public async create (params: CrudRequestInterface): Promise<CrudResponseInterface> {
    try {
      if (await params.model.findOne(params.paramsFilter)) {
        return { status: false, message: 'Already exists' }
      }

      const object = await params.model.create(params.paramsSave)

      return { status: true, object, message: 'created success' }
    } catch (e) {
      console.error(e)

      return { status: false, message: 'Error to Create' }
    }
  }

  public async list (params: CrudRequestInterface): Promise<CrudResponseInterface> {
    try {
      const limit = params.limit !== undefined ? params.limit : 0
      const page = params.page !== undefined ? params.page : 0

      const objects = await params.model
        .find(params.paramsFilter)
        .sort(params.order)
        .skip(limit * page)
        .limit(limit)

      return { status: true, objects, message: 'list success' }
    } catch (e) {
      console.error(e)

      return { status: false, message: 'Error to list' }
    }
  }

  public async getOne (params: CrudRequestInterface): Promise<CrudResponseInterface> {
    try {
      const object = await params.model.findOne(params.paramsFilter)

      return { status: true, object, message: 'get one object success' }
    } catch (e) {
      console.error(e)

      return { status: false, message: 'Error to get one' }
    }
  }

  public async update (params: CrudRequestInterface): Promise<CrudResponseInterface> {
    try {
      if (!(await params.model.findOne(params.paramsFilter))) {
        return { status: false, message: 'Object not exists' }
      }

      const object = await params.model.findOneAndUpdate(params.paramsFilter, params.paramsSave, {
        returnOriginal: false
      })

      return { status: true, object, message: 'updated success' }
    } catch (e) {
      console.error(e)

      return { status: false, message: 'Error to update' }
    }
  }

  public async delete (params: CrudRequestInterface): Promise<CrudResponseInterface> {
    try {
      if (!(await params.model.deleteOne(params.paramsFilter))) {
        return { status: false, object: new Document(), message: 'Error to delete' }
      }

      return { status: true, message: 'Deleted success' }
    } catch (e) {
      console.error(e)

      return { status: false, object: new Document(), message: 'Error to Delete' }
    }
  }
}

export default CrudService

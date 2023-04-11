import { Model } from 'mongoose'

interface CrudRequestInterface {
  model: Model<any>;
  paramsFilter: object;
  paramsSave?: object[];
  limit?: number;
  page?: number;
  order?: string;
}

export default CrudRequestInterface

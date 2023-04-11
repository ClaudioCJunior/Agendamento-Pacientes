import { Document } from 'mongoose'

interface CrudResponseInterface {
  status?: boolean;
  object?: Document;
  objects?: Document[];
  message?: string;
}

export default CrudResponseInterface

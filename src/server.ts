import 'reflect-metadata'
import App from './app'
import { container } from 'tsyringe'

const app = container.resolve(App)

app.express.listen(3000)

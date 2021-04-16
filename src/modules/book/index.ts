import { Router } from 'farrow-http'
import ApiService from './api'
export const BookModule = Router()
BookModule.route('/book').use(ApiService)

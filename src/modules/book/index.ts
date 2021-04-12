import { Router } from 'farrow-http'
import { ApiDirMap } from '$libs/ApiSrv'
import { resolve } from 'path'
// import ApiSrv from './api'
export const BookModule = Router()
BookModule.route('/book').use(ApiDirMap(resolve(__dirname, './api')))
// BookModule.route('/book').use(ApiSrv)

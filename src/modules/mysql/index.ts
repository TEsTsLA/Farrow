import { Router, Response } from 'farrow-http'
// import { User } from '../user/User'
import { local_DB } from './dbs'
import { Product } from './tables/product'

export { local_DB }
export const DBS = Router()
DBS.get('/show_database').use(async (request) => {
  const result = await local_DB.query("SHOW DATABASES").then(val => val.data.map(item => item.Database))
  return Response.json(result)
})

DBS.get("/create_table").use(async (request) => {
  const result = await Product.use(local_DB).createTable()
  return Response.json(result.toJSON())
})
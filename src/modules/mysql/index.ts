import { Router, Response } from 'farrow-http'
import { User } from './tables/user'
import { local_DB } from './dbs'
import { Product } from './tables/product'
import { Book } from './tables/book';
import { Table } from 'modelar';

export { local_DB, Book, Product, User }
export const DB_Module = Router()
DB_Module.get('/show_database').use(async (request) => {
  const result = await local_DB.query("SHOW DATABASES").then(val => val.data.map(item => item.Database))
  return Response.json(result)
})

DB_Module.get("/create_table").use(async (request) => {
  const bok = new Book
  const tab = new Table(bok)
  return Response.json(
    tab.toString())
})
DB_Module.get('gen').use(async () => {
  return Response.json('ok')
})
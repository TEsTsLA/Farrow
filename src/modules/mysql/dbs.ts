import { DB } from 'modelar'
export const local_DB = new DB({
  type: "mysql",
  database: "apijson",
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "root"
})
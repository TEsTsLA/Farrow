import { Router, Response } from 'farrow-http'
import { User } from '../user/User'
import { db } from './localhost'

export const DBS = Router()
DBS.get('/show_database').use(async (request) => {
  const result = await db.query("SHOW DATABASES").then(val => val.data.map(item => item.Database))
  return Response.json(result)
})

DBS.get("/create_users").use(async (request) => {
  const result = await User.use(db).createTable().then(res=>res.data)
  return Response.json(result)
})

DBS.get("/create_user").use(async (request) => {
  const user = new User;
  user.name = "luna";
  user.email = "luna@hyurl.com";
  user.password = "12345";

  await user.use(db).save();
  return Response.json(user)
})
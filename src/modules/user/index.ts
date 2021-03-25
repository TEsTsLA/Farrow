import { local_DB } from '$mysql'
import { Router, Response } from 'farrow-http'
import { User } from '../mysql/tables/user'

// create user router
export const UserModule = Router()

// this will match /user/info
UserModule.get('/info').use(async (request) => {
  return Response.json({
    userInfo: {},
  })
})

UserModule.get("/create").use(async (request) => {
  const user = new User;
  user.name = "luna";
  user.email = "luna@hyurl.com";
  user.password = "12345";
  await user.use(local_DB).save();
  return Response.json(user.toJSON())
})

UserModule.get('/info/<id:int>').use(async (request) => {
  const user = await User.use(local_DB).get(request.params.id);
  return Response.json(user.toJSON())
})

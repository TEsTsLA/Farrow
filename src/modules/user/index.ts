import { Router, Response } from 'farrow-http'

// create user router
export const user = Router()

// this will match /user/info
user.get('/info').use(async (request) => {
  return Response.json({
    userInfo: {},
  })
})

// handle user router
// this will match /user/:id
user.get('/<id:int>').use(async (request) => {
  return Response.json({
    userId: request.params.id,
  })
})
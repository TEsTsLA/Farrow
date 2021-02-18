import { Router, Response } from 'farrow-http'
// create product router
export const product = Router()
// handle product router
// this will match /product/:id
product.get('/<id:int>').use(async (request) => {
  return Response.json({
    productId: request.params.id,
  })
})

// this will match /product/info
product.get('/info').use(async (request) => {
  return Response.json({
    productInfo: {},
  })
})
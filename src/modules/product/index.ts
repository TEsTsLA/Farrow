import { Router, Response } from 'farrow-http'
// create product router
export const ProductModule = Router()
// handle product router
// this will match /product/:id
ProductModule.get('/<id:int>').use(async (request) => {
  return Response.json({
    productId: request.params.id,
  })
})

// this will match /product/info
ProductModule.get('/info').use(async (request) => {
  return Response.json({
    productInfo: {},
  })
})
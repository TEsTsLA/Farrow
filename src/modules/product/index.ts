import { Router, Response } from 'farrow-http'
import { Module } from 'farrow-module'
export class ProductModule extends Module {
  static path = '/product'
  static router = Router()

}
export const ProductRouter = Router()

ProductRouter.get('/<id:int>').use(async (request) => {
  return Response.json({
    productId: request.params.id,
  })
})

ProductRouter.get('/info').use(async (request) => {
  return Response.json({
    productInfo: {},
  })
})
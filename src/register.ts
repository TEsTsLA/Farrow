import { DB_Module } from "$mysql";
import { cors } from "farrow-cors";
import { HttpPipeline, Response } from "farrow-http";
import { join } from "path";
import { BookModule } from "./modules/book";
import { ProductModule } from "./modules/product";
import { UserModule } from "./modules/user";

export function Setup(http: HttpPipeline): void {
  http.get('/greet/<name:string>?<age:int>&farrow=type-safe').use((request) => {
    return Response.text(`Hello ${request.params.name}, your age is ${request.query.age}`)
  })
}

export function RegisterModules(http: HttpPipeline): void {
  http.route('/users').use(UserModule)
  http.route('/product').use(ProductModule.router)
  http.route('/db').use(DB_Module)
  http.use(BookModule)
}
export function RegisterMiddles(http: HttpPipeline): void {
  http.use(cors())
  http.serve('/static', join(__dirname, '../static'))
}
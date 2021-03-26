import { Module } from "farrow-module";
import { Http, HttpPipeline } from 'farrow-http'
import { MaybeAsync, Middleware, MiddlewareInput } from "farrow-pipeline";
interface HttpModStruct {

}
class HttpModule extends Module {
  private http: HttpPipeline
  middlewares: MiddlewareInput<RequestInfo, MaybeAsync<Response>>[]
  constructor({
    middlewares
  }: {
    middlewares:MiddlewareInput<RequestInfo, MaybeAsync<Response>>[]
  }) {
    super()
    this.http = Http()
    this.middlewares = middlewares
    middlewares.forEach(middleware=>{
      // this.http.use(middleware)
    })
  }
  listen(port: number) {
    this.http.listen(port)
  }
}
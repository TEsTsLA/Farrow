import { Module } from "farrow-module";
import { Http, HttpPipeline, RequestInfo, Response, RouterPipeline } from 'farrow-http'
import { MaybeAsync, MiddlewareInput } from "farrow-pipeline";

export class HttpModule extends Module {
  private http: HttpPipeline = Http()
  public middlewares: MiddlewareInput<RequestInfo, MaybeAsync<Response>>[]
  public port: number
  public basenames: string[]
  protected modules: RouterPipeline[]
  constructor() {
    super()
  }
  init() {
    this.middlewares?.forEach(middleware => {
      this.http.use(middleware)
    })
    this.modules?.forEach(module => {
      this.http.use(module)
    })
  }
  listen(port?: number) {
    this.init()
    this.http.listen(port ?? this.port)
  }
}
interface IApp {
  middlewares: MiddlewareInput<RequestInfo, MaybeAsync<Response>>[]
  modules?: RouterPipeline[]
  keyName: string
}
export function App(appConfig?: IApp) {
  return function <T extends { new(...args: any[]): {} }>(constructor: typeof HttpModule) {
    return class extends constructor {
      modules = appConfig.modules ?? []
    }
  }
}

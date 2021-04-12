
import { App, HttpModule } from "$libs/HttpModule";
import { BookModule } from "$modules/book";
import { cors } from 'farrow-cors'
@App({
  keyName: 'Book',
  middlewares: [cors()],
  modules: [BookModule]
})
export class BookApp extends HttpModule {
  port = 3000
}


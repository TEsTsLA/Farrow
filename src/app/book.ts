
import { App, HttpModule } from "$libs/HttpModule";
import { BookModule } from "$modules/book";
@App({
  keyName: 'Book',
  middlewares: [],
  modules: [BookModule]
})
export class BookApp extends HttpModule {
  port = 3003
}


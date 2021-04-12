import { HttpModule } from './HttpModule'
export function Run(app: typeof HttpModule) {
  const App = new app
  App.listen()
  return {
    AndRun: Run,
    App
  }
}
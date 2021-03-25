import { Http } from 'farrow-http'
import { RegisterMiddles, RegisterModules, Setup } from './register'

const http = Http({
  basenames: ['/api'],
  logger: {
    transporter(log){
      console.log(log)
    }
  }
})
Setup(http)
RegisterMiddles(http)
RegisterModules(http)
http.listen(3000)
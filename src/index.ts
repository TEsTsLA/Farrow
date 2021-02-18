import { Http } from 'farrow-http'
import { cors } from 'farrow-cors'
import { user } from './modules/user'
import { product } from './modules/product'
import { DBS } from 'db/mysql'

const http = Http({
  basenames: ['/api'],
})
http.use(cors())

http.route('/users').use(user)
http.route('/product').use(product)
http.route('/db').use(DBS)
http.listen(3000)
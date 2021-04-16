import { ApiService } from 'farrow-api-server'
import getList from './get-list'
import { AddBook } from './single-book'
// export * from './obj-type'
export default ApiService({
  entries: {
    getList,
    AddBook
  }
})

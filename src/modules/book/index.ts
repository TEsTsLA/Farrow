// import { local_DB } from '$mysql'
import { Book, local_DB } from '$mysql'
import { Router, Response } from 'farrow-http'

export const book = Router()

book.get('/list').use(async () =>{
  const books = await Book.use(local_DB).getMany()
  
  return Response.vary("books")
})
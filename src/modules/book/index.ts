import { Book, local_DB } from '$mysql'
import { Api } from 'farrow-api'
import { ApiService } from 'farrow-api-server'
import { Router, Response } from 'farrow-http'
import { Any, Float, Int, List, ObjectType, Type } from 'farrow-schema'
import { codegen } from 'farrow-api/dist/codegen'
import { toJSON } from 'farrow-api/dist/toJSON'
import { format } from 'farrow-api/dist/prettier'
import { writeFile } from 'fs'
import { createSchemaValidator } from 'farrow-schema/validator'

export class BoId extends ObjectType {
  id = {
    description: `Todo id`,
    [Type]: Int,
  }
}

export const BookModule = Router()

export const getList = Api({
  description: 'remove todo',
  input: BoId,
  output: Any,
}, async (input) => {
  console.log(input)
  const books = await Book.use(local_DB).getMany()
  return books
})

BookModule.route('/book').use(ApiService({
  entries: {
    getList
  }
}))

BookModule.get('/codegen').use(async (request) => {
  let formatResult = toJSON({
    getList
  })

  let source = codegen(formatResult)

  let formatedSource = format(source)
  writeFile("test.ts", formatedSource, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
  return Response.text('OK')
})
BookModule.get('/validate').use(async (request) => {
  const validate = createSchemaValidator(Float)
  console.log(
    validate('11,11')
  )
  return Response.text('ok')
})
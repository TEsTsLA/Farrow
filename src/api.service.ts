// /src/api/todo.ts
import { ApiService } from 'farrow-api-server'
import { entries } from './modules/book/todo'
import { Response, Router } from 'farrow-http'
// assuming addTodo/removeTodo is defined

// combine all api to an object/entries


// create service router
export const TodoService  = ApiService({
  entries,
})
export const services = Router()
services.capture('json', (body) => {
  if (typeof body.value === 'object') {
    return Response.json({
      ...body.value,
      // ...others
    })
  }
  return Response.json(body.value)
})

services.route('/todo').use(TodoService)
// client-side

import { JsonType } from "farrow-schema"

type ApiErrorResponse = {
  error: {
    message: string
  }
}

type ApiSuccessResponse = {
  output: JsonType
  // ...others
}

type ApiResponse = ApiErrorResponse | ApiSuccessResponse

export const fetcher = async (input) => {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }
  let response = await fetch(`http://localhost:3000/api/todo`, options)
  /**
   * api-service will return ApiResponse
   * the server can return more data/fields for other purposes
   */
  let json = (await response.json()) as ApiResponse

  if ('error' in json) {
    throw new Error(json.error.message)
  } else {
    return json.output
  }
}

// calling addTodo
fetcher({
  // specify the path of api in api-entries
  path: ['addTodo'],
  // pass the input of api to server
  input: {
    content: 'todo content',
  },
})

// calling removeTodo
fetcher({
  path: ['removeTodo'],
  input: {
    id: 0,
  },
})
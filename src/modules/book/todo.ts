import { Api } from 'farrow-api'
import { Int, List, ObjectType, Type, TypeOf } from 'farrow-schema'

/**
 * define Todo
 */
export class Todo extends ObjectType {
  id = {
    description: `Todo id`,
    [Type]: Int,
  }

  content = {
    description: 'Todo content',
    [Type]: String,
  }

  completed = {
    description: 'Todo status',
    [Type]: Boolean,
  }
}

// infer the type of Todo
export type TodoType = TypeOf<Todo>

// define Todos
export const Todos = List(Todo)

// define AddTodoInput
export class AddTodoInput extends ObjectType {
  content = {
    description: 'a content of todo for creating',
    [Type]: String,
  }
}

// define AddTodoInput
export class AddTodoOutput extends ObjectType {
  todos = {
    description: 'Todo list',
    [Type]: Todos,
  }
}

// define an api via input schema and output schema
export const addTodo = Api(
  {
    description: 'add todo',
    input: AddTodoInput,
    output: AddTodoOutput,
  },
  (input) => {
    // impl addTodo
    return {
      todos: [
        { id: 1, content: '1', completed: false }
      ],
    }
  },
)

// define RemoveTodoInput
export class RemoveTodoInput extends ObjectType {
  id = {
    description: 'Todo id for removing',
    [Type]: Int,
  }
}

// define RemoveTodoOuput
export class RemoveTodoOuput extends ObjectType {
  todos = {
    description: 'Remain todo list',
    [Type]: Todos,
  }
}

// define an api without impl
export const removeTodo = Api({
  description: 'remove todo',
  input: RemoveTodoInput,
  output: RemoveTodoOuput,
})

// an api is also a pipeline
removeTodo.use((input, next) => {
  return next(input)
})

// impl remove todo via pipeline.use
removeTodo.use((input) => {
  return {
    todos: [],
  }
})

// combine all api to an object/entries
export const entries = {
  addTodo,
  removeTodo,
}
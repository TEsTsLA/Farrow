import { Any, Int, Literal, ObjectType, String, Type, Union } from "farrow-schema";
import { Book, local_DB } from '$mysql'
import { Api } from 'farrow-api'
/**
 * Error Types
 */
export class InvalidInput extends ObjectType {
  type = Literal('InvalidInput')
}
export class IBook extends ObjectType {
  name = String
  description = String
}

export class AddBookInput extends ObjectType {
  body = {
    description: 'Pet object that needs to be added to the store',
    [Type]: IBook,
  }
}

export class AddBookOutput extends ObjectType {
  type = Literal('AddPetOutput')
  book = IBook
}

type AddPetOutput = {}
export const AddBook = Api({
  description: 'add a book',
  input: AddBookInput,
  output: Union(InvalidInput, AddBookOutput),
}, async (input) => {
  if(input.body.description === ''){
    throw new Error('No Implementation')
  }else {
    return {
      type: AddPetOutput,
      book: input.body
    }
  }
})
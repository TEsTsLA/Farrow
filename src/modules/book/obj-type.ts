import { Any, Int, ObjectType, Type } from 'farrow-schema'
export class BoId extends ObjectType {
  id = {
    description: `Todo id`,
    [Type]: Int,
  }
}
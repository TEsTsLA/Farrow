import { field, primary, searchable, autoIncrement, Model, unique, comment } from "modelar";

export class Book extends Model {
  table = 'books';
  /** @readonly */
  @field
  @primary
  @autoIncrement
  readonly id: number;

  @field("varchar", 32)
  @unique
  @searchable
  @comment('书名字')
  name: string;

  @field("varchar", 128)
  @comment('书描述')
  @searchable
  description: string;
}
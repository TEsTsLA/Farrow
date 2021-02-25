import { field, primary, searchable, autoIncrement, Model } from "modelar";

export class Product extends Model {
  table = 'products';
  /** @readonly */
  @field
  @primary
  @autoIncrement
  readonly id: number;

  @field("varchar", 32)
  @searchable
  name: string;

  @field("varchar", 128)
  @searchable
  description: string;
}
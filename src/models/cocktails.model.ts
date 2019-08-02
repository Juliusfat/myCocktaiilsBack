import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Category } from './category.model';
import { Composition } from './composition.model';
import { Rating } from './rating.model';

@model({ settings: {} })
export class Cocktails extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @belongsTo(() => Category)
  categoryId?: string;

  @belongsTo(() => Rating)
  ratingId: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property.array(Composition)
  composition: Composition[];

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  validate: boolean;

  constructor(data?: Partial<Cocktails>) {
    super(data);
  }
}

export interface CocktailsRelations {
  // describe navigational properties here
}

export type CocktailsWithRelations = Cocktails & CocktailsRelations;

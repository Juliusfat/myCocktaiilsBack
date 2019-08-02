import { Entity, model, property, hasOne } from '@loopback/repository';
import { Cocktails } from './cocktails.model';
import { RatingList } from './rating-list.model';

@model({ settings: {} })
export class Rating extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  moyenne: number;

  @property({
    type: 'string',
  })
  cocktailDbId?: string;

  @property.array(RatingList)
  listRating: RatingList[];

  @hasOne(() => Cocktails)
  cocktail?: Cocktails;

  constructor(data?: Partial<Rating>) {
    super(data);
  }
}

export interface RatingRelations {
  // describe navigational properties here
}

export type RatingWithRelations = Rating & RatingRelations;

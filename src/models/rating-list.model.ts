import {Model, model, property} from '@loopback/repository';

@model({settings: {}})
export class RatingList extends Model {
  @property({
    type: 'string',
  })
  comment?: string;

  @property({
    type: 'number',
    default: 0,
  })
  ratingNote?: number;


  constructor(data?: Partial<RatingList>) {
    super(data);
  }
}

export interface RatingListRelations {
  // describe navigational properties here
}

export type RatingListWithRelations = RatingList & RatingListRelations;

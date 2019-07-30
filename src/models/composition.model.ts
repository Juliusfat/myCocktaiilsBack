import { Model, model, property } from '@loopback/repository';

@model({ settings: {} })
export class Composition extends Model {
  @property({
    type: 'string',
  })
  ingredient?: string;

  @property({
    type: 'string',
  })
  measure?: string;


  constructor(data?: Partial<Composition>) {
    super(data);
  }
}

export interface CompositionRelations {
  // describe navigational properties here
}

export type CompositionWithRelations = Composition & CompositionRelations;

import {DefaultCrudRepository} from '@loopback/repository';
import {Cocktails, CocktailsRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CocktailsRepository extends DefaultCrudRepository<
  Cocktails,
  typeof Cocktails.prototype.id,
  CocktailsRelations
> {
  constructor(
    @inject('datasources.MongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Cocktails, dataSource);
  }
}

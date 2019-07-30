import {DefaultCrudRepository} from '@loopback/repository';
import {Category, CategoryRelations} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {
  constructor(
    @inject('datasources.MongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Category, dataSource);
  }
}

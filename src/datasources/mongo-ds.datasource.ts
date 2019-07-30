import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './mongo-ds.datasource.json';

export class MongoDsDataSource extends juggler.DataSource {
  static dataSourceName = 'MongoDS';

  constructor(
    @inject('datasources.config.MongoDS', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

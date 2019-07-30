import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Cocktails } from '../models';
import { CocktailsRepository } from '../repositories';

export class CocktailsController {
  constructor(
    @repository(CocktailsRepository)
    public cocktailsRepository: CocktailsRepository,
  ) { }

  @post('/cocktails', {
    responses: {
      '200': {
        description: 'Cocktails model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Cocktails) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cocktails, { exclude: ['id'] }),
        },
      },
    })
    cocktails: Omit<Cocktails, 'id'>,
  ): Promise<Cocktails> {
    return await this.cocktailsRepository.create(cocktails);
  }

  @get('/cocktails/count', {
    responses: {
      '200': {
        description: 'Cocktails model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Cocktails)) where?: Where<Cocktails>,
  ): Promise<Count> {
    return await this.cocktailsRepository.count(where);
  }

  @get('/cocktails', {
    responses: {
      '200': {
        description: 'Array of Cocktails model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Cocktails) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Cocktails)) filter?: Filter<Cocktails>,
  ): Promise<Cocktails[]> {
    return await this.cocktailsRepository.find(filter);
  }

  @patch('/cocktails', {
    responses: {
      '200': {
        description: 'Cocktails PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cocktails, { partial: true }),
        },
      },
    })
    cocktails: Cocktails,
    @param.query.object('where', getWhereSchemaFor(Cocktails)) where?: Where<Cocktails>,
  ): Promise<Count> {
    return await this.cocktailsRepository.updateAll(cocktails, where);
  }

  @get('/cocktails/{id}', {
    responses: {
      '200': {
        description: 'Cocktails model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Cocktails) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Cocktails> {
    return await this.cocktailsRepository.findById(id);
  }

  @patch('/cocktails/{id}', {
    responses: {
      '204': {
        description: 'Cocktails PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cocktails, { partial: true }),
        },
      },
    })
    cocktails: Cocktails,
  ): Promise<void> {
    await this.cocktailsRepository.updateById(id, cocktails);
  }

  @put('/cocktails/{id}', {
    responses: {
      '204': {
        description: 'Cocktails PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cocktails: Cocktails,
  ): Promise<void> {
    await this.cocktailsRepository.replaceById(id, cocktails);
  }

  @del('/cocktails/{id}', {
    responses: {
      '204': {
        description: 'Cocktails DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cocktailsRepository.deleteById(id);
  }
}

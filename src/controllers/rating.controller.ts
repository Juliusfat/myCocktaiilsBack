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
import {Rating} from '../models';
import {RatingRepository} from '../repositories';

export class RatingController {
  constructor(
    @repository(RatingRepository)
    public ratingRepository : RatingRepository,
  ) {}

  @post('/ratings', {
    responses: {
      '200': {
        description: 'Rating model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rating)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {exclude: ['id']}),
        },
      },
    })
    rating: Omit<Rating, 'id'>,
  ): Promise<Rating> {
    return await this.ratingRepository.create(rating);
  }

  @get('/ratings/count', {
    responses: {
      '200': {
        description: 'Rating model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Rating)) where?: Where<Rating>,
  ): Promise<Count> {
    return await this.ratingRepository.count(where);
  }

  @get('/ratings', {
    responses: {
      '200': {
        description: 'Array of Rating model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rating)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Rating)) filter?: Filter<Rating>,
  ): Promise<Rating[]> {
    return await this.ratingRepository.find(filter);
  }

  @patch('/ratings', {
    responses: {
      '200': {
        description: 'Rating PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {partial: true}),
        },
      },
    })
    rating: Rating,
    @param.query.object('where', getWhereSchemaFor(Rating)) where?: Where<Rating>,
  ): Promise<Count> {
    return await this.ratingRepository.updateAll(rating, where);
  }

  @get('/ratings/{id}', {
    responses: {
      '200': {
        description: 'Rating model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rating)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Rating> {
    return await this.ratingRepository.findById(id);
  }

  @patch('/ratings/{id}', {
    responses: {
      '204': {
        description: 'Rating PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {partial: true}),
        },
      },
    })
    rating: Rating,
  ): Promise<void> {
    await this.ratingRepository.updateById(id, rating);
  }

  @put('/ratings/{id}', {
    responses: {
      '204': {
        description: 'Rating PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() rating: Rating,
  ): Promise<void> {
    await this.ratingRepository.replaceById(id, rating);
  }

  @del('/ratings/{id}', {
    responses: {
      '204': {
        description: 'Rating DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ratingRepository.deleteById(id);
  }
}

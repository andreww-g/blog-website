import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { ApiZodPaginatedResponse } from '../common/decorators/zod/api-zod-paginated-response.decorator';
import { ApiZodResponse } from '../common/decorators/zod/api-zod-response.decorator';
import { ZodQuery } from '../common/decorators/zod/zod-query.decorator';
import { ApiResponse } from '../common/interfaces/api-response.interface';

import { PublisherByIdRequestDto } from './dtos/request/publisher-by-id-request.dto';
import { PublisherCreateRequestDto } from './dtos/request/publisher-create-request.dto';
import { PublisherParamsRequestDto } from './dtos/request/publisher-params-request.dto';
import { PublisherResponseDto, publisherResponseSchema } from './dtos/response/publisher-response.dto';
import { PublisherService } from './publisher.service';


@ApiTags('Publishers')
@Controller('publisher')
export class PublisherController {
  constructor (private readonly publisherService: PublisherService) {}

  @Post()
  @ApiZodResponse(publisherResponseSchema)
  async create (
    @Body() payload: PublisherCreateRequestDto,
  ): Promise<ApiResponse<PublisherResponseDto>> {
    const data = await this.publisherService.create(
      payload.authorId,
      payload.articleIds || [],
    );

    return { success: true, data: plainToInstance(PublisherResponseDto, data) };
  }

  @Get(':id')
  @ApiZodResponse(publisherResponseSchema)
  async getPublisher (
    @Param('id') id: PublisherByIdRequestDto['id'],
  ): Promise<ApiResponse<PublisherResponseDto>> {
    const data = await this.publisherService.findOneById(id);

    return { success: true, data: plainToInstance(PublisherResponseDto, data) };
  }

  @Get()
  @ApiZodPaginatedResponse(publisherResponseSchema)
  async getPublishers (
    @ZodQuery() payload: PublisherParamsRequestDto,
  ): Promise<ApiResponse<{ data: PublisherResponseDto[], total: number }>> {
    const result = await this.publisherService.findAll(payload);

    return {
      success: true,
      data: {
        data: plainToInstance(PublisherResponseDto, result.data),
        total: result.total,
      },
    };
  }
}
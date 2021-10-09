import {
  Get,
  Query,
  Controller,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBasicAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TagsService } from './tags.service';
import { Tag } from './tags.model';

@ApiBasicAuth()
@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @ApiOperation({
    summary:
      'Resolve tag metadata by historianName (name of the time series data source)',
  })
  @ApiResponse({ status: 200, description: 'OK', type: [Tag] })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({
    status: 400,
    description: "Bad Request - Missing query param 'historianName'",
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Wrong or missing Basic Authentication',
  })
  @UseGuards(AuthGuard('basic'))
  async getTags(@Query('historianName') historianName: string): Promise<Tag[]> {
    if (!historianName) {
      throw new BadRequestException(
        "Query param 'historianName' is mandatory.",
      );
    }

    return await this.tagsService.getTagsByName(historianName);
  }
}

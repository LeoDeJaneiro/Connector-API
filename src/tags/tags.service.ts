import { InternalServerErrorException, Injectable } from '@nestjs/common';

import { Tag } from './tags.model';
import { getTags } from './__mocks/getTags';

@Injectable()
export class TagsService {
  constructor() {}

  async getTagsByName(historianName: string): Promise<Tag[]> {
    try {
      // replace this mocked handler to integrate your real data
      return getTags();
    } catch {
      throw new InternalServerErrorException();
    }
  }
}

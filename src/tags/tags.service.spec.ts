import { Test, TestingModule } from '@nestjs/testing';

import { TagsService } from './tags.service';
import { getTags } from './__mocks/getTags';
import { getTagClasses, tagsRaw } from './__mocks/Tag';
import { Tag } from './tags.model';

jest.mock('./__mocks/getTags', () => ({
  __esModule: true,
  getTags: jest.fn(),
}));

const mockedGetTags = getTags as jest.Mock<Promise<Tag[]>>;

describe('TagsService', () => {
  let service: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsService],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return Tags', async () => {
    mockedGetTags.mockImplementation(
      () => new Promise((resolve) => resolve(getTagClasses())),
    );

    const result = await service.getTagsByName('test');
    expect(mockedGetTags).toHaveBeenCalled();
    expect(result).toEqual(tagsRaw);
  });
});

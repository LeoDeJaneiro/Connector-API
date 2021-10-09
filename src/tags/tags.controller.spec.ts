import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { INestApplication, InternalServerErrorException } from '@nestjs/common';
import * as request from 'supertest';

import { AuthStrategy } from '../auth/auth.strategy';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { getTags } from './__mocks/getTags';
import { Tag } from './tags.model';

describe('TagsController', () => {
  let controller: TagsController;
  let tagsService: TagsService;
  let config: ConfigService;
  let app: INestApplication;
  const userName = 'user123';
  const password = 'password321';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        AuthStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'BASIC_AUTH_USER') {
                return userName;
              }
              if (key === 'BASIC_AUTH_PASSWORD') {
                return password;
              }
              return null;
            }),
          },
        },
      ],
      controllers: [TagsController],
    }).compile();

    tagsService = module.get<TagsService>(TagsService);
    controller = module.get<TagsController>(TagsController);
    config = module.get<ConfigService>(ConfigService);
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /tags', () => {
    it('should respond 401 Unauthorized', async () => {
      return request(app.getHttpServer()).get('/tags').expect(401);
    });

    it('should respond 401 Unauthorized on wrong credentials', async () => {
      return request(app.getHttpServer())
        .get('/tags')
        .auth('the-username', 'the-password')
        .expect(401);
    });

    it('should respond 400 Bad Request for missing query parameter', async () => {
      return request(app.getHttpServer())
        .get('/tags')
        .auth(userName, password)
        .expect(400);
    });

    it('should respond 200 and tag data', async () => {
      const result: Tag[] = await getTags();
      const getTagsHandler = jest
        .spyOn(tagsService, 'getTagsByName')
        .mockImplementation(() => getTags());
      return request(app.getHttpServer())
        .get('/tags')
        .query({ historianName: 'Name' })
        .auth(userName, password)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(result);
          expect(getTagsHandler).toHaveBeenCalled();
        });
    });

    it('should respond 500 as handling of catched error', async () => {
      jest.spyOn(tagsService, 'getTagsByName').mockImplementation(() => {
        throw new InternalServerErrorException();
      });
      return request(app.getHttpServer())
        .get('/tags')
        .query({ historianName: 'Name' })
        .auth(userName, password)
        .expect(500);
    });
  });
});

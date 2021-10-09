import { Test, TestingModule } from '@nestjs/testing';
import { AuthStrategy } from './auth.strategy';
import { ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthStrategy, ConfigService],
    }).compile();

    service = module.get<AuthStrategy>(AuthStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

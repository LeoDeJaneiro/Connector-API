import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TagsController } from './tags/tags.controller';
import { TagsService } from './tags/tags.service';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), TagsModule, AuthModule],
  controllers: [TagsController],
  providers: [TagsService],
})
export class AppModule {}

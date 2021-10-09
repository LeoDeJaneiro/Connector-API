import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [AuthStrategy],
})
export class AuthModule {}

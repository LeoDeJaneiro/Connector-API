import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (_, userName, password): Promise<boolean> => {
    if (
      this.configService.get<string>('BASIC_AUTH_USER') === userName &&
      this.configService.get<string>('BASIC_AUTH_PASSWORD') === password
    ) {
      return true;
    }
    throw new UnauthorizedException();
  };
}

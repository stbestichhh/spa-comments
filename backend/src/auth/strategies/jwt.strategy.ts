import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { EnvEnum } from '../../shared/enums/env.enum';
import { UserPayloadDto } from '../../shared/dto/user-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow(EnvEnum.JWT_SECRET),
    });
  }

  public async validate(payload: UserPayloadDto) {
    return this.authService.validateUser(payload.sub);
  }
}

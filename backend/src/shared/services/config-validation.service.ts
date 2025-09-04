import * as Joi from 'joi';
import { EnvEnum } from '../enums/env.enum';

export class ConfigValidationService {
  public static createSchema() {
    return Joi.object<typeof EnvEnum>({
      DATABASE_HOST: Joi.string().hostname().required(),
      DATABASE_NAME: Joi.string().required(),
      DATABASE_PASSWORD: Joi.string().required(),
      DATABASE_PORT: Joi.number().port().required(),
      DATABASE_USER: Joi.string().required(),
      REDIS_HOST: Joi.string().hostname().required(),
      REDIS_PORT: Joi.number().port().required(),
    });
  }
}

import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { EnvEnum } from '../shared/enums/env.enum';
import { UserModel } from './models/user.model';
import { CommentModel } from './models/comment.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.getOrThrow(EnvEnum.DATABASE_HOST),
        port: config.getOrThrow(EnvEnum.DATABASE_PORT),
        username: config.getOrThrow(EnvEnum.DATABASE_USER),
        password: config.getOrThrow(EnvEnum.DATABASE_PASSWORD),
        database: config.getOrThrow(EnvEnum.DATABASE_NAME),
        models: [UserModel, CommentModel],
        autoLoadModels: true,
        sync: { alter: false, force: false },
        logging: (msg) => Logger.log(msg, SequelizeModule.name),
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([UserModel, CommentModel]),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}

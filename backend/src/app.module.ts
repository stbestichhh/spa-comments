import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigValidationService } from './shared/services/config-validation.service';
import { UsersModule } from './users/users.module';
import { RaitoModule } from '@raito-cache/nestjs';
import { EnvEnum } from './shared/enums/env.enum';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CommentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ConfigValidationService.createSchema(),
    }),
    UsersModule,
    RaitoModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        port: config.getOrThrow(EnvEnum.RAITO_PORT),
        host: config.getOrThrow(EnvEnum.RAITO_HOST),
        ttl: 10000,
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

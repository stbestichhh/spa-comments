import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigValidationService } from './shared/services/config-validation.service';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CommentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ConfigValidationService.createSchema(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

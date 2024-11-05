import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import typeorm from './config/typeorm';
import { MailModule } from './mail/mail.module';
import { ReviewModule } from './review/review.module';
import { ReviewController } from './review/review.controller';
import { SpeakersModule } from './speakers/speakers.module';
import { WorkshopsModule } from './workshops/workshops.module';
import { LoggerModule } from 'nestjs-pino';
import { IncomingMessage } from 'http';
import { ServerResponse } from 'http';
import { ResourceModule } from './resource/resource.module';
import { FileUploadModule } from './file_upload/file_upload.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import jwt from './config/jwt';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm, jwt],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get('typeorm');
      },
    }),
    MessageModule,
    AuthModule,
    AdminModule,
    UsersModule,
    MailModule,
    ReviewModule,
    SpeakersModule,
    WorkshopsModule,
    ResourceModule,
    FileUploadModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const jwtSecret = configService.get<string>('JWT_SECRET');

        if (!jwtSecret) {
          throw new Error('JWT_SECRET is not defined');
        }
        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: '24h',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, ReviewController],
  providers: [AppService, JwtService],
})
export class AppModule {}

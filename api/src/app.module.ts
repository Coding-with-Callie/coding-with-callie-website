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
import { SubmissionsModule } from './submissions/submissions.module';
import { LoggerModule } from 'nestjs-pino';
import { IncomingMessage } from 'http';
import { ServerResponse } from 'http';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get('typeorm');
      },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        serializers: {
          req(request: IncomingMessage) {
            return {
              method: request.method,
              url: request.url,
            };
          },
          res(reply: ServerResponse) {
            return {
              statusCode: reply.statusCode,
            };
          },
        },
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
            levelFirst: true,
            translateTime: 'SYS:mm/dd/yyyy h:MM:ss TT',
            ignore: 'pid,hostname',
          },
        },
      },
    }),
    MessageModule,
    SubmissionsModule,
    AuthModule,
    UsersModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

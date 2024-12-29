import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwt from '../config/jwt';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ReviewModule } from '../review/review.module';
import { WorkshopsModule } from '../workshops/workshops.module';
import { FileUploadModule } from '../file_upload/file_upload.module';
import { ChecklistModule } from '../checklists/checklists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwt],
    }),
    UsersModule,
    ReviewModule,
    MailModule,
    WorkshopsModule,
    FileUploadModule,
    ChecklistModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwt').secret,
          signOptions: {
            expiresIn: '24h',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

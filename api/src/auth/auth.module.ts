import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwt from 'src/config/jwt';
import { FeedbackModule } from 'src/feedback/feedback.module';
import { SubmissionsModule } from 'src/submissions/submissions.module';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ReviewModule } from 'src/review/review.module';
import { SpeakersModule } from 'src/speakers/speakers.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwt],
    }),
    UsersModule,
    SubmissionsModule,
    FeedbackModule,
    ReviewModule,
    MailModule,
    SpeakersModule,
    CartModule,
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

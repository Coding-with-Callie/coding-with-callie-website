import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwt from 'src/config/jwt';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ReviewModule } from 'src/review/review.module';
import { SpeakersModule } from 'src/speakers/speakers.module';
import { WorkshopsModule } from 'src/workshops/workshops.module';
import { AlumniModule } from 'src/alumni/alumni.module';
import { FeaturesModule } from 'src/features/features.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { UserStoriesModule } from 'src/userStories/userStories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwt],
    }),
    UsersModule,
    ReviewModule,
    MailModule,
    SpeakersModule,
    WorkshopsModule,
    AlumniModule,
    ProjectsModule,
    FeaturesModule,
    UserStoriesModule,
    TasksModule,
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

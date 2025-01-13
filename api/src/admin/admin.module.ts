import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { FileUploadModule } from '../file_upload/file_upload.module';
import { SectionsModule } from '../sections/sections.module';
import { PagesModule } from '../pages/pages.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    FileUploadModule,
    SectionsModule,
    PagesModule,
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
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

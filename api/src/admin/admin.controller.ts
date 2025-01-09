import {
  Body,
  Controller,
  Delete,
  Optional,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles, RolesGuard } from './roles.guard';
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../file_upload/file_upload.service';
import { AuthGuard } from '../auth/auth.guard';

@Roles(['admin'])
@UseGuards(AuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private fileUploadService: FileUploadService,
  ) {}
  @Post('page')
  async createPageAndReturnUpdatedPages(@Body() page: any, @Req() req: any) {
    return await this.adminService.createPageAndReturnUpdatedPages(
      page,
      req.user.sub,
    );
  }

  @Delete('section/:id')
  async deleteSectionAndReturnUpdatedPage(@Param('id') id: number) {
    return await this.adminService.deleteSectionAndReturnUpdatedPage(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Put('section/:id')
  async updateSectionAndReturnUpdatedPage(
    @Param('id') id: number,
    @Body() data: any,
    @UploadedFile() @Optional() file?: Express.Multer.File,
  ) {
    return await this.adminService.updateSectionAndReturnUpdatedPageSections(
      id,
      data,
      file,
    );
  }
}

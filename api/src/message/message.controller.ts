import { Body, Controller, Post } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('contact')
  submitMessage(@Body() messageDto: MessageDto) {
    return this.messageService.submitMessage(messageDto);
  }
}

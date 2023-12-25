import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { MessageDto } from './dto/message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private mailService: MailService,
  ) {}

  submitMessage(message: MessageDto) {
    this.mailService.sendNewMessageEmail(message);
    return this.messageRepository.save(message);
  }
}

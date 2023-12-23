import { Injectable } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Injectable()
export class RefreshGuard extends AuthGuard {}

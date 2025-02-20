import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestService } from './request.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly requestService: RequestService,
  ) {}

  logger = new Logger(AppController.name);
  @Get()
  getHello(): string {
    this.logger.debug(this.requestService.getUserId());
    return 'Hello world';
  }
}

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestService } from 'src/request.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthenticationMiddleware.name);
  constructor(private readonly requestServicee: RequestService) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(AuthenticationMiddleware.name);
    //authenticate request
    const userId = '1235';
    this.requestServicee.setUserId(userId);
    this.logger.debug(
      AuthenticationMiddleware.name,
      this.requestServicee.getUserId(),
    );
    next();
  }
}

import {
  ForbiddenException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateDomainMiddleware implements NestMiddleware {
  private logger = new Logger(ValidateDomainMiddleware.name);
  private allowedDomains = [];
  private API_KEYS: string[] = [];
  constructor(private readonly configService: ConfigService) {
    this.allowedDomains =
      this.configService.get<string>('CORS_ALLOWED_ORIGINS')?.split(',') || [];
  }
  /**
   * Validates the request against the list of allowed domains.
   * If the request comes from an unauthorized domain, throws
   * a ForbiddenException.
   * non-browser sources (Postman, cURL, bots) are not allowed
   * @param req The express request object
   * @param res The express response object
   * @param next The next middleware function
   */
  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin || req.headers.referer;
    this.logger.debug(req.headers.origin);

    if (!origin || !this.allowedDomains.includes(origin)) {
      throw new ForbiddenException('Access denied: Unauthorized domain');
    }

    next();
  }
}

// implement to specific module to restrict access
// export class Module implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(ValidateDomainMiddleware).forRoutes('*');
//   }
// }

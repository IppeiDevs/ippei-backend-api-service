import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private API_KEYS: string[] = [];
  constructor(
    private reflector: Reflector,
    private readonly configService: ConfigService,
  ) {
    this.API_KEYS = this.configService.get<string>('API_KEYS').split(',') || [];
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'] as string;

    // Get allowed API keys from env or config

    if (!apiKey || !this.API_KEYS.includes(apiKey)) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}

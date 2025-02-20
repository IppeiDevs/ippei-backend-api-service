import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestService } from './request.service';
import { YoutubeVideoScraperModule } from './youtube-video-scraper/youtube-video-scraper.module';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const isDev = configService.get('NODE_ENV') === 'development';
        if (!isDev) return {};

        return {
          pinoHttp: {
            level: 'debug',
            transport: {
              target: 'pino-pretty',
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule globally available
    }),
    YoutubeVideoScraperModule,
  ],
  controllers: [AppController],
  providers: [AppService, RequestService],
  exports: [RequestService],
})
export class AppModule {}

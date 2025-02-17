import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { RequestService } from './request.service';
import { YoutubeVideoScraperModule } from './youtube-video-scraper/youtube-video-scraper.module';

@Module({
  imports: [YoutubeVideoScraperModule],
  controllers: [AppController],
  providers: [AppService, RequestService],
  exports: [RequestService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}

import { Module } from '@nestjs/common';
import { RequestService } from 'src/request.service';
import { YoutubeVideoScraperController } from './youtube-video-scraper.controller';
import { YoutubeVideoScraperService } from './youtube-video-scraper.service';

@Module({
  controllers: [YoutubeVideoScraperController],
  providers: [YoutubeVideoScraperService, RequestService],
})
export class YoutubeVideoScraperModule {}

import {
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';
import { YoutubeTranscript } from 'youtube-transcript';

type transcriptData = {
  text: string;
  duration: number;
  offset: number;
  lang: string;
};

@Controller('youtube-video-scraper')
export class YoutubeVideoScraperController {
  logger = new Logger(YoutubeVideoScraperController.name);

  @Post()
  async scrapeVideo(@Body('youtube_url') youtube_url: string) {
    this.logger.log('Process Executed: ', youtube_url);
    try {
      const transcript: transcriptData[] =
        await YoutubeTranscript.fetchTranscript(youtube_url)
          .then((data) => JSON.parse(JSON.stringify(data)) as transcriptData[])
          .catch(() => []);

      return {
        link: youtube_url,
        content:
          transcript.length > 0
            ? transcript
                .map((item) => item.text)
                .join(' ')
                .replaceAll('&amp;#39;', "'")
            : '',
      };
    } catch (error) {
      this.logger.error('Process Failed', (error as Error).message);
      throw new InternalServerErrorException(error.message);
    }
  }
}

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [ArticleModule],
  providers: [AppService],
})
export class AppModule {}

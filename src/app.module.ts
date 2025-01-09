import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ArticlesModule } from './article/articles.module';
import { ArticleCategoryModule } from './article-category/article-category.module';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './authors/author.module';
import { FileModule } from './file/file.module';
import { DatabasePostgresModule } from './postgres/database-postgres.module';
import { PublisherModule } from './publishers/publisher.module';
import { ReviewsModule } from './reviews/reviews.module';


@Module({
  imports: [
    AuthModule,
    PublisherModule,
    ReviewsModule,
    FileModule,
    ArticlesModule,
    ArticleCategoryModule,
    AuthorModule,
    DatabasePostgresModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

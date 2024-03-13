import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { MovieModule } from './movie/movie.module';
import { MoviesModule } from './movies/movies.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UsersModule, MovieModule, MoviesModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

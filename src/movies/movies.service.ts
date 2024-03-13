import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto) {
    const { title, description, releaseDate } = createMovieDto;
    const movie = this.movieRepository.create({
      title,
      description,
      releaseDate,
    });
    return this.movieRepository.save(movie);
  }

  async findAllMovies() {
    return this.movieRepository.find();
  }
}

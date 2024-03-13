import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto) {
    const { userId, performanceId } = createBookingDto;
    const booking = this.bookingRepository.create({ userId, performanceId });
    return this.bookingRepository.save(booking);
  }
}
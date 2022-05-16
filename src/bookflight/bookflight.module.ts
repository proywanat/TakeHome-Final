import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightController } from './controller/flight/flight.controller';
import { BookingEntity } from './entity/booking.entity';
import { FlightEntity } from './entity/flight.entity';
import { SeatEntity } from './entity/seat.entity';
import { FlightService } from './services/flight/flight.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity]),
    TypeOrmModule.forFeature([FlightEntity]),
    TypeOrmModule.forFeature([SeatEntity]),
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class BookflightModule {}

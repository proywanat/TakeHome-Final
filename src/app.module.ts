import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookflightModule } from './bookflight/bookflight.module';
import { BookingEntity } from './bookflight/entity/booking.entity';
import { FlightEntity } from './bookflight/entity/flight.entity';
import { SeatEntity } from './bookflight/entity/seat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/flightdata.db',
      entities: [BookingEntity, FlightEntity, SeatEntity],
      synchronize: true,
    }),
    BookflightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

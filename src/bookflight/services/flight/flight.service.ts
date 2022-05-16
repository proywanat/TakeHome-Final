import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingDto } from 'src/bookflight/dto/booking.dto/booking-dto';
import { FlightDto } from 'src/bookflight/dto/flight.dto/flight-dto';
import { SeatDto } from 'src/bookflight/dto/seat.dto/seat-dto';
import { BookingEntity } from 'src/bookflight/entity/booking.entity';
import { FlightEntity } from 'src/bookflight/entity/flight.entity';
import { SeatEntity } from 'src/bookflight/entity/seat.entity';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class FlightService {
  public flight: FlightDto[] = [];
  public seat: SeatDto[] = [];
  public booking: BookingDto[] = [];
  entityManager = getManager();

  constructor(
    @InjectRepository(BookingEntity)
    private bookingRepository: Repository<BookingEntity>,

    @InjectRepository(FlightEntity)
    private flightRepository: Repository<FlightEntity>,

    @InjectRepository(SeatEntity)
    private seatRepository: Repository<SeatEntity>,
  ) {}

  createBooking(booking_dto: BookingDto): Promise<BookingDto> {
    return this.bookingRepository.save(booking_dto);
  }

  loadAllBooking(): Promise<BookingDto[]> {
    return this.bookingRepository.find();
  }

  createFlight(flight_dto: FlightDto): Promise<FlightDto> {
    return this.flightRepository.save(flight_dto);
  }

  loadAllFight(): Promise<FlightDto[]> {
    return this.flightRepository.find();
  }

  createSeat(seat_dto: SeatDto): Promise<SeatDto> {
    return this.seatRepository.save(seat_dto);
  }

  async loadAllsSeat(id: number): Promise<SeatDto[]> {
    return await this.seatRepository.find({ where: { flightID: id } });
  }

  async loadBooking(id: number): Promise<BookingDto> {
    try {
      return await this.bookingRepository.findOne({ where: { bookingID: id } });
    } catch (error) {
      return error;
    }
  }

  async loadFlight(
    departureLocation,
    arrivalLocation,
    flightDate,
  ): Promise<FlightDto[]> {
    return this.entityManager.query(
      'SELECT * FROM `flight_entity` WHERE departureLocation = $1 AND arrivalLocation = $2 AND flightDate = $3;',
      [departureLocation, arrivalLocation, flightDate],
    );
  }

  async deleteBooking(id: number): Promise<void> {
    await this.bookingRepository.delete(id);
  }

  async loadEmptySeats(flightID: number): Promise<SeatDto[]> {
    return await this.entityManager.query(
      'SELECT seatID,seatNumber FROM `seat_entity` JOIN flight_entity ON flight_entity.flightID = seat_entity.flightID WHERE seatID NOT IN (SELECT seatID FROM `booking_entity`) AND flight_entity.flightID = $1;',
      [flightID],
    );
  }

  async loadReservedSeats(flightID: number): Promise<SeatDto[]> {
    return this.entityManager.query(
      'SELECT seatID,seatNumber FROM `seat_entity` JOIN flight_entity ON flight_entity.flightID = seat_entity.flightID WHERE seatID IN (SELECT seatID FROM `booking_entity`) AND flight_entity.flightID = $1;',
      [flightID],
    );
  }

  async loadFlightOne(id: number): Promise<FlightDto> {
    try {
      return await this.flightRepository.findOne({ where: { flightID: id } });
    } catch (error) {
      return error;
    }
  }

  async verifyFlight(id: number, dataFlight: string): Promise<FlightDto> {
    try {
      return await this.flightRepository.findOne({
        where: { flightID: id, flightDate: dataFlight },
      });
    } catch (error) {
      return error;
    }
  }

  async loadSeatOne(id: number): Promise<SeatDto> {
    try {
      return await this.seatRepository.findOne({
        where: { seatID: id },
      });
    } catch (error) {
      return error;
    }
  }
}

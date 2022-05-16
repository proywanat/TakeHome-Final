import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookingDto } from 'src/bookflight/dto/booking.dto/booking-dto';
import { FlightDto } from 'src/bookflight/dto/flight.dto/flight-dto';
import { SeatDto } from 'src/bookflight/dto/seat.dto/seat-dto';
import { FlightService } from 'src/bookflight/services/flight/flight.service';

@Controller('flight')
export class FlightController {
  constructor(private flightService: FlightService) {}
  @Post('AddFlight')
  createFlight(@Body() newFlight: FlightDto): Promise<FlightDto> {
    return this.flightService.createFlight(newFlight);
  }

  @Get('AllFlight')
  loadAllFlight(): Promise<FlightDto[]> {
    return this.flightService.loadAllFight();
  }

  @Post('AddSeat/:id')
  async createSeat(
    @Param('id') id: number, //flightID
    @Body() newSeat: SeatDto,
  ): Promise<SeatDto> {
    const checkFlight = await this.flightService.loadFlightOne(id);
    newSeat.flightID = checkFlight.flightID;
    return this.flightService.createSeat(newSeat);
  }

  @Post('AddBooking/:FID/:SID/:dateD')
  async createBooking(
    @Param('FID') FID: number,
    @Param('SID') SID: number,
    @Param('dateD') dateD: string,
    @Body() newBooking: BookingDto,
  ): Promise<BookingDto> {
    const checkFlight = await this.flightService.loadFlightOne(FID);
    const verifyFlight = await this.flightService.verifyFlight(FID, dateD);
    const checkSeat = await this.flightService.loadSeatOne(SID);
    newBooking.flightID = checkFlight.flightID;
    newBooking.seatID = checkSeat.seatID;
    newBooking.departureDate = verifyFlight.flightDate;
    return this.flightService.createBooking(newBooking);
  }

  @Get('AllBooking')
  loadAllBooking(): Promise<BookingDto[]> {
    return this.flightService.loadAllBooking();
  }

  @Get('AllSeat/:flightID')
  async loadAllSeat(@Param('flightID') flightID: number): Promise<SeatDto[]> {
    return this.flightService.loadAllsSeat(flightID);
  }

  @Get('EmptySeats/:flightID')
  async loadEmptyseats(
    @Param('flightID') flightID: number,
  ): Promise<SeatDto[]> {
    try {
      return await this.flightService.loadEmptySeats(flightID);
    } catch (error) {
      return error;
    }
  }

  @Get('ReservedSeats/:flightID')
  async loadReservedSeats(
    @Param('flightID') flightID: number,
  ): Promise<SeatDto[]> {
    try {
      return await this.flightService.loadReservedSeats(flightID);
    } catch (error) {
      return error;
    }
  }

  @Get('LoadFlight/:departureLocation/:arrivalLocation/:flightDate')
  async loadFlight(
    @Param('departureLocation') departureLocation: string,
    @Param('arrivalLocation') arrivalLocation: string,
    @Param('flightDate') flightDate: string,
  ): Promise<any> {
    try {
      return await this.flightService.loadFlight(
        departureLocation,
        arrivalLocation,
        flightDate,
      );
    } catch (error) {
      return error;
    }
  }

  @Put('Edit/:id/:FID/:SID/:dateD')
  async updatebooking(
    @Param('id') id: number, //bookingID
    @Param('FID') FID: number,
    @Param('SID') SID: number,
    @Param('dateD') dateD: string,
    @Body() bookingdto: BookingDto,
  ): Promise<BookingDto> {
    const booking = await this.flightService.loadBooking(id);
    const checkFlight = await this.flightService.loadFlightOne(FID);
    const verifyFlight = await this.flightService.verifyFlight(FID, dateD);
    const checkSeat = await this.flightService.loadSeatOne(SID);
    bookingdto.flightID = checkFlight.flightID;
    bookingdto.seatID = checkSeat.seatID;
    bookingdto.departureDate = verifyFlight.flightDate;
    booking.flightID = bookingdto.flightID;
    booking.seatID = bookingdto.seatID;
    booking.departureDate = bookingdto.departureDate;
    try {
      return await this.flightService.createBooking(booking);
    } catch (error) {
      return error;
    }
  }

  @Delete('Delete/:id')
  async deleteBooking(@Param('id') id: number): Promise<any> {
    await this.flightService.deleteBooking(id); //bookingID
    return { sucesss: 'delete success' };
  }
}

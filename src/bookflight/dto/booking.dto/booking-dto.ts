import { IsNumber, IsString } from 'class-validator';

export class BookingDto {
  @IsNumber()
  bookingID: number;

  @IsString()
  customerName: string;

  @IsString()
  customerSurname: string;

  @IsNumber()
  flightID: number;

  @IsNumber()
  seatID: number;

  @IsString()
  departureDate: string;

  @IsString()
  arrivalDate: string;

  @IsNumber()
  adults: number;

  @IsNumber()
  children: number;

  @IsNumber()
  infants: number;
}

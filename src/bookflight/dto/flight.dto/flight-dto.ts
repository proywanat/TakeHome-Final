import { IsNumber, IsString } from 'class-validator';

export class FlightDto {
  @IsNumber()
  flightID: number;

  @IsString()
  departureTime: string;

  @IsString()
  arrivalTime: string;

  @IsString()
  flightDate: string;

  @IsString()
  departureLocation: string;

  @IsString()
  arrivalLocation: string;
}

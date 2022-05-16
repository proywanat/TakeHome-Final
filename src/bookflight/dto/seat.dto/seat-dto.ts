import { IsNumber, IsString } from 'class-validator';

export class SeatDto {
  @IsNumber()
  seatID: number;

  @IsString()
  seatNumber: string;

  @IsNumber()
  flightID: number;
}

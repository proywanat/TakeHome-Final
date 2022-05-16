import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SeatEntity {
  @PrimaryGeneratedColumn()
  seatID: number;

  @Column({ nullable: false })
  seatNumber: string;

  @Column({ nullable: false })
  flightID: number;
}

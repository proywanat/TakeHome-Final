import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FlightEntity {
  @PrimaryGeneratedColumn()
  flightID: number;

  @Column({ nullable: false })
  departureTime: string;

  @Column({ nullable: false })
  arrivalTime: string;

  @Column({ nullable: false })
  flightDate: string;

  @Column({ nullable: false })
  departureLocation: string;

  @Column({ nullable: false })
  arrivalLocation: string;
}

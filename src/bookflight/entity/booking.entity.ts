import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookingEntity {
  @PrimaryGeneratedColumn()
  bookingID: number;

  @Column({ nullable: false })
  customerName: string;

  @Column({ nullable: false })
  customerSurname: string;

  @Column({ nullable: false })
  flightID: number;

  @Column({ nullable: false })
  seatID: number;

  @Column({ nullable: false })
  departureDate: string;

  @Column({ nullable: false })
  arrivalDate: string;

  @Column({ nullable: false })
  adults: number;

  @Column({ nullable: false })
  children: number;

  @Column({ nullable: false })
  infants: number;
}

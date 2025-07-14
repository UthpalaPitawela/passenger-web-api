import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { FlightBooking } from "./FlightBooking";

@Entity()
export class Flight {
  @PrimaryGeneratedColumn({type: 'int'})
  flight_id!: number;

  @Column({type: "varchar"})
  flight_number!: string;

  @Column({ type: "date" })
  departure_date!: string;

  @Column({ type: "date" })
  arrival_date!: string;

  @Column({type: "varchar"})
  departure_airport!: string;

  @Column({type: "varchar"})
  arrival_airport!: string;

  @OneToMany(() => FlightBooking, (fb) => fb.flight)
  flightBookings!: FlightBooking[];
}

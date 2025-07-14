import { Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Passenger } from "./Passenger";
import { FlightBooking } from "./FlightBooking";

@Entity()
export class Booking {
  @PrimaryColumn({ type: "varchar", length: 6 })
  booking_id!: string;

  @OneToMany(() => Passenger, (passenger) => passenger.booking)
  passengers!: Passenger[];

  @OneToMany(() => FlightBooking, (fb) => fb.booking)
  flightBookings!: FlightBooking[];
}

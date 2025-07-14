import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { Booking } from "./Booking";
import { Flight } from "./Flight";

@Entity()
export class FlightBooking {
  @PrimaryGeneratedColumn()
  id!: number; 
  
  @ManyToOne(() => Booking, (booking) => booking.flightBookings)
  @JoinColumn({ name: "booking_id" }) 
  booking!: Booking;

  @Column({ type: "varchar", length: 6 })
  booking_id!: number;

  @ManyToOne(() => Flight, (flight) => flight.flightBookings)
  @JoinColumn({ name: "flight_id" }) 
  flight!: Flight;

  @Column({type: "int"})
  flight_id!: number;
}

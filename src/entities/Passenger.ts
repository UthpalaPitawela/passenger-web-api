import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { Booking } from "./Booking";

@Entity()
export class Passenger {
  @PrimaryColumn({type:'varchar'})
  passenger_id!: string;

  @Column({ type: "varchar" })
  first_name!: string;

  @Column({ type: "varchar" })
  last_name!: string;

  @Column({ type: "varchar" , unique: true })
  email!: string;

  @ManyToOne(() => Booking, (booking) => booking.passengers)
  @JoinColumn({ name: "booking_id" }) 
  booking!: Booking;

  @Column({ type: "varchar", length: 6 })
  booking_id!: number;
}

import { ViewEntity, ViewColumn, PrimaryColumn } from "typeorm";

@ViewEntity({
  name: "PassengerFlightView",
  synchronize: false, 
})
export class PassengerFlightView {
  @PrimaryColumn({type:'varchar'})
  passenger_id!: number;

  @ViewColumn()
  first_name!: string;

  @ViewColumn()
  last_name!: string;

  @ViewColumn()
  booking_id!: number;

  @PrimaryColumn({type: 'int'})
  flight_id!: number;

  @ViewColumn()
  flight_number!: string;

  @ViewColumn()
  departure_date!: string;

  @ViewColumn()
  arrival_date!: string;

  @ViewColumn()
  departure_airport!: string;

  @ViewColumn()
  arrival_airport!: string;
}

import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { Flight } from '../entities/Flight';
import { Booking } from '../entities/Booking';
import { Passenger } from '../entities/Passenger';
import { FlightBooking } from '../entities/FlightBooking';
import { PassengerFlightView } from '../entities/PassengerFlightView';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Flight, Booking, Passenger, FlightBooking, PassengerFlightView],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // false recommended in production
  ssl: {
    rejectUnauthorized: false
  }
});

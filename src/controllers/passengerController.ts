import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../config/dataSource'
import { Passenger } from '../entities/Passenger';
import { getPassengerById, getPassengersByFlightAndDate } from '../services/passengerService';
import { logHelper } from '../utils/logger';
import { MappedPassengerByFlightAndDate, PassengerByFlightAndDateDbResponse, PassengerByIdDbResponse, PassengerByIdResponseDto } from '../types/passenger';

const findPassengersLog = logHelper('Controller', 'findPassengers');
const findPassengerByIdLog = logHelper('Controller', 'findPassengersById');


export const findPassengers = async (req: Request, res: Response, next: NextFunction) => {
  const { flightNumber, departureDate } = req.query;
  findPassengersLog.info('Request received', { flightNumber, departureDate });
  try {

    const passengers: PassengerByFlightAndDateDbResponse[]   = await getPassengersByFlightAndDate(
      flightNumber as string,
      departureDate as string
    );

    findPassengersLog.info('Passengers fetched successfully', { count: passengers.length });

    const mappedPassengers: MappedPassengerByFlightAndDate[] = passengers.map(p => ({
      passengerId: p.passenger_id,
      firstName: p.first_name,
      lastName: p.last_name,
      bookingId: p.booking_id,
    }));

    res.json({ success: true, data: mappedPassengers });
  } catch (error) {
    findPassengersLog.error('Error in findPassengers', { error: error instanceof Error ? error.message : String(error) });
    next(error);
  }
};


export const findPassengersById = async (req: Request, res: Response, next: NextFunction) => {
  const { passengerId } = req.params;
  findPassengerByIdLog.info('Request received', { passengerId });
  try {
    const passenger: PassengerByIdDbResponse[] = await getPassengerById(
      passengerId as string
    );

    const mappedPassenger:PassengerByIdResponseDto = {
      passengerId: passenger[0].p_passenger_id,
      firstName: passenger[0].p_first_name,
      lastName: passenger[0].p_last_name,
      email: passenger[0].p_email,
      bookingId: passenger[0].b_booking_id,
      flights: passenger.map(row => ({
        flightNumber: row.f_flight_number,
        departureAirport: row.f_departure_airport,
        arrivalAirport: row.f_arrival_airport,
        departureDate: row.departure_date,
        arrivalDate: row.arrival_date,
      })),
    };

    findPassengerByIdLog.info('Passenger data feched successfully', { passengerId });
    res.json({ success: true, data: mappedPassenger });
  } catch (error) {
    findPassengerByIdLog.error('Error in findPassengers by ID', { error: error instanceof Error ? error.message : String(error) });
    next(error);
  }
};


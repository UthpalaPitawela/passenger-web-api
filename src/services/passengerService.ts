import { AppDataSource } from '../config/dataSource'; 
import { Passenger } from '../entities/Passenger';
import { NotFoundError } from '../errors/NotFoundError';
import { logHelper } from '../utils/logger';

const getPassengerByFlightLog = logHelper('Service', 'getPassengersByFlightAndDate'); 
const getPassengerLog = logHelper('Service', 'getPassengerById'); 

export const getPassengersByFlightAndDate = async (
  flightNumber: string,
  departureDate: string
) => {
  getPassengerByFlightLog.info('Fetching passengers by flight and date', { flightNumber, departureDate });

  try {
    const passengers = await AppDataSource.getRepository(Passenger)
      .createQueryBuilder("passenger")
      .innerJoin("passenger.booking", "booking")
      .innerJoin("booking.flightBookings", "flightBooking")
      .innerJoin("flightBooking.flight", "flight")
      .where("flight.flight_number = :flightNumber", { flightNumber })
      .andWhere("flight.departure_date = :departureDate", { departureDate })
      .select([
        "passenger.passenger_id",
        "passenger.first_name",
        "passenger.last_name",
        "passenger.booking_id",
      ])
      .getMany();

    if (passengers.length === 0) {
      getPassengerByFlightLog.warn('No passengers found for provided flight and date', { flightNumber, departureDate });
      throw new NotFoundError(`Passengers with flight Number ${flightNumber} and departure date ${departureDate} not found`);
    }

    getPassengerByFlightLog.info(`Found ${passengers.length} passenger(s)`, { count: passengers.length });
    return passengers;

  } catch (error: any) {
    getPassengerByFlightLog.error('Error fetching passengers', { flightNumber, departureDate, error: error.message });
    throw error;
  }
};

export const getPassengerById = async (passengerId: string) => {
   getPassengerLog.info('Fetching passenger by ID', { passengerId });


  try {
    const passenger = await AppDataSource
      .getRepository(Passenger)
      .createQueryBuilder("p")
      .innerJoin("p.booking", "b")
      .innerJoin("b.flightBookings", "fb")
      .innerJoin("fb.flight", "f")
      .select([
        "p.passenger_id",
        "p.first_name",
        "p.last_name",
        "p.email",
        "b.booking_id",
        "f.flight_number",
        "f.departure_airport",
        "f.arrival_airport",
      ])
      .addSelect("TO_CHAR(f.departure_date, 'YYYY-MM-DD')", "departure_date")
      .addSelect("TO_CHAR(f.arrival_date, 'YYYY-MM-DD')", "arrival_date")
      .where("p.passenger_id = :passengerId", { passengerId })
      .getRawMany();

    if (passenger.length === 0) {
      getPassengerLog.warn('No passenger found', { passengerId });
      throw new NotFoundError(`Passenger with ID ${passengerId} not found`);
    }

    getPassengerLog.info('Successfully fetched passenger', { passengerId });
    return passenger;

  } catch (error: any) {
    getPassengerLog.error('Error fetching passenger', { passengerId, error: error.message });
    throw error; 
  }
};

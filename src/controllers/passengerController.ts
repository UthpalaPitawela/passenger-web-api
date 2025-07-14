import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../config/dataSource'
import { Passenger } from '../entities/Passenger';
import { getPassengerById, getPassengersByFlightAndDate } from '../services/passengerService';
import { logHelper } from '../utils/logger';
import { MappedPassengerByFlightAndDate, PassengerByFlightAndDateDbResponse, PassengerByIdDbResponse, PassengerByIdResponseDto } from '../types/passenger';

const findPassengersLog = logHelper('Controller', 'findPassengers');
const findPassengerByIdLog = logHelper('Controller', 'findPassengersById');

/**
 * @swagger
 * /passengers:
 *   get:
 *     summary: Get passengers by flight number and departure date
 *     tags: [Passengers]
 *     parameters:
 *       - in: query
 *         name: flightNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Flight number to search for passengers
 *         example: "FL123"
 *       - in: query
 *         name: departureDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Departure date in YYYY-MM-DD format
 *         example: "2024-12-25"
 *     responses:
 *       200:
 *         description: List of passengers for the specified flight and date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PassengerByFlight'
 *       400:
 *         description: Bad request - missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No passengers found for the specified flight and date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /passengers/{passengerId}:
 *   get:
 *     summary: Get passenger details by passenger ID
 *     tags: [Passengers]
 *     parameters:
 *       - in: path
 *         name: passengerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the passenger
 *         example: "PASS123"
 *     responses:
 *       200:
 *         description: Passenger details with associated flights
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Passenger'
 *       400:
 *         description: Bad request - invalid passenger ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Passenger not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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


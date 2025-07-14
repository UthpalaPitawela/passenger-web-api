import { NextFunction } from 'express';
import { findPassengers, findPassengersById } from '../../src/controllers/passengerController';
import { getPassengersByFlightAndDate, getPassengerById } from '../../src/services/passengerService';

jest.mock('../../src/services/passengerService');

describe('findPassengers controller', () => {
  let req: any;
  let res: any;
  let next: NextFunction;
  const mockPassengers = [
    {
      passenger_id: 'P1',
      first_name: 'John',
      last_name: 'Doe',
      booking_id: 'B123',
    },
  ];

  beforeEach(() => {
    req = {
      query: {
        flightNumber: 'AB123',
        departureDate: '2025-07-15',
      },
    };

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), 
    };

    next = jest.fn();

    (getPassengersByFlightAndDate as jest.Mock).mockReset();
  });

  it('should fetch passengers and respond with mapped data', async () => {
    (getPassengersByFlightAndDate as jest.Mock).mockResolvedValue(mockPassengers);

    await findPassengers(req, res, next);

    expect(getPassengersByFlightAndDate).toHaveBeenCalledWith('AB123', '2025-07-15');

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: [
        {
          passengerId: 'P1',
          firstName: 'John',
          lastName: 'Doe',
          bookingId: 'B123',
        },
      ],
    });
  });

  it('should respond with status 500 and error message if service throws', async () => {
    const error = new Error('Passengers not found');
    (getPassengersByFlightAndDate as jest.Mock).mockRejectedValue(error);

    await findPassengers(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('findPassengersById controller', () => {
  let req: any;
  let res: any;
  let next: jest.MockedFunction<NextFunction>;


  const mockPassengerData = [
    {
      p_passenger_id: 'P1',
      p_first_name: 'John',
      p_last_name: 'Doe',
      p_email: 'john.doe@example.com',
      b_booking_id: 'B123',
      f_flight_number: 'XY123',
      f_departure_airport: 'JFK',
      f_arrival_airport: 'LAX',
      departure_date: '2025-07-13',
      arrival_date: '2025-07-14',
    },
    {
      p_passenger_id: 'P1',
      p_first_name: 'John',
      p_last_name: 'Doe',
      p_email: 'john.doe@example.com',
      b_booking_id: 'B123',
      f_flight_number: 'XY124',
      f_departure_airport: 'LAX',
      f_arrival_airport: 'SFO',
      departure_date: '2025-07-15',
      arrival_date: '2025-07-15',
    },
  ];

  beforeEach(() => {
    req = {
      params: {
        passengerId: 'P1',
      },
    };

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

      next = jest.fn();

    (getPassengerById as jest.Mock).mockReset();
  });

  it('should fetch passenger by id and respond with mapped data', async () => {
    (getPassengerById as jest.Mock).mockResolvedValue(mockPassengerData);

    await findPassengersById(req, res, next);

    expect(getPassengerById).toHaveBeenCalledWith('P1');

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: {
        passengerId: 'P1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        bookingId: 'B123',
        flights: [
          {
            flightNumber: 'XY123',
            departureAirport: 'JFK',
            arrivalAirport: 'LAX',
            departureDate: '2025-07-13',
            arrivalDate: '2025-07-14',
          },
          {
            flightNumber: 'XY124',
            departureAirport: 'LAX',
            arrivalAirport: 'SFO',
            departureDate: '2025-07-15',
            arrivalDate: '2025-07-15',
          },
        ],
      },
    });
  });

    it('should call next with error if service throws an error', async () => {
    const error = new Error('Passenger not found');
    (getPassengerById as jest.Mock).mockRejectedValue(error);

    await findPassengersById(req , res , next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

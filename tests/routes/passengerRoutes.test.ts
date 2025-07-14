// tests/routes/passengerRoutes.test.ts
import request from 'supertest';
import app from '../../src/app';
import * as passengerService from '../../src/services/passengerService';

jest.mock('../../src/services/passengerService');

describe('Passenger Routes', () => {
  describe('GET /passengers', () => {
    it('should return 200 and passenger list when valid query provided', async () => {
      (passengerService.getPassengersByFlightAndDate as jest.Mock).mockResolvedValue([
        {
            passenger_id: "SK1234",
            first_name: "Satu",
            last_name: "Kaisa",
            booking_id: "BK7M4Q"
        },
        {
            passenger_id: "MJ2345",
            first_name: "Mikko",
            last_name: "Järvinen",
            booking_id: "BK7M4Q"
        },
        {
            passenger_id: "TH7890",
            first_name: "Tom",
            last_name: "Hansen",
            booking_id: "BK3C4D"
        }
    ]);

      const res = await request(app).get('/api/passengers').query({
        flightNumber: 'AB123',
        departureDate: '2025-08-01',
      });

      expect(res.status).toBe(200);
    }, 10000);

    it('should return 400 if query params are missing', async () => {
      const res = await request(app).get('/api/passengers'); 

      expect(res.status).toBe(400); 
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /passengers/:passengerId', () => {
    it('should return 200 and passenger when ID is valid', async () => {
      (passengerService.getPassengerById as jest.Mock).mockResolvedValue([
        {
          p_passenger_id: 'SK1234',
          p_first_name: 'John',
          p_last_name: 'Doe',
          p_email: 'john@example.com',
          b_booking_id: 'B123',
          f_flight_number: 'AB123',
          f_departure_airport: 'HEL',
          f_arrival_airport: 'JFK',
          departure_date: '2025-07-15',
          arrival_date: '2025-07-16',
        },
      ]);

      const res = await request(app).get('/api/passengers/SK1234');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.passengerId).toBe('SK1234');
    });

    it('should return 400 for invalid passengerId', async () => {
      const res = await request(app).get('/api/passengers/'); 

      expect(res.status).toBe(400); 
      expect(res.body.success).toBe(false);
    });
  });
});

import { getPassengerById, getPassengersByFlightAndDate } from '../../src/services/passengerService';
import { AppDataSource } from '../../src/config/dataSource'; 
import { Passenger } from '../../src/entities/Passenger';

jest.mock('../../src/config/dataSource'); 

describe('getPassengersByFlightAndDate', () => {
  const mockGetMany = jest.fn();

  beforeEach(() => {
   
    const mockQueryBuilder: any = {
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      getMany: mockGetMany,
    };

    (AppDataSource.getRepository as jest.Mock).mockReturnValue({
      createQueryBuilder: () => mockQueryBuilder,
    });
  });

  it('should return passengers for a given flight and date', async () => {
    const mockPassengers = [
      {
        passenger_id: 'P1',
        first_name: 'John',
        last_name: 'Doe',
        booking_id: 'B12345',
      },
    ];

    mockGetMany.mockResolvedValue(mockPassengers);

    const result = await getPassengersByFlightAndDate('AB123', '2025-07-15');

    expect(result).toEqual(mockPassengers);
    expect(mockGetMany).toHaveBeenCalled();
  });
});
describe('getPassengerById', () => {
  const mockGetRawMany = jest.fn();

  beforeEach(() => {
    const mockQueryBuilder: any = {
      innerJoin: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getRawMany: mockGetRawMany,
    };

    (AppDataSource.getRepository as jest.Mock).mockReturnValue({
      createQueryBuilder: () => mockQueryBuilder,
    });
  });

  it('should return passengers for the given passengerId', async () => {
    const mockPassengers = [
      {
        passenger_id: 'SK1234',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        booking_id: 'b456',
        flight_number: 'XY123',
        departure_airport: 'JFK',
        arrival_airport: 'LAX',
        departure_date: '2025-07-13',
        arrival_date: '2025-07-14',
      },
    ];

    mockGetRawMany.mockResolvedValue(mockPassengers);

    const result = await getPassengerById('SK1234');

    expect(result).toEqual(mockPassengers);
    expect(mockGetRawMany).toHaveBeenCalled();
  });
});

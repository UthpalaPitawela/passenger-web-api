import { AppDataSource } from "../config/dataSource"; // Your DataSource config
import { Passenger } from "../entities/Passenger";
import { Booking } from "../entities/Booking";
import { Flight } from "../entities/Flight";
import { FlightBooking } from "../entities/FlightBooking";

const initializeApp = async () => {

    try {
      await AppDataSource.initialize();
      console.log('Database connected');
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  
};

const seed = async () => {


  await initializeApp();

  const booking = new Booking();
  booking.booking_id = "BK7M4Q";
  await AppDataSource.getRepository(Booking).save(booking);

  const passenger = new Passenger();
  passenger.passenger_id = "SK1234"
  passenger.first_name = "Satu";
  passenger.last_name = "Kaisa";
  passenger.email = "satu@example.com";
  passenger.booking = booking;
  await AppDataSource.getRepository(Passenger).save(passenger);

  const flight = new Flight();
  flight.flight_number = "AB123";
  flight.departure_date = "2025-08-01";
  flight.arrival_date = "2025-08-02";
  flight.departure_airport = "HEL";
  flight.arrival_airport = "ARN";
  await AppDataSource.getRepository(Flight).save(flight);

  const flightBooking = new FlightBooking();
  flightBooking.booking = booking;
  flightBooking.flight = flight;
  await AppDataSource.getRepository(FlightBooking).save(flightBooking);

  console.log("🌱 Seeding completed");
  await AppDataSource.destroy();
};

seed().catch((err) => {
  console.error("❌ Seeding failed", err);
});




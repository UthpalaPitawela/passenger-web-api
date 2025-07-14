import { AppDataSource } from "../config/dataSource";
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

  // 5 Bookings (2 shared)
  const bookings = [
    { booking_id: "BK7M4Q" }, // Shared by 2 passengers
    { booking_id: "BK1A2B" }, // Shared by 2 passengers
    { booking_id: "BK9Z8X" },
    { booking_id: "BK3C4D" },
    { booking_id: "BK5E6F" },
  ];
  const savedBookings = await AppDataSource.getRepository(Booking).save(bookings);

  // 6 Passengers
  const passengers = [
    {
      passenger_id: "SK1234",
      first_name: "Satu",
      last_name: "Kaisa",
      email: "satu@example.com",
      booking: savedBookings[0],
    },
    {
      passenger_id: "MJ2345",
      first_name: "Mikko",
      last_name: "Järvinen",
      email: "mikko@example.com",
      booking: savedBookings[0],
    },
    {
      passenger_id: "JK5678",
      first_name: "John",
      last_name: "Kendrick",
      email: "john@example.com",
      booking: savedBookings[1],
    },
    {
      passenger_id: "AA1111",
      first_name: "Alice",
      last_name: "Andersson",
      email: "alice@example.com",
      booking: savedBookings[1],
    },
    {
      passenger_id: "LM9012",
      first_name: "Lina",
      last_name: "Moore",
      email: "lina@example.com",
      booking: savedBookings[2],
    },
    {
      passenger_id: "TH7890",
      first_name: "Tom",
      last_name: "Hansen",
      email: "tom@example.com",
      booking: savedBookings[3],
    },
  ];
  await AppDataSource.getRepository(Passenger).save(passengers);

  // 3 Flights
  const flights = [
    {
      flight_number: "AB123",
      departure_date: "2025-08-01",
      arrival_date: "2025-08-02",
      departure_airport: "HEL",
      arrival_airport: "ARN",
    },
    {
      flight_number: "CD456",
      departure_date: "2025-08-03",
      arrival_date: "2025-08-04",
      departure_airport: "ARN",
      arrival_airport: "OSL",
    },
    {
      flight_number: "EF789",
      departure_date: "2025-08-05",
      arrival_date: "2025-08-06",
      departure_airport: "OSL",
      arrival_airport: "CPH",
    },
  ];
  const savedFlights = await AppDataSource.getRepository(Flight).save(flights);

  // 5 FlightBookings (linking bookings to flights)
  // Now allowing multiple flights per booking
const flightBookings = [
  // booking[0] (SK1234 & MJ2345) → flight AB123 and CD456
  { booking: savedBookings[0], flight: savedFlights[0] },
  { booking: savedBookings[0], flight: savedFlights[1] },

  // booking[1] (JK5678 & AA1111) → flight CD456 and EF789
  { booking: savedBookings[1], flight: savedFlights[1] },
  { booking: savedBookings[1], flight: savedFlights[2] },

  // booking[2] (LM9012) → flight EF789
  { booking: savedBookings[2], flight: savedFlights[2] },

  // booking[3] (TH7890) → flight AB123
  { booking: savedBookings[3], flight: savedFlights[0] },

  // booking[4] (unused) → flight CD456
  { booking: savedBookings[4], flight: savedFlights[1] },
];

  await AppDataSource.getRepository(FlightBooking).save(flightBookings);

  console.log("Seeding completed with 6 passengers, 5 bookings, and 3 flights.");
  await AppDataSource.destroy();
};

seed().catch((err) => {
  console.error("Seeding failed", err);
});

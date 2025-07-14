-- Booking Table
CREATE TABLE booking (
  booking_id VARCHAR(6) PRIMARY KEY
);

-- Passenger Table
CREATE TABLE passenger (
  passenger_id VARCHAR PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  booking_id VARCHAR(6) NOT NULL,
  CONSTRAINT fk_passenger_booking FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE
);

-- Flight Table
CREATE TABLE flight (
  flight_id SERIAL PRIMARY KEY,
  flight_number TEXT NOT NULL,
  departure_date DATE NOT NULL,
  arrival_date DATE NOT NULL,
  departure_airport TEXT NOT NULL,
  arrival_airport TEXT NOT NULL,
  CONSTRAINT unique_flight_number_date UNIQUE (flight_number, departure_date)
);

-- FlightBooking Table
CREATE TABLE flight_booking (
  id SERIAL PRIMARY KEY,
  booking_id VARCHAR(6) NOT NULL,
  flight_id INTEGER NOT NULL,
  CONSTRAINT fk_flightbooking_booking FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE,
  CONSTRAINT fk_flightbooking_flight FOREIGN KEY (flight_id) REFERENCES flight(flight_id) ON DELETE CASCADE
);

-- PassengerFlightView (create manually in DB, as synchronize: false in TypeORM)
CREATE VIEW "PassengerFlightView" AS
SELECT
  p.passenger_id,
  p.first_name,
  p.last_name,
  p.booking_id,
  fb.flight_id,
  f.flight_number,
  f.departure_date,
  f.arrival_date,
  f.departure_airport,
  f.arrival_airport
FROM passenger p
JOIN flight_booking fb ON p.booking_id = fb.booking_id
JOIN flight f ON fb.flight_id = f.flight_id;

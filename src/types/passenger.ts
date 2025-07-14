export interface PassengerByIdDbResponse {
  p_passenger_id: string;
  p_first_name: string;
  p_last_name: string;
  p_email: string;
  b_booking_id: string;
  f_flight_number: string;
  f_departure_airport: string;
  f_arrival_airport: string;
  departure_date: string; 
  arrival_date: string;  
}

export interface PassengerByFlightAndDateDbResponse {
  passenger_id: string;
  first_name: string;
  last_name: string;
  booking_id: string;
}


export interface MappedPassengerByFlightAndDate {
  passengerId: string;
  firstName: string;
  lastName: string;
  bookingId: string;
}

export interface PassengerFlightDetails {
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string; 
  arrivalDate: string;  
}

export interface PassengerByIdResponseDto {
  passengerId: string;
  firstName: string;
  lastName: string;
  email: string;
  bookingId: string;
  flights: PassengerFlightDetails[];
}
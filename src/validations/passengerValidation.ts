import Joi from 'joi';
import { isValid, parseISO } from 'date-fns';

export const getPassengerQuerySchema = Joi.object({
  flightNumber: Joi.string()
    .pattern(/^[A-Z]{2}\d{3}$/)
    .required()
    .messages({
      'any.required': 'Flight number is required.',
      'string.empty': 'Flight number cannot be empty.',
      'string.pattern.base': 'Flight number must consist of two uppercase letters followed by three digits (e.g., AB123).',
    }),

  departureDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .custom((value, helpers) => {
      const parsedDate = parseISO(value);
      if (!isValid(parsedDate)) {
        return helpers.message({ custom: 'Departure date must be a valid calendar date.' });
      }
      return value;
    })
    .messages({
      'any.required': 'Departure date is required.',
      'string.empty': 'Departure date cannot be empty.',
      'string.pattern.base': 'Departure date must be in YYYY-MM-DD format.',
    }),
});

export const getPassengerParamsSchema = Joi.object({
  passengerId: Joi.string()
    .pattern(/^[A-Z]{2}\d{4}$/)
    .required()
    .messages({
      'any.required': 'Passenger ID is required.',
      'string.empty': 'Passenger ID cannot be empty.',
      'string.pattern.base': 'Passenger ID must consist of two uppercase letters followed by four digits (e.g., SK1234).',
    }),
});

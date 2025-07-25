import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { findConnectingPassengers, findPassengers, findPassengersById } from '../controllers/passengerController';
import { getPassengerParamsSchema, getPassengerQuerySchema } from '../validations/passengerValidation';

const router = Router();

router.get('/',validate(getPassengerQuerySchema, 'query'), findPassengers);
router.get('/connectedFlights/',validate(getPassengerQuerySchema, 'query'), findConnectingPassengers);
router.get('/:passengerId',validate(getPassengerParamsSchema, 'params'), findPassengersById);

export default router;

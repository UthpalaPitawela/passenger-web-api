import { Router } from 'express';

const router = Router();
import passengerRoutes from './passengerRoutes';

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Passenger API!' });
});
router.use('/passengers', passengerRoutes);

export default router;

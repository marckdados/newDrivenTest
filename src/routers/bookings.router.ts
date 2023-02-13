import { createBookingUser, listBookingUser, updateBookingUser } from '@/controllers/bookings-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const bookingRouter = Router();
bookingRouter
  .all('/*', authenticateToken)
  .post('/', createBookingUser)
  .get('/', listBookingUser)
  .put('/:bookingId', updateBookingUser);

export { bookingRouter };

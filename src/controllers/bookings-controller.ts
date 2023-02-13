import { AuthenticatedRequest } from '@/middlewares';
import { bookingService } from '@/services/bookings-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function createBookingUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  try {
    const booking = await bookingService.createBooking(userId, roomId);

    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (e) {
    console.log(e);
    if (e.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (e.name === 'PaymentRequired') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    if (e.name === 'ForBiddenError') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function listBookingUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const bookingUser = await bookingService.getBookingUser(userId);
    return res.status(httpStatus.OK).send(bookingUser);
  } catch (e) {
    console.log(e);
    if (e.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function updateBookingUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  try {
    const booking = await bookingService.putBookingUser(userId, roomId, userId);
    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (e) {
    console.log(e);
    if (e.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (e.name === 'ForBiddenError') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

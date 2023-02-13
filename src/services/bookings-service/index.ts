import { notFoundError } from '@/errors';
import { forBiddenError } from '@/errors/forbidden-error';
import { paymentRequired } from '@/errors/payment-required';

import { bookingRepository } from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelRepository from '@/repositories/hotel-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function createBooking(userId: number, roomId: number) {
  const enrollmentExists = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticketExists = await ticketRepository.findTicketByEnrollmentId(enrollmentExists.id);
  const roomExists = await bookingRepository.findRoomById(roomId);
  const bookings = await bookingRepository.bookingsCapacity(roomId);

  if (!enrollmentExists) {
    throw notFoundError();
  }

  if (!ticketExists) {
    throw notFoundError();
  }
  if (
    ticketExists.TicketType.isRemote ||
    !ticketExists.TicketType.includesHotel ||
    ticketExists.status === 'RESERVED'
  ) {
    throw forBiddenError();
  }
  if (!roomExists) {
    throw notFoundError();
  }

  if (bookings.length >= roomExists.capacity) {
    throw forBiddenError();
  }

  const response = await bookingRepository.createBooking(userId, roomId);
  return response;
}

async function getBookingUser(userId: number) {
  const response = await bookingRepository.getBookingUser(userId);
  console.log(response);
  if (response === null) {
    throw notFoundError();
  }

  return response;
}

async function putBookingUser(bookingId: number, roomId: number, userId: number) {
  const booking = await bookingRepository.getBookingUser(userId);

  const roomExists = await bookingRepository.findRoomById(roomId);
  if (!roomExists) {
    throw notFoundError();
  }
  if (booking === null) {
    throw forBiddenError();
  }
  const bookings = await bookingRepository.bookingsCapacity(roomId);
  if (bookings.length >= roomExists.capacity) {
    throw forBiddenError();
  }

  const bookingIdAchar = await bookingRepository.findBookingId(bookingId);
  console.log(bookingIdAchar, 'Noo booking');

  const response = await bookingRepository.putBookingUser(bookingId, roomId, userId);
  return response;
}

export const bookingService = { createBooking, getBookingUser, putBookingUser };

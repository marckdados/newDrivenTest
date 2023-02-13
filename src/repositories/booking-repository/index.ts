import { prisma } from '@/config';

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function getBookingUser(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: {
        select: {
          id: true,
          name: true,
          capacity: true,
          hotelId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
}

async function findBookingId(bookingId: number) {
  return prisma.booking.findFirst({
    where: { id: bookingId },
  });
}

async function putBookingUser(bookingId: number, roomId: number, userId: number) {
  return prisma.booking.update({
    where: { id: bookingId },
    data: {
      roomId,
    },
  });
}

async function findRoomById(roomId: number) {
  return prisma.room.findFirst({
    where: { id: roomId },
  });
}

async function bookingsCapacity(roomId: number) {
  console.log(roomId);
  return prisma.booking.findMany({ where: { roomId: roomId } });
}

export const bookingRepository = {
  createBooking,
  getBookingUser,
  putBookingUser,
  findRoomById,
  bookingsCapacity,
  findBookingId,
};

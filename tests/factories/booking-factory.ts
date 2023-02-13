import { prisma } from '@/config';
import faker from '@faker-js/faker';
import { createHotel } from './hotels-factory';
import { createUser } from './users-factory';

export async function createBookingWhenRoomIdNoExists() {
  return {
    roomId: faker.datatype.number,
  };
}
export async function createRoomWithNoHaveVacages(hotelId: number) {
  return prisma.room.create({
    data: {
      name: '1020',
      capacity: 0,
      hotelId: hotelId,
    },
  });
}

export async function createRoomWithVacages(hotelId: number) {
  return prisma.room.create({
    data: {
      name: '1020',
      capacity: 3,
      hotelId: hotelId,
    },
  });
}

export async function createBookingUser(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

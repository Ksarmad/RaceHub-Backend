import AppError from "../../common/utils/AppError";
import prisma from "../../config/prisma";

export class AdminService {
  static async getRegistrations() {
    const registrations = await prisma.registration.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        assignment: {
          include: {
            timeslot: true,
          },
        },
      },
    });

    return registrations;
  }

  static async getAvailableTimeslots() {
    return prisma.timeSlot.findMany({
      where: {
        isAssigned: false,
      },

      orderBy: {
        slotTime: "asc",
      },
    });
  }

  static async assignTimeslot(data: { userId: string; timeslotId: string }) {
    // Check if user already assigned
    const existingAssignment = await prisma.assignment.findUnique({
      where: {
        registrationId: data.userId,
      },
    });

    if (existingAssignment) {
      throw new AppError("User already assigned", 400);
    }

    // Check if slot available
    const slot = await prisma.timeSlot.findUnique({
      where: {
        id: data.timeslotId,
      },
    });

    if (!slot || slot.isAssigned) {
      throw new AppError("Timeslot unavailable", 400);
    }

    // Transaction
    const assignment = await prisma.$transaction(async (tx: any) => {
      const createdAssignment = await tx.assignment.create({
        data: {
          registrationId: data.userId,

          timeslotId: data.timeslotId,
        },
      });

      await tx.timeSlot.update({
        where: {
          id: data.timeslotId,
        },

        data: {
          isAssigned: true,
        },
      });

      return createdAssignment;
    });

    return assignment;
  }
}

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
  static async assignTimeslot(
  data: {
    userId: string;
    timeslotId: string;
  }
) {
  // Check if user already assigned
  const existingAssignment =
    await prisma.assignment.findUnique({
      where: {
        userId: data.userId,
      },
    });

  if (existingAssignment) {
    throw new Error(
      "User already assigned"
    );
  }

  // Check if slot available
  const slot =
    await prisma.timeslot.findUnique({
      where: {
        id: data.timeslotId,
      },
    });

  if (!slot || slot.isAssigned) {
    throw new Error(
      "Timeslot unavailable"
    );
  }

  // Transaction
  const assignment =
    await prisma.$transaction(
      async (tx) => {
        const createdAssignment =
          await tx.assignment.create({
            data: {
              userId: data.userId,
              timeslotId:
                data.timeslotId,
            },
          });

        await tx.timeslot.update({
          where: {
            id: data.timeslotId,
          },

          data: {
            isAssigned: true,
          },
        });

        return createdAssignment;
      }
    );

  return assignment;
}
}

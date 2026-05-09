import bcrypt from "bcryptjs";

import prisma from "../src/config/prisma";

async function main() {
  // Admin
  const hashedPassword =
    await bcrypt.hash("admin123", 10);

  await prisma.admin.upsert({
    where: {
      email: "admin@gmail.com",
    },

    update: {},

    create: {
      email: "admin@gmail.com",
      password: hashedPassword,
    },
  });

  // Timeslots
  const slots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
  ];

  for (const slot of slots) {
    await prisma.timeSlot.upsert({
      where: {
        slotTime: slot,
      },

      update: {},

      create: {
        slotTime: slot,
      },
    });
  }

  console.log(
    "✅ Admin & timeslots seeded"
  );
}

main()
  .catch((error) => {
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
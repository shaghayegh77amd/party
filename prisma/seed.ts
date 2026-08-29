import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.rSVP.count();
  if (existing > 0) {
    console.log(`Skipping seed: ${existing} RSVP row(s) already exist.`);
    return;
  }

  await prisma.rSVP.createMany({
    data: [
      { guestName: "سارا محمدی", attendanceStatus: "COMING_WITH_LOVE", hasCompanion: true },
      { guestName: "علی رضایی", attendanceStatus: "DEFINITELY_COMING", hasCompanion: false },
      { guestName: "مریم کریمی", attendanceStatus: "NOT_COMING", hasCompanion: null },
    ],
  });

  console.log("Seeded 3 sample RSVP rows.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

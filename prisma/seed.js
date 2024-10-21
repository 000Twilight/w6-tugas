import { PrismaClient } from '@prisma/client';
import validator from 'validator';

const prisma = new PrismaClient();

async function main() {
  const guestbookEntries = [
    {
      name: validator.escape("Budi Santoso"),
      email: validator.escape("budi.santoso@example.com"),
      comment: validator.escape("Wihh mantap banget nih website! Keren abis, bro! 😎👍"),
    },
    {
      name: validator.escape("Siti Nurhaliza"),
      email: validator.escape("siti.nur@example.com"),
      comment: validator.escape("Halo semua! Seru banget nih, semoga makin sukses ya! ✨"),
    },
    {
      name: validator.escape("Doni Pratama"),
      email: validator.escape("doni.pratama@example.com"),
      comment: validator.escape("Gw sih gasuka basa basi, pokoknya jos gandos! 😁🔥"),
    },
    {
      name: validator.escape("Rina Aprilia"),
      email: validator.escape("rina.aprilia@example.com"),
      comment: validator.escape("Ih, kece banget ini! Boleh dong gabung lagi lain kali! 🤩"),
    },
    {
      name: validator.escape("Andi Wibowo"),
      email: validator.escape("andi.wibowo@example.com"),
      comment: validator.escape("Website ini beneran gokil, ga nyangka! Semangat terus buat developernya! 🚀💪"),
    },
  ];

  for (const entry of guestbookEntries) {
    await prisma.guestbookEntry.create({
      data: entry,
    });
  }

  console.log('Dummy data has been seeded successfully!');
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

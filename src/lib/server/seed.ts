import { PrismaClient } from "@prisma/client";
import { seedDutyTypes } from "./seeds/seed-duty-types";
import { seedDutyTypesLookup } from "./seeds/seed-duty-types-lookup";
import { seedDuties } from "./seeds/seed-duties";
import { seedResponsibilitiesDuties1to3 } from "./seeds/seed-responsibilities-1-3";
import { seedResponsibilitiesDuties4to18 } from "./seeds/seed-responsibilities-4-18";
import { seedResponsibilitiesDuties19to50 } from "./seeds/seed-responsibilities-19-50";
import { seedResponsibilitiesDuties51to59 } from "./seeds/seed-responsibilities-51-59";
import { seedEmergencies } from "./seeds/seed-emergencies";
import { seedIssues } from "./seeds/seed-issues";
import { seedVirtues } from "./seeds/seed-virtues";
import { seedStarterResponsibilities } from "./seeds/seed-starter-responsibilities";
import { seedArtForms } from "./seeds/seed-art-forms";
import { seedRoleTags } from "./seeds/seed-role-tags";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding Tamil Vedic household duties database...");

  // Clear existing data (delete junction tables first due to foreign key constraints)
  await prisma.responsibility.deleteMany();
  await prisma.dutyVirtue.deleteMany();
  await prisma.starterResponsibility.deleteMany();
  await prisma.duty.deleteMany();
  await prisma.dutyType.deleteMany();
  await prisma.virtue.deleteMany();
  await prisma.emergency.deleteMany();
  await prisma.issue.deleteMany();

  // Seed Duty Types
  await seedDutyTypes(prisma);
  await seedDutyTypesLookup(prisma);

  // Seed Duties
  const duties = await seedDuties(prisma);

  // Seed Responsibilities
  await seedResponsibilitiesDuties1to3(prisma, duties);
  await seedResponsibilitiesDuties4to18(prisma, duties);
  await seedResponsibilitiesDuties19to50(prisma, duties);
  await seedResponsibilitiesDuties51to59(prisma, duties);

  // Seed Virtues
  await seedVirtues(prisma);

  // Seed Role Tags
  await seedRoleTags(prisma);

  // Seed Art Forms
  await seedArtForms(prisma);

  // Seed Emergencies
  await seedEmergencies(prisma);

  // Seed Issues
  await seedIssues(prisma);

  // Seed Starter Responsibilities
  await seedStarterResponsibilities(prisma);

  console.log("Database seeded successfully!");
}

seed().catch(console.error).finally(() => prisma.$disconnect());
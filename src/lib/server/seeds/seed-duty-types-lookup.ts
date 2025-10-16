import { PrismaClient } from "@prisma/client";

export async function seedDutyTypesLookup(prisma: PrismaClient) {
  console.log("Seeding duty types lookup...");

  const dutyTypesLookup = [
    { id: 1, dutyTypeTitle: "Karmic Duty", description: "Karma-focused survival duties" },
    { id: 2, dutyTypeTitle: "Dharmic Duty", description: "Righteous duty and moral obligations" },
    { id: 3, dutyTypeTitle: "Self Duty", description: "Personal spiritual development" },
    { id: 4, dutyTypeTitle: "Heavenly Duty", description: "Duties towards divine beings" },
    { id: 5, dutyTypeTitle: "Divinely Duty", description: "Sage-like enlightened duties" },
    { id: 6, dutyTypeTitle: "Earthly Duty", description: "Natural element-based duties" },
    { id: 7, dutyTypeTitle: "Clan Duty", description: "Family heritage and lineage duties" }
  ];

  for (const dutyType of dutyTypesLookup) {
    await prisma.dutyTypesLookup.upsert({
      where: { id: dutyType.id },
      update: dutyType,
      create: dutyType
    });
  }
}
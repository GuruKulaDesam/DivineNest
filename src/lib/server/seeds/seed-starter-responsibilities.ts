import { PrismaClient } from '@prisma/client';

export async function seedStarterResponsibilities(prisma: PrismaClient) {
  console.log('Seeding starter responsibilities...');

  const starterResponsibilities = [
    {
      responsibilityId: 195,
      description: "Groceries often run low midweek",
      virtueIds: "[33,44]",
      linkedVirtueTitles: "Restraint in Food, Sacred Work",
      role: "Mother",
      lifeStage: "Householder",
      urgencyLevel: "Medium",
      frequency: "Weekly"
    },
    {
      responsibilityId: 196,
      description: "Laundry tends to pile up before weekend",
      virtueIds: "[44,48]",
      linkedVirtueTitles: "Sacred Work, Sacred Space",
      role: "Father",
      lifeStage: "Householder",
      urgencyLevel: "Medium",
      frequency: "Weekly"
    },
    {
      responsibilityId: 197,
      description: "Fridge accumulates expired or unused items",
      virtueIds: "[33,48]",
      linkedVirtueTitles: "Restraint in Food, Sacred Space",
      role: "Admin",
      lifeStage: "Householder",
      urgencyLevel: "Low",
      frequency: "Monthly"
    },
    {
      responsibilityId: 198,
      description: "Water bottles and filters need regular refilling",
      virtueIds: "[23,50]",
      linkedVirtueTitles: "Sacred Water, Ecology",
      role: "Youth",
      lifeStage: "All",
      urgencyLevel: "Low",
      frequency: "Daily"
    },
    {
      responsibilityId: 199,
      description: "School bags sometimes left unpacked",
      virtueIds: "[44,43]",
      linkedVirtueTitles: "Sacred Work, Sacred Learning",
      role: "Mother",
      lifeStage: "Youth",
      urgencyLevel: "Medium",
      frequency: "Daily"
    },
    {
      responsibilityId: 200,
      description: "Elder's medicine schedule needs consistent tracking",
      virtueIds: "[24,44]",
      linkedVirtueTitles: "Respect for Elders, Sacred Work",
      role: "Father",
      lifeStage: "Elder",
      urgencyLevel: "High",
      frequency: "Daily"
    },
    {
      responsibilityId: 201,
      description: "Devices often uncharged before travel",
      virtueIds: "[44,45]",
      linkedVirtueTitles: "Sacred Work, Sacred Time",
      role: "Youth",
      lifeStage: "All",
      urgencyLevel: "Medium",
      frequency: "Event-Based"
    },
    {
      responsibilityId: 202,
      description: "Guest towels and supplies occasionally hard to locate",
      virtueIds: "[22,25]",
      linkedVirtueTitles: "Hospitality, Family Unity",
      role: "Mother",
      lifeStage: "Householder",
      urgencyLevel: "Medium",
      frequency: "Monthly"
    },
    {
      responsibilityId: 203,
      description: "Festival clothes not always ready or ironed",
      virtueIds: "[28,25]",
      linkedVirtueTitles: "Sacred Joy, Family Unity",
      role: "Sister",
      lifeStage: "Youth",
      urgencyLevel: "Medium",
      frequency: "Event-Based"
    },
    {
      responsibilityId: 204,
      description: "Birthdays of cousins and friends sometimes missed",
      virtueIds: "[46,25]",
      linkedVirtueTitles: "Sacred Memory, Family Unity",
      role: "Mother",
      lifeStage: "Youth",
      urgencyLevel: "Low",
      frequency: "Monthly"
    },
    {
      responsibilityId: 205,
      description: "Balcony plants may be overlooked during busy weeks",
      virtueIds: "[21,50]",
      linkedVirtueTitles: "Sacred Plants, Ecology",
      role: "Father",
      lifeStage: "Householder",
      urgencyLevel: "Low",
      frequency: "Weekly"
    },
    {
      responsibilityId: 206,
      description: "Trash collection timing occasionally forgotten",
      virtueIds: "[44,48]",
      linkedVirtueTitles: "Sacred Work, Sacred Space",
      role: "Admin",
      lifeStage: "Householder",
      urgencyLevel: "Medium",
      frequency: "Weekly"
    },
    {
      responsibilityId: 207,
      description: "Mail and packages need regular checking",
      virtueIds: "[44,45]",
      linkedVirtueTitles: "Sacred Work, Sacred Time",
      role: "Youth",
      lifeStage: "Householder",
      urgencyLevel: "Low",
      frequency: "Weekly"
    },
    {
      responsibilityId: 208,
      description: "Wi-Fi passwords and printer settings require updates",
      virtueIds: "[44,45]",
      linkedVirtueTitles: "Sacred Work, Sacred Time",
      role: "Admin",
      lifeStage: "All",
      urgencyLevel: "Medium",
      frequency: "Monthly"
    },
    {
      responsibilityId: 209,
      description: "Library books sometimes returned late",
      virtueIds: "[43,44]",
      linkedVirtueTitles: "Sacred Learning, Sacred Work",
      role: "Mother",
      lifeStage: "Youth",
      urgencyLevel: "Low",
      frequency: "Weekly"
    },
    {
      responsibilityId: 210,
      description: "Bill due dates can be missed without alerts",
      virtueIds: "[45,44]",
      linkedVirtueTitles: "Sacred Time, Sacred Work",
      role: "Father",
      lifeStage: "Householder",
      urgencyLevel: "High",
      frequency: "Monthly"
    },
    {
      responsibilityId: 211,
      description: "Vitamins and supplements often skipped",
      virtueIds: "[44,23]",
      linkedVirtueTitles: "Sacred Work, Sacred Water",
      role: "Mother",
      lifeStage: "All",
      urgencyLevel: "Medium",
      frequency: "Daily"
    },
    {
      responsibilityId: 212,
      description: "Entryway shoes and bags become cluttered",
      virtueIds: "[48,39]",
      linkedVirtueTitles: "Sacred Space, Ritual Purity",
      role: "Youth",
      lifeStage: "Householder",
      urgencyLevel: "Low",
      frequency: "Monthly"
    },
    {
      responsibilityId: 213,
      description: "Emergency contact info needs regular review",
      virtueIds: "[45,25]",
      linkedVirtueTitles: "Sacred Time, Family Unity",
      role: "Admin",
      lifeStage: "All",
      urgencyLevel: "High",
      frequency: "Quarterly"
    },
    {
      responsibilityId: 214,
      description: "Lunch boxes occasionally forgotten at school",
      virtueIds: "[44,33]",
      linkedVirtueTitles: "Sacred Work, Restraint in Food",
      role: "Mother",
      lifeStage: "Youth",
      urgencyLevel: "Medium",
      frequency: "Daily"
    },
    {
      responsibilityId: 215,
      description: "Weather check missed before outdoor plans",
      virtueIds: "[45,50]",
      linkedVirtueTitles: "Sacred Time, Ecology",
      role: "Father",
      lifeStage: "All",
      urgencyLevel: "Medium",
      frequency: "Daily"
    }
  ];

  for (const responsibility of starterResponsibilities) {
    await prisma.starterResponsibility.create({
      data: responsibility
    });
  }

  console.log('Starter responsibilities seeded successfully');
}
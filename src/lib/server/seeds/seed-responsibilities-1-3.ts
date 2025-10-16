import { PrismaClient } from "@prisma/client";

export async function seedResponsibilitiesDuties1to3(prisma: PrismaClient, duties: any[]) {
  console.log("Seeding responsibilities for duties 1-3...");

  const responsibilitiesData = [
    // Duty 1: Avoid causing harm in thought or action
    {
      dutyId: 1,
      responsibilityTitle: "Avoid harsh words even in anger",
      role: "Father",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Restraint",
      viceAvoided: "Harm"
    },
    {
      dutyId: 1,
      responsibilityTitle: "Refrain from gossip or slander",
      role: "Sister",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Mindfulness",
      viceAvoided: "Harm"
    },
    {
      dutyId: 1,
      responsibilityTitle: "Prevent harm to animals during household tasks",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Compassion",
      viceAvoided: "Harm"
    },
    {
      dutyId: 1,
      responsibilityTitle: "Stop others gently when they act harmfully",
      role: "Admin",
      frequency: "As needed",
      karmaPoints: 25,
      emotionalTone: "Courage",
      viceAvoided: "Harm"
    },
    {
      dutyId: 1,
      responsibilityTitle: "Avoid sarcasm or passive aggression",
      role: "Brother",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Clarity",
      viceAvoided: "Harm"
    },

    // Duty 2: Practice restraint in speech and behavior
    {
      dutyId: 2,
      responsibilityTitle: "Pause before speaking in difficult conversations",
      role: "Father",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Patience",
      viceAvoided: "Rashness"
    },
    {
      dutyId: 2,
      responsibilityTitle: "Choose words carefully to avoid misunderstanding",
      role: "Mother",
      frequency: "Daily",
      karmaPoints: 18,
      emotionalTone: "Wisdom",
      viceAvoided: "Rashness"
    },
    {
      dutyId: 2,
      responsibilityTitle: "Avoid impulsive reactions to minor provocations",
      role: "Brother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Self-control",
      viceAvoided: "Rashness"
    },

    // Duty 3: Avoid unnecessary purchases or indulgences
    {
      dutyId: 3,
      responsibilityTitle: "Reflect on true needs before buying",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 22,
      emotionalTone: "Mindfulness",
      viceAvoided: "Greed"
    },
    {
      dutyId: 3,
      responsibilityTitle: "Practice contentment with what one has",
      role: "Mother",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Gratitude",
      viceAvoided: "Greed"
    },
    {
      dutyId: 3,
      responsibilityTitle: "Avoid envy when seeing others' possessions",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Contentment",
      viceAvoided: "Greed"
    }
  ];

  for (const responsibility of responsibilitiesData) {
    await prisma.responsibility.create({
      data: {
        dutyId: duties[responsibility.dutyId - 1].id,
        responsibilityTitle: responsibility.responsibilityTitle,
        role: responsibility.role,
        frequency: responsibility.frequency,
        karmaPoints: responsibility.karmaPoints,
        emotionalTone: responsibility.emotionalTone,
        viceAvoided: responsibility.viceAvoided
      }
    });
  }
}
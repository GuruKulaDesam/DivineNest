import { PrismaClient } from "@prisma/client";

export async function seedResponsibilitiesDuties4to18(prisma: PrismaClient, duties: { id: number }[]) {
  console.log("Seeding responsibilities for duties 4-18...");

  const responsibilitiesData = [
    // Duty 4: Avoid unnecessary purchases or indulgences
    {
      dutyId: 4,
      responsibilityTitle: "Avoid unnecessary purchases or indulgences",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 22,
      emotionalTone: "Simplicity",
      viceAvoided: "Greed"
    },
    {
      dutyId: 4,
      responsibilityTitle: "Reflect on impermanence before acquiring possessions",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Awareness",
      viceAvoided: "Greed"
    },
    {
      dutyId: 4,
      responsibilityTitle: "Teach children the value of minimalism",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 18,
      emotionalTone: "Wisdom",
      viceAvoided: "Greed"
    },
    {
      dutyId: 4,
      responsibilityTitle: "Donate unused items to those in need",
      role: "Mother",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Generosity",
      viceAvoided: "Greed"
    },
    {
      dutyId: 4,
      responsibilityTitle: "Practice fasting or voluntary restraint",
      role: "Grand Father",
      frequency: "Monthly",
      karmaPoints: 22,
      emotionalTone: "Discipline",
      viceAvoided: "Greed"
    },
    {
      dutyId: 4,
      responsibilityTitle: "Avoid envy when others acquire wealth or status",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Contentment",
      viceAvoided: "Greed"
    },

    // Duty 5: Avoid emotional dependence on possessions
    {
      dutyId: 5,
      responsibilityTitle: "Avoid emotional dependence on possessions",
      role: "Grand Father",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Clarity",
      viceAvoided: "Attachment"
    },
    {
      dutyId: 5,
      responsibilityTitle: "Refrain from claiming ownership over shared resources",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Humility",
      viceAvoided: "Attachment"
    },
    {
      dutyId: 5,
      responsibilityTitle: "Let go of past grievances without clinging",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 22,
      emotionalTone: "Forgiveness",
      viceAvoided: "Attachment"
    },
    {
      dutyId: 5,
      responsibilityTitle: "Practice silence during moments of inner agitation",
      role: "Grand Father",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Stillness",
      viceAvoided: "Attachment"
    },
    {
      dutyId: 5,
      responsibilityTitle: "Avoid boasting about achievements or status",
      role: "Brother",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Modesty",
      viceAvoided: "Attachment"
    },
    {
      dutyId: 5,
      responsibilityTitle: "Teach younger members the value of letting go",
      role: "Grand Mother",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Wisdom",
      viceAvoided: "Attachment"
    },

    // Duty 6: Listen fully before responding in tense situations
    {
      dutyId: 6,
      responsibilityTitle: "Listen fully before responding in tense situations",
      role: "Father",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Calm",
      viceAvoided: "Retaliation"
    },
    {
      dutyId: 6,
      responsibilityTitle: "Avoid interrupting others during disagreement",
      role: "Sister",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Respect",
      viceAvoided: "Retaliation"
    },
    {
      dutyId: 6,
      responsibilityTitle: "Wait before reacting to criticism",
      role: "Brother",
      frequency: "As needed",
      karmaPoints: 18,
      emotionalTone: "Self-control",
      viceAvoided: "Retaliation"
    },
    {
      dutyId: 6,
      responsibilityTitle: "Teach children to wait their turn and share",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Retaliation"
    },
    {
      dutyId: 6,
      responsibilityTitle: "Refrain from escalating minor household conflicts",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Maturity",
      viceAvoided: "Retaliation"
    },
    {
      dutyId: 6,
      responsibilityTitle: "Practice deep breathing during moments of frustration",
      role: "Grand Father",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Stillness",
      viceAvoided: "Retaliation"
    },
    {
      dutyId: 6,
      responsibilityTitle: "Offer comfort instead of judgment when others falter",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Compassion",
      viceAvoided: "Retaliation"
    },

    // Duty 7: Offer comfort to those in pain or distress
    {
      dutyId: 7,
      responsibilityTitle: "Offer comfort to those in pain or distress",
      role: "Mother",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Nurturing",
      viceAvoided: "Cruelty"
    },
    {
      dutyId: 7,
      responsibilityTitle: "Speak kindly to animals and avoid harsh treatment",
      role: "Brother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Gentleness",
      viceAvoided: "Cruelty"
    },
    {
      dutyId: 7,
      responsibilityTitle: "Help elders with physical or emotional needs",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Care",
      viceAvoided: "Cruelty"
    },
    {
      dutyId: 7,
      responsibilityTitle: "Avoid mocking or belittling others",
      role: "Sister",
      frequency: "Daily",
      karmaPoints: 18,
      emotionalTone: "Respect",
      viceAvoided: "Cruelty"
    },
    {
      dutyId: 7,
      responsibilityTitle: "Volunteer time or resources to those suffering",
      role: "Admin",
      frequency: "Monthly",
      karmaPoints: 22,
      emotionalTone: "Generosity",
      viceAvoided: "Cruelty"
    },
    {
      dutyId: 7,
      responsibilityTitle: "Teach children to show empathy in daily interactions",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Guidance",
      viceAvoided: "Cruelty"
    },
    {
      dutyId: 7,
      responsibilityTitle: "Refrain from punishing harshly—choose correction",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Wisdom",
      viceAvoided: "Cruelty"
    },

    // Duty 8: Set aside a portion of income for giving
    {
      dutyId: 8,
      responsibilityTitle: "Set aside a portion of income for giving",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 22,
      emotionalTone: "Generosity",
      viceAvoided: "Hoarding"
    },
    {
      dutyId: 8,
      responsibilityTitle: "Donate food or clothing to local shelters",
      role: "Mother",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Compassion",
      viceAvoided: "Hoarding"
    },
    {
      dutyId: 8,
      responsibilityTitle: "Support education or healthcare for someone in need",
      role: "Admin",
      frequency: "Quarterly",
      karmaPoints: 22,
      emotionalTone: "Service",
      viceAvoided: "Hoarding"
    },
    {
      dutyId: 8,
      responsibilityTitle: "Teach children to give from what they have",
      role: "Grand Mother",
      frequency: "Monthly",
      karmaPoints: 18,
      emotionalTone: "Nurturing",
      viceAvoided: "Hoarding"
    },
    {
      dutyId: 8,
      responsibilityTitle: "Avoid accumulating unused items—give them away",
      role: "Sister",
      frequency: "Monthly",
      karmaPoints: 18,
      emotionalTone: "Mindfulness",
      viceAvoided: "Hoarding"
    },
    {
      dutyId: 8,
      responsibilityTitle: "Offer help without expecting recognition",
      role: "Grand Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Humility",
      viceAvoided: "Hoarding"
    },

    // Duty 9: Thank elders and mentors regularly
    {
      dutyId: 9,
      responsibilityTitle: "Thank elders and mentors regularly",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Reverence",
      viceAvoided: "Ingratitude"
    },
    {
      dutyId: 9,
      responsibilityTitle: "Acknowledge help received, even small gestures",
      role: "Sister",
      frequency: "Daily",
      karmaPoints: 18,
      emotionalTone: "Mindfulness",
      viceAvoided: "Ingratitude"
    },
    {
      dutyId: 9,
      responsibilityTitle: "Teach children to say thank you with sincerity",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Ingratitude"
    },
    {
      dutyId: 9,
      responsibilityTitle: "Write or speak words of appreciation to family members",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Warmth",
      viceAvoided: "Ingratitude"
    },
    {
      dutyId: 9,
      responsibilityTitle: "Avoid entitlement—recognize the value of support",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 22,
      emotionalTone: "Humility",
      viceAvoided: "Ingratitude"
    },
    {
      dutyId: 9,
      responsibilityTitle: "Offer return help to those who've supported you",
      role: "Brother",
      frequency: "As needed",
      karmaPoints: 20,
      emotionalTone: "Reciprocity",
      viceAvoided: "Ingratitude"
    },
    {
      dutyId: 9,
      responsibilityTitle: "Keep a gratitude journal or ritual",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Reflection",
      viceAvoided: "Ingratitude"
    },

    // Duty 10: Avoid interrupting elders or speaking out of turn
    {
      dutyId: 10,
      responsibilityTitle: "Avoid interrupting elders or speaking out of turn",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Respect",
      viceAvoided: "Impulsiveness"
    },
    {
      dutyId: 10,
      responsibilityTitle: "Refrain from instant reactions—pause and reflect",
      role: "Brother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Self-awareness",
      viceAvoided: "Impulsiveness"
    },
    {
      dutyId: 10,
      responsibilityTitle: "Limit screen time and avoid compulsive scrolling",
      role: "Youth",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Discipline",
      viceAvoided: "Impulsiveness"
    },
    {
      dutyId: 10,
      responsibilityTitle: "Practice mindful eating and avoid overindulgence",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Moderation",
      viceAvoided: "Impulsiveness"
    },
    {
      dutyId: 10,
      responsibilityTitle: "Teach children to wait patiently for their turn",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Nurturing",
      viceAvoided: "Impulsiveness"
    },
    {
      dutyId: 10,
      responsibilityTitle: "Avoid impulsive purchases—review needs first",
      role: "Admin",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Thoughtfulness",
      viceAvoided: "Impulsiveness"
    },
    {
      dutyId: 10,
      responsibilityTitle: "Use journaling or prayer to calm inner urges",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Stillness",
      viceAvoided: "Impulsiveness"
    },

    // Duty 11: Keep water and snacks ready for unexpected guests
    {
      dutyId: 11,
      responsibilityTitle: "Keep water and snacks ready for unexpected guests",
      role: "Mother",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Readiness",
      viceAvoided: "Neglect"
    },
    {
      dutyId: 11,
      responsibilityTitle: "Greet guests with warmth and respect",
      role: "Father",
      frequency: "Daily",
      karmaPoints: 18,
      emotionalTone: "Courtesy",
      viceAvoided: "Neglect"
    },
    {
      dutyId: 11,
      responsibilityTitle: "Involve children in welcoming and serving guests",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Inclusion",
      viceAvoided: "Neglect"
    },
    {
      dutyId: 11,
      responsibilityTitle: "Avoid ignoring visitors even during busy times",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Presence",
      viceAvoided: "Neglect"
    },
    {
      dutyId: 11,
      responsibilityTitle: "Offer food before asking about purpose of visit",
      role: "Grand Father",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Generosity",
      viceAvoided: "Neglect"
    },

    // Duty 12: Use kind words even when correcting others
    {
      dutyId: 12,
      responsibilityTitle: "Use kind words even when correcting others",
      role: "Sister",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Gentleness",
      viceAvoided: "Harshness"
    },
    {
      dutyId: 12,
      responsibilityTitle: "Avoid sarcasm or mocking tones",
      role: "Brother",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Respect",
      viceAvoided: "Harshness"
    },
    {
      dutyId: 12,
      responsibilityTitle: "Compliment sincerely and often",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Warmth",
      viceAvoided: "Harshness"
    },
    {
      dutyId: 12,
      responsibilityTitle: "Teach children to speak with kindness",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Harshness"
    },
    {
      dutyId: 12,
      responsibilityTitle: "Refrain from shouting during stressful moments",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Calm",
      viceAvoided: "Harshness"
    },

    // Duty 13: Listen to all sides before making decisions
    {
      dutyId: 13,
      responsibilityTitle: "Listen to all sides before making decisions",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 22,
      emotionalTone: "Fairness",
      viceAvoided: "Bias"
    },
    {
      dutyId: 13,
      responsibilityTitle: "Avoid favoritism in family or team settings",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Integrity",
      viceAvoided: "Bias"
    },
    {
      dutyId: 13,
      responsibilityTitle: "Encourage open discussion without judgment",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Respect",
      viceAvoided: "Bias"
    },
    {
      dutyId: 13,
      responsibilityTitle: "Teach children to treat peers equally",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Equity",
      viceAvoided: "Bias"
    },
    {
      dutyId: 13,
      responsibilityTitle: "Refrain from gossip that distorts perception",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Clarity",
      viceAvoided: "Bias"
    },

    // Duty 14: Avoid harming insects or animals during chores
    {
      dutyId: 14,
      responsibilityTitle: "Avoid harming insects or animals during chores",
      role: "Mother",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Care",
      viceAvoided: "Violence"
    },
    {
      dutyId: 14,
      responsibilityTitle: "Refrain from violent language or threats",
      role: "Brother",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Peacefulness",
      viceAvoided: "Violence"
    },
    {
      dutyId: 14,
      responsibilityTitle: "Teach children to respect all forms of life",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Reverence",
      viceAvoided: "Violence"
    },
    {
      dutyId: 14,
      responsibilityTitle: "Choose non-violent conflict resolution methods",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 22,
      emotionalTone: "Wisdom",
      viceAvoided: "Violence"
    },
    {
      dutyId: 14,
      responsibilityTitle: "Avoid violent entertainment or games",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Mindfulness",
      viceAvoided: "Violence"
    },

    // Duty 15: Dress modestly and appropriately for the occasion
    {
      dutyId: 15,
      responsibilityTitle: "Dress modestly and appropriately for the occasion",
      role: "Youth",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Respect",
      viceAvoided: "Indecency"
    },
    {
      dutyId: 15,
      responsibilityTitle: "Avoid vulgar or offensive language",
      role: "Brother",
      frequency: "Daily",
      karmaPoints: 18,
      emotionalTone: "Cleanliness",
      viceAvoided: "Indecency"
    },
    {
      dutyId: 15,
      responsibilityTitle: "Behave respectfully in public and private spaces",
      role: "Sister",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Dignity",
      viceAvoided: "Indecency"
    },
    {
      dutyId: 15,
      responsibilityTitle: "Refrain from disruptive behavior in gatherings",
      role: "Youth",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Awareness",
      viceAvoided: "Indecency"
    },
    {
      dutyId: 15,
      responsibilityTitle: "Seek guidance from elders on proper conduct",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Humility",
      viceAvoided: "Indecency"
    },

    // Duty 16: Express gratitude for what one has
    {
      dutyId: 16,
      responsibilityTitle: "Express gratitude for what one has",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Peacefulness",
      viceAvoided: "Greed"
    },
    {
      dutyId: 16,
      responsibilityTitle: "Avoid comparing possessions or status with others",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Humility",
      viceAvoided: "Greed"
    },
    {
      dutyId: 16,
      responsibilityTitle: "Teach younger members to find joy in simplicity",
      role: "Grand Mother",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Wisdom",
      viceAvoided: "Greed"
    },
    {
      dutyId: 16,
      responsibilityTitle: "Refrain from complaining about what is lacking",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Acceptance",
      viceAvoided: "Greed"
    },
    {
      dutyId: 16,
      responsibilityTitle: "Celebrate small blessings with family",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Joyfulness",
      viceAvoided: "Greed"
    },

    // Duty 17: Refrain from spreading rumors or hearsay
    {
      dutyId: 17,
      responsibilityTitle: "Refrain from spreading rumors or hearsay",
      role: "Sister",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Integrity",
      viceAvoided: "Slander"
    },
    {
      dutyId: 17,
      responsibilityTitle: "Avoid discussing others' faults behind their back",
      role: "Brother",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Respect",
      viceAvoided: "Slander"
    },
    {
      dutyId: 17,
      responsibilityTitle: "Redirect gossip with a positive comment",
      role: "Youth",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Mindfulness",
      viceAvoided: "Slander"
    },
    {
      dutyId: 17,
      responsibilityTitle: "Teach children to speak only what uplifts others",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Slander"
    },
    {
      dutyId: 17,
      responsibilityTitle: "Avoid social media posts that mock or shame",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Responsibility",
      viceAvoided: "Slander"
    },

    // Duty 18: Maintain respectful eye contact in conversation
    {
      dutyId: 18,
      responsibilityTitle: "Maintain respectful eye contact in conversation",
      role: "Brother",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Decency",
      viceAvoided: "Lust"
    },
    {
      dutyId: 18,
      responsibilityTitle: "Avoid staring or objectifying others",
      role: "Youth",
      frequency: "Daily",
      karmaPoints: 18,
      emotionalTone: "Awareness",
      viceAvoided: "Lust"
    },
    {
      dutyId: 18,
      responsibilityTitle: "Refrain from consuming media that promotes lust",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Discipline",
      viceAvoided: "Lust"
    },
    {
      dutyId: 18,
      responsibilityTitle: "Teach boys to respect women's space and dignity",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Guidance",
      viceAvoided: "Lust"
    },
    {
      dutyId: 18,
      responsibilityTitle: "Dress and behave with modesty and self-respect",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Integrity",
      viceAvoided: "Lust"
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
      } as any
    });
  }
}
import { PrismaClient } from "@prisma/client";

export async function seedResponsibilitiesDuties51to59(prisma: PrismaClient, duties: { id: number }[]) {
  console.log("Seeding responsibilities for duties 51-59...");

  const responsibilitiesData = [
    // Duty 51: Begin the day with sacred chants or mantras
    {
      dutyId: 51,
      responsibilityTitle: "Begin the day with sacred chants or mantras",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 22,
      emotionalTone: "Reverence",
      viceAvoided: "Distraction"
    },
    {
      dutyId: 51,
      responsibilityTitle: "Avoid multitasking during prayer or music",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Presence",
      viceAvoided: "Distraction"
    },
    {
      dutyId: 51,
      responsibilityTitle: "Teach children to listen deeply to sacred sounds",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Distraction"
    },
    {
      dutyId: 51,
      responsibilityTitle: "Refrain from interrupting devotional music",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Respect",
      viceAvoided: "Distraction"
    },
    {
      dutyId: 51,
      responsibilityTitle: "Keep sound spaces clean and undisturbed",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Stewardship",
      viceAvoided: "Distraction"
    },

    // Duty 52: Align prayer room to traditional directions
    {
      dutyId: 52,
      responsibilityTitle: "Align prayer room to traditional directions",
      role: "Admin",
      frequency: "Monthly",
      karmaPoints: 22,
      emotionalTone: "Harmony",
      viceAvoided: "Disorder"
    },
    {
      dutyId: 52,
      responsibilityTitle: "Avoid clutter in sacred corners",
      role: "Mother",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Simplicity",
      viceAvoided: "Disorder"
    },
    {
      dutyId: 52,
      responsibilityTitle: "Teach children the meaning of sacred directions",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Wisdom",
      viceAvoided: "Disorder"
    },
    {
      dutyId: 52,
      responsibilityTitle: "Refrain from placing impure items near sacred spaces",
      role: "Grand Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Respect",
      viceAvoided: "Disorder"
    },
    {
      dutyId: 52,
      responsibilityTitle: "Use natural materials to mark sacred boundaries",
      role: "Grand Mother",
      frequency: "Monthly",
      karmaPoints: 18,
      emotionalTone: "Care",
      viceAvoided: "Disorder"
    },

    // Duty 53: Light sacred fire during festivals or rituals
    {
      dutyId: 53,
      responsibilityTitle: "Light sacred fire during festivals or rituals",
      role: "Grand Father",
      frequency: "Seasonal",
      karmaPoints: 22,
      emotionalTone: "Devotion",
      viceAvoided: "Neglect"
    },
    {
      dutyId: 53,
      responsibilityTitle: "Avoid using synthetic materials in offerings",
      role: "Admin",
      frequency: "Seasonal",
      karmaPoints: 20,
      emotionalTone: "Purity",
      viceAvoided: "Neglect"
    },
    {
      dutyId: 53,
      responsibilityTitle: "Teach children the meaning of fire rituals",
      role: "Father",
      frequency: "Seasonal",
      karmaPoints: 20,
      emotionalTone: "Reverence",
      viceAvoided: "Neglect"
    },
    {
      dutyId: 53,
      responsibilityTitle: "Refrain from casual use of sacred fire tools",
      role: "Sister",
      frequency: "Seasonal",
      karmaPoints: 18,
      emotionalTone: "Awareness",
      viceAvoided: "Neglect"
    },
    {
      dutyId: 53,
      responsibilityTitle: "Keep fire altar clean and protected",
      role: "Mother",
      frequency: "Seasonal",
      karmaPoints: 20,
      emotionalTone: "Stewardship",
      viceAvoided: "Neglect"
    },

    // Duty 54: Avoid wasting water during daily routines
    {
      dutyId: 54,
      responsibilityTitle: "Avoid wasting water during daily routines",
      role: "Admin",
      frequency: "Monthly",
      karmaPoints: 22,
      emotionalTone: "Responsibility",
      viceAvoided: "Pollution"
    },
    {
      dutyId: 54,
      responsibilityTitle: "Refrain from pouring chemicals into drains",
      role: "Mother",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Awareness",
      viceAvoided: "Pollution"
    },
    {
      dutyId: 54,
      responsibilityTitle: "Teach children the sacredness of rivers and wells",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Reverence",
      viceAvoided: "Pollution"
    },
    {
      dutyId: 54,
      responsibilityTitle: "Participate in local water cleanup efforts",
      role: "Grand Father",
      frequency: "Seasonal",
      karmaPoints: 20,
      emotionalTone: "Service",
      viceAvoided: "Pollution"
    },
    {
      dutyId: 54,
      responsibilityTitle: "Use water mindfully during rituals",
      role: "Grand Mother",
      frequency: "Monthly",
      karmaPoints: 18,
      emotionalTone: "Devotion",
      viceAvoided: "Pollution"
    },

    // Duty 55: Practice daily breathing exercises or pranayama
    {
      dutyId: 55,
      responsibilityTitle: "Practice daily breathing exercises or pranayama",
      role: "Grand Father",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Stillness",
      viceAvoided: "Carelessness"
    },
    {
      dutyId: 55,
      responsibilityTitle: "Avoid shallow or rushed breathing during stress",
      role: "Admin",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Awareness",
      viceAvoided: "Carelessness"
    },
    {
      dutyId: 55,
      responsibilityTitle: "Teach children to breathe deeply before speaking",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Carelessness"
    },
    {
      dutyId: 55,
      responsibilityTitle: "Refrain from polluting air through burning waste",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Responsibility",
      viceAvoided: "Carelessness"
    },
    {
      dutyId: 55,
      responsibilityTitle: "Use breath as a tool for emotional regulation",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Wisdom",
      viceAvoided: "Carelessness"
    },

    // Duty 56: Sleep and wake at consistent sacred hours
    {
      dutyId: 56,
      responsibilityTitle: "Sleep and wake at consistent sacred hours",
      role: "Admin",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Rhythm",
      viceAvoided: "Excess"
    },
    {
      dutyId: 56,
      responsibilityTitle: "Avoid screens or stimulation before sleep",
      role: "Youth",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Awareness",
      viceAvoided: "Excess"
    },
    {
      dutyId: 56,
      responsibilityTitle: "Teach children to reflect before sleeping",
      role: "Mother",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Excess"
    },
    {
      dutyId: 56,
      responsibilityTitle: "Refrain from oversleeping or lethargy",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Discipline",
      viceAvoided: "Excess"
    },
    {
      dutyId: 56,
      responsibilityTitle: "Record meaningful dreams in a family journal",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Memory",
      viceAvoided: "Excess"
    },

    // Duty 57: Ask permission before physical contact
    {
      dutyId: 57,
      responsibilityTitle: "Ask permission before physical contact",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 22,
      emotionalTone: "Respect",
      viceAvoided: "Violation"
    },
    {
      dutyId: 57,
      responsibilityTitle: "Avoid rough or careless handling of others",
      role: "Brother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Gentleness",
      viceAvoided: "Violation"
    },
    {
      dutyId: 57,
      responsibilityTitle: "Teach children about safe and sacred touch",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Guidance",
      viceAvoided: "Violation"
    },
    {
      dutyId: 57,
      responsibilityTitle: "Refrain from touching sacred items without reverence",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Awareness",
      viceAvoided: "Violation"
    },
    {
      dutyId: 57,
      responsibilityTitle: "Offer healing touch through massage or care",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Compassion",
      viceAvoided: "Violation"
    },

    // Duty 58: Begin movement with prayer or intention
    {
      dutyId: 58,
      responsibilityTitle: "Begin movement with prayer or intention",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 22,
      emotionalTone: "Awareness",
      viceAvoided: "Aimlessness"
    },
    {
      dutyId: 58,
      responsibilityTitle: "Avoid wandering during sacred rituals",
      role: "Youth",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Discipline",
      viceAvoided: "Aimlessness"
    },
    {
      dutyId: 58,
      responsibilityTitle: "Teach children the meaning of clockwise movement",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Tradition",
      viceAvoided: "Aimlessness"
    },
    {
      dutyId: 58,
      responsibilityTitle: "Refrain from rushing or chaotic movement",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Calm",
      viceAvoided: "Aimlessness"
    },
    {
      dutyId: 58,
      responsibilityTitle: "Use movement as a form of devotion (e.g., pradakshina)",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Reverence",
      viceAvoided: "Aimlessness"
    },

    // Duty 59: Perform ancestral rites with reverence
    {
      dutyId: 59,
      responsibilityTitle: "Perform ancestral rites with reverence",
      role: "Grand Father",
      frequency: "Seasonal",
      karmaPoints: 22,
      emotionalTone: "Devotion",
      viceAvoided: "Forgetfulness"
    },
    {
      dutyId: 59,
      responsibilityTitle: "Avoid speaking ill of the departed",
      role: "Sister",
      frequency: "Seasonal",
      karmaPoints: 20,
      emotionalTone: "Respect",
      viceAvoided: "Forgetfulness"
    },
    {
      dutyId: 59,
      responsibilityTitle: "Teach children the meaning of shraddha and release",
      role: "Father",
      frequency: "Seasonal",
      karmaPoints: 20,
      emotionalTone: "Wisdom",
      viceAvoided: "Forgetfulness"
    },
    {
      dutyId: 59,
      responsibilityTitle: "Refrain from ignoring death anniversaries",
      role: "Admin",
      frequency: "Seasonal",
      karmaPoints: 20,
      emotionalTone: "Memory",
      viceAvoided: "Forgetfulness"
    },
    {
      dutyId: 59,
      responsibilityTitle: "Use rituals to release grief and honor legacy",
      role: "Grand Mother",
      frequency: "Seasonal",
      karmaPoints: 18,
      emotionalTone: "Healing",
      viceAvoided: "Forgetfulness"
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
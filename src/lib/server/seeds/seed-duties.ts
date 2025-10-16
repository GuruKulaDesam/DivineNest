import { PrismaClient } from "@prisma/client";

export async function seedDuties(prisma: PrismaClient) {
  console.log("Seeding duties...");

  // Duty type codes from DutyType model
  const dutyTypeCodes = {
    karmic: "karmic_duty",
    dharmic: "dharmic_duty",
    self: "self_duty",
    heavenly: "heavenly_duty",
    divinely: "divinely_duty",
    earthly: "earthly_duty",
    clan: "clan_duty"
  };

  // Helper function to check if duty already exists
  const dutyExists = async (title: string, role: string, dutyTypeCode: string) => {
    const existing = await prisma.duty.findFirst({
      where: {
        title: title,
        role: role,
        dutyCode: dutyTypeCode
      }
    });
    return existing !== null;
  };

  // Seed Duties - Comprehensive Tamil Vedic System
  const duties = [];

  // ===== KARMIC DUTY - Survival Duties (Karma-focused) =====
  duties.push(await (prisma.duty.create as any)({
    data: {
      dutyType: { connect: { code: dutyTypeCodes.karmic } },
      dutyTypeLookup: { connect: { id: 1 } },
      title: "Rise before sunrise and begin the day with clarity",
      role: "Father",
      frequency: "Daily",
      karmaPoints: 38,
      description: "Begin the day with mental clarity and purpose, setting the foundation for righteous action"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyType: { connect: { code: dutyTypeCodes.karmic } },
      title: "Maintain household hygiene and food preparation",
      role: "Mother",
      frequency: "Daily",
      karmaPoints: 30,
      description: "Ensure the home environment supports physical and spiritual well-being"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyType: { connect: { code: dutyTypeCodes.karmic } },
      title: "Earn through honest labor and fulfill obligations",
      role: "Father",
      frequency: "Daily",
      karmaPoints: 39,
      description: "Provide for family needs through righteous means and honorable work"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.karmic,
      title: "Consume food mindfully and without waste",
      role: "All",
      frequency: "Daily",
      description: "Honor the gift of food by eating with gratitude and avoiding waste"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.karmic,
      title: "Protect family and property from harm",
      role: "Father",
      frequency: "Daily",
      description: "Safeguard the family's physical and spiritual security"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.karmic,
      title: "Repay debts and honor financial commitments",
      role: "Father",
      frequency: "Monthly",
      description: "Maintain financial integrity and fulfill monetary obligations"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.karmic,
      title: "Perform sandhyavandanam or equivalent daily prayer",
      role: "Grand Father",
      frequency: "Daily",
      description: "Connect with divine through structured daily prayer rituals"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.karmic,
      title: "Avoid intoxicants and harmful habits",
      role: "All",
      frequency: "Daily",
      description: "Maintain physical and mental purity through disciplined living"
    }
  }));

  // ===== DHARMIC DUTY - Service to Others (Righteous) =====
  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.dharmic,
      title: "Care for the sick, elderly, and vulnerable",
      role: "Grand Mother",
      frequency: "Daily",
      description: "Extend compassion and care to those who cannot care for themselves"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.dharmic,
      title: "Offer food and water to guests and strangers",
      role: "Mother",
      frequency: "Daily",
      description: "Practice hospitality and generosity towards all who come to the home"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.dharmic,
      title: "Resolve disputes with fairness and compassion",
      role: "Father",
      frequency: "As needed",
      description: "Mediate conflicts with wisdom, justice, and concern for all parties"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.dharmic,
      title: "Give alms and support the poor",
      role: "Grand Father",
      frequency: "Weekly",
      description: "Share resources with those in need, fostering community welfare"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.dharmic,
      title: "Teach and uplift others without expectation",
      role: "Father",
      frequency: "Weekly",
      description: "Share knowledge and wisdom to help others grow spiritually and materially"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.dharmic,
      title: "Protect animals and avoid cruelty",
      role: "Brother",
      frequency: "Daily",
      description: "Show compassion towards all living beings and prevent harm"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.dharmic,
      title: "Volunteer in temple or community service",
      role: "Sister",
      frequency: "Monthly",
      description: "Contribute time and energy to community welfare and spiritual activities"
    }
  }));

  // ===== SELF DUTY - Soul Development Duties =====
  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.self,
      title: "Meditate and reflect on one's actions",
      role: "Father",
      frequency: "Daily",
      description: "Cultivate inner peace and self-awareness through regular meditation"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.self,
      title: "Read scripture and internalize its meaning",
      role: "Grand Father",
      frequency: "Daily",
      description: "Study sacred texts to deepen spiritual understanding and wisdom"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.self,
      title: "Practice silence and restraint",
      role: "Mother",
      frequency: "Weekly",
      description: "Develop self-control and inner strength through mindful silence"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.self,
      title: "Fast and observe spiritual discipline",
      role: "Father",
      frequency: "Monthly",
      description: "Purify body and mind through fasting and spiritual practices"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.self,
      title: "Cultivate gratitude and humility",
      role: "Sister",
      frequency: "Weekly",
      description: "Foster thankfulness and modesty in daily life and interactions"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.self,
      title: "Forgive self and others",
      role: "Grand Mother",
      frequency: "Weekly",
      description: "Release resentment and cultivate compassion through forgiveness"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.self,
      title: "Avoid negative speech and comparison",
      role: "Brother",
      frequency: "Daily",
      description: "Practice positive communication and avoid harmful comparisons"
    }
  }));

  // ===== HEAVENLY DUTY - Devas Duties (Spiritual) =====
  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.heavenly,
      title: "Light lamps and offer prayers to household deities",
      role: "Mother",
      frequency: "Daily",
      karmaPoints: 75,
      description: "Maintain sacred space and honor divine presence in the home"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.heavenly,
      title: "Recite mantras and perform puja rituals",
      role: "Father",
      frequency: "Daily",
      karmaPoints: 78,
      description: "Connect with divine through sacred chants and worship ceremonies"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.heavenly,
      title: "Maintain altar and sacred space",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 65,
      description: "Keep sacred areas clean and properly arranged for worship"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.heavenly,
      title: "Observe sacred fasts and festivals",
      role: "All",
      frequency: "Seasonal",
      karmaPoints: 72,
      description: "Participate in traditional festivals and fasting practices"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.heavenly,
      title: "Sponsor temple offerings and participate in bhajans",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 70,
      description: "Support temple activities and join devotional music gatherings"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.heavenly,
      title: "Teach children about deities and their stories",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 68,
      description: "Pass down knowledge of divine beings and their teachings to children"
    }
  }));

  // ===== DIVINELY DUTY - Rishi Duties (Divine Connection) =====
  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.divinely,
      title: "Meditate during Brahma muhurta",
      role: "Father",
      frequency: "Daily",
      karmaPoints: 110,
      description: "Practice meditation during the auspicious pre-dawn hours"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.divinely,
      title: "Recite Vedas or Upanishads aloud",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 112,
      description: "Chant sacred Vedic texts to preserve ancient wisdom"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.divinely,
      title: "Observe silence on sacred days",
      role: "All",
      frequency: "Monthly",
      karmaPoints: 105,
      description: "Practice sacred silence on holy days for spiritual reflection"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.divinely,
      title: "Offer ghee to sacred fire",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 108,
      description: "Perform fire rituals with clarified butter as offerings"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.divinely,
      title: "Teach divine verses and stories to children",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 106,
      description: "Share sacred stories and verses with younger generations"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.divinely,
      title: "Visit sacred groves or hill temples",
      role: "Family",
      frequency: "Seasonal",
      karmaPoints: 107,
      description: "Make pilgrimages to natural sacred sites and temples"
    }
  }));

  // ===== EARTHLY DUTY - Pancha Bhootham (Nature & Environment) =====
  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.earthly,
      title: "Water sacred plants and feed animals",
      role: "Mother",
      frequency: "Daily",
      karmaPoints: 8,
      description: "Care for plants and animals as part of honoring the five elements"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.earthly,
      title: "Compost waste and maintain garden",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 12,
      description: "Practice sustainable waste management and garden care"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.earthly,
      title: "Avoid pollution and protect natural resources",
      role: "All",
      frequency: "Daily",
      karmaPoints: 5,
      description: "Live in harmony with nature and prevent environmental harm"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.earthly,
      title: "Participate in tree planting and eco rituals",
      role: "Father",
      frequency: "Seasonal",
      karmaPoints: 15,
      description: "Engage in environmental restoration and nature worship"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.earthly,
      title: "Teach children reverence for the five elements",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 10,
      description: "Educate children about the sacred nature of earth, water, fire, air, and space"
    }
  }));

  // ===== CLAN DUTY - Family Heritage Duties =====
  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.clan,
      title: "Recite family lineage and preserve ancestral memory",
      role: "Grand Father",
      frequency: "Monthly",
      karmaPoints: 65,
      description: "Maintain knowledge of family history and ancestral connections"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.clan,
      title: "Perform shraddha and tarpanam rituals",
      role: "Father",
      frequency: "Yearly",
      karmaPoints: 79,
      description: "Honor ancestors through traditional memorial rituals"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.clan,
      title: "Light ancestral lamp and offer food to crows",
      role: "Grand Mother",
      frequency: "Monthly",
      karmaPoints: 55,
      description: "Feed crows as a symbolic offering to ancestral spirits"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.clan,
      title: "Teach family songs, stories, and values",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 60,
      description: "Pass down cultural heritage and family traditions to children"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.clan,
      title: "Maintain family tree, recipes, and heirlooms",
      role: "Mother",
      frequency: "Monthly",
      karmaPoints: 58,
      description: "Preserve family artifacts, genealogical records, and traditional recipes"
    }
  }));

  duties.push(await prisma.duty.create({
    data: {
      dutyCode: dutyTypeCodes.clan,
      title: "Conduct rites of passage and record family events",
      role: "Father",
      frequency: "As needed",
      karmaPoints: 62,
      description: "Perform and document important life ceremonies and family milestones"
    }
  }));

  // ===== ADD NEW DUTIES FROM USER SPECIFICATION =====

  // ===== ADDITIONAL KARMIC DUTY - Survival Duties =====
  if (!(await dutyExists("Wake before sunrise and bathe before work", "Father", dutyTypeCodes.karmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.karmic,
        title: "Wake before sunrise and bathe before work",
        role: "Father",
        frequency: "Daily",
        karmaPoints: 38,
        description: "Begin the day with spiritual discipline and physical cleanliness"
      }
    }));
  }

  if (!(await dutyExists("Earn livelihood through honest means", "Father", dutyTypeCodes.karmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.karmic,
        title: "Earn livelihood through honest means",
        role: "Father",
        frequency: "Daily",
        karmaPoints: 39,
        description: "Provide for family through righteous and ethical work"
      }
    }));
  }

  if (!(await dutyExists("Maintain physical cleanliness and hygiene", "Mother", dutyTypeCodes.karmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.karmic,
        title: "Maintain physical cleanliness and hygiene",
        role: "Mother",
        frequency: "Daily",
        karmaPoints: 30,
        description: "Keep oneself and the home environment pure and clean"
      }
    }));
  }

  if (!(await dutyExists("Cook daily meals with care and gratitude", "Mother", dutyTypeCodes.karmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.karmic,
        title: "Cook daily meals with care and gratitude",
        role: "Mother",
        frequency: "Daily",
        karmaPoints: 35,
        description: "Prepare nourishing food with love and thankfulness"
      }
    }));
  }

  if (!(await dutyExists("Feed the hungry before eating", "Grand Mother", dutyTypeCodes.karmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.karmic,
        title: "Feed the hungry before eating",
        role: "Grand Mother",
        frequency: "Daily",
        karmaPoints: 75,
        description: "Ensure others are fed before partaking in meals"
      }
    }));
  }

  // ===== ADDITIONAL DHARMIC DUTY =====
  if (!(await dutyExists("Avoid causing harm in thought or action", "All", dutyTypeCodes.dharmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.dharmic,
        title: "Avoid causing harm in thought or action",
        role: "All",
        frequency: "Daily",
        karmaPoints: 108,
        description: "Practice ahimsa - non-violence in all aspects of life"
      }
    }));
  }

  if (!(await dutyExists("Practice restraint in speech and behavior", "All", dutyTypeCodes.dharmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.dharmic,
        title: "Practice restraint in speech and behavior",
        role: "All",
        frequency: "Daily",
        karmaPoints: 85,
        description: "Exercise self-control and mindful communication"
      }
    }));
  }

  if (!(await dutyExists("Avoid unnecessary purchases or indulgences", "All", dutyTypeCodes.dharmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.dharmic,
        title: "Avoid unnecessary purchases or indulgences",
        role: "All",
        frequency: "Weekly",
        karmaPoints: 22,
        description: "Practice simplicity and avoid greed-driven consumption"
      }
    }));
  }

  if (!(await dutyExists("Avoid emotional dependence on possessions", "All", dutyTypeCodes.self))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.self,
        title: "Avoid emotional dependence on possessions",
        role: "All",
        frequency: "Daily",
        karmaPoints: 22,
        description: "Cultivate inner contentment free from material attachment"
      }
    }));
  }

  if (!(await dutyExists("Listen fully before responding in tense situations", "All", dutyTypeCodes.dharmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.dharmic,
        title: "Listen fully before responding in tense situations",
        role: "All",
        frequency: "Daily",
        karmaPoints: 22,
        description: "Practice mindful listening and avoid reactive responses"
      }
    }));
  }

  if (!(await dutyExists("Offer comfort to those in pain or distress", "All", dutyTypeCodes.dharmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.dharmic,
        title: "Offer comfort to those in pain or distress",
        role: "All",
        frequency: "Daily",
        karmaPoints: 22,
        description: "Show compassion and provide support to those suffering"
      }
    }));
  }

  if (!(await dutyExists("Set aside a portion of income for giving", "Father", dutyTypeCodes.dharmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.dharmic,
        title: "Set aside a portion of income for giving",
        role: "Father",
        frequency: "Monthly",
        karmaPoints: 22,
        description: "Practice generosity by sharing wealth with those in need"
      }
    }));
  }

  if (!(await dutyExists("Thank elders and mentors regularly", "All", dutyTypeCodes.dharmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.dharmic,
        title: "Thank elders and mentors regularly",
        role: "All",
        frequency: "Weekly",
        karmaPoints: 20,
        description: "Express gratitude to those who guide and support us"
      }
    }));
  }

  if (!(await dutyExists("Avoid interrupting elders or speaking out of turn", "All", dutyTypeCodes.dharmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.dharmic,
        title: "Avoid interrupting elders or speaking out of turn",
        role: "All",
        frequency: "Weekly",
        karmaPoints: 20,
        description: "Practice respect and patience in communication"
      }
    }));
  }

  if (!(await dutyExists("Keep water and snacks ready for unexpected guests", "Mother", dutyTypeCodes.dharmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.dharmic,
        title: "Keep water and snacks ready for unexpected guests",
        role: "Mother",
        frequency: "Daily",
        karmaPoints: 20,
        description: "Maintain readiness for hospitality and welcoming visitors"
      }
    }));
  }

  if (!(await dutyExists("Use kind words even when correcting others", "All", dutyTypeCodes.dharmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.dharmic,
        title: "Use kind words even when correcting others",
        role: "All",
        frequency: "Daily",
        karmaPoints: 20,
        description: "Practice gentle correction and compassionate communication"
      }
    }));
  }

  if (!(await dutyExists("Avoid harming insects or animals during chores", "All", dutyTypeCodes.dharmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.dharmic,
        title: "Avoid harming insects or animals during chores",
        role: "All",
        frequency: "Daily",
        karmaPoints: 20,
        description: "Show respect for all living beings in daily activities"
      }
    }));
  }

  if (!(await dutyExists("Dress modestly and appropriately for the occasion", "All", dutyTypeCodes.dharmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.dharmic,
        title: "Dress modestly and appropriately for the occasion",
        role: "All",
        frequency: "Daily",
        karmaPoints: 20,
        description: "Maintain dignity and respect through appropriate attire"
      }
    }));
  }

  if (!(await dutyExists("Express gratitude for what one has", "All", dutyTypeCodes.dharmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.dharmic,
        title: "Express gratitude for what one has",
        role: "All",
        frequency: "Weekly",
        karmaPoints: 20,
        description: "Cultivate contentment and appreciation for life's blessings"
      }
    }));
  }

  if (!(await dutyExists("Refrain from spreading rumors or hearsay", "All", dutyTypeCodes.dharmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.dharmic,
        title: "Refrain from spreading rumors or hearsay",
        role: "All",
        frequency: "Daily",
        karmaPoints: 20,
        description: "Practice truthfulness and avoid harmful gossip"
      }
    }));
  }

  if (!(await dutyExists("Maintain respectful eye contact in conversation", "All", dutyTypeCodes.dharmic))) {
    duties.push(await prisma.duty.create({
      data: {
        dutyCode: dutyTypeCodes.dharmic,
        title: "Maintain respectful eye contact in conversation",
        role: "All",
        frequency: "Daily",
        karmaPoints: 20,
        description: "Show respect and engagement through appropriate eye contact"
      }
    }));
  }

  return duties;
}
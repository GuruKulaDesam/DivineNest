import { PrismaClient } from "@prisma/client";

export async function seedResponsibilitiesDuties19to50(prisma: PrismaClient, duties: { id: number }[]) {
  console.log("Seeding responsibilities for duties 19-50...");

  const responsibilitiesData = [
    // Duty 19: Recite morning verses or prayers aloud
    {
      dutyId: 19,
      responsibilityTitle: "Recite morning verses or prayers aloud",
      role: "Grand Father",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Reverence",
      viceAvoided: "Atheism"
    },
    {
      dutyId: 19,
      responsibilityTitle: "Light lamp or incense as part of morning routine",
      role: "Mother",
      frequency: "Daily",
      karmaPoints: 18,
      emotionalTone: "Devotion",
      viceAvoided: "Atheism"
    },
    {
      dutyId: 19,
      responsibilityTitle: "Teach children to chant or reflect on divine names",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Atheism"
    },
    {
      dutyId: 19,
      responsibilityTitle: "Avoid starting the day with complaints or negativity",
      role: "Sister",
      frequency: "Daily",
      karmaPoints: 18,
      emotionalTone: "Positivity",
      viceAvoided: "Atheism"
    },
    {
      dutyId: 19,
      responsibilityTitle: "Keep a sacred corner clean and active in the home",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Stewardship",
      viceAvoided: "Atheism"
    },

    // Duty 20: Support local efforts that benefit the community
    {
      dutyId: 20,
      responsibilityTitle: "Support local efforts that benefit the community",
      role: "Admin",
      frequency: "Monthly",
      karmaPoints: 22,
      emotionalTone: "Generosity",
      viceAvoided: "Selfishness"
    },
    {
      dutyId: 20,
      responsibilityTitle: "Avoid decisions that harm others for personal gain",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Integrity",
      viceAvoided: "Selfishness"
    },
    {
      dutyId: 20,
      responsibilityTitle: "Teach children to care for others beyond the family",
      role: "Mother",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Compassion",
      viceAvoided: "Selfishness"
    },
    {
      dutyId: 20,
      responsibilityTitle: "Volunteer for causes that protect life and dignity",
      role: "Grand Father",
      frequency: "Quarterly",
      karmaPoints: 22,
      emotionalTone: "Service",
      viceAvoided: "Selfishness"
    },
    {
      dutyId: 20,
      responsibilityTitle: "Refrain from hoarding resources others may need",
      role: "Sister",
      frequency: "Monthly",
      karmaPoints: 18,
      emotionalTone: "Awareness",
      viceAvoided: "Selfishness"
    },

    // Duty 21: Care for plants, trees, and sacred groves
    {
      dutyId: 21,
      responsibilityTitle: "Water and tend to household plants regularly",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Stewardship",
      viceAvoided: "Neglect of nature"
    },
    {
      dutyId: 21,
      responsibilityTitle: "Involve children in planting and caring for trees",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Neglect of nature"
    },
    {
      dutyId: 21,
      responsibilityTitle: "Avoid cutting trees or branches unnecessarily",
      role: "Admin",
      frequency: "As needed",
      karmaPoints: 22,
      emotionalTone: "Responsibility",
      viceAvoided: "Neglect of nature"
    },
    {
      dutyId: 21,
      responsibilityTitle: "Visit and maintain local sacred groves or gardens",
      role: "Grand Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Reverence",
      viceAvoided: "Neglect of nature"
    },
    {
      dutyId: 21,
      responsibilityTitle: "Celebrate tree-planting days as family rituals",
      role: "Grand Mother",
      frequency: "Seasonal",
      karmaPoints: 18,
      emotionalTone: "Joy",
      viceAvoided: "Neglect of nature"
    },

    // Duty 22: Avoid harming natural spaces during festivals
    {
      dutyId: 22,
      responsibilityTitle: "Avoid littering during temple or street festivals",
      role: "Father",
      frequency: "Seasonal",
      karmaPoints: 20,
      emotionalTone: "Awareness",
      viceAvoided: "Exploitation"
    },
    {
      dutyId: 22,
      responsibilityTitle: "Use eco-friendly decorations and materials",
      role: "Mother",
      frequency: "Seasonal",
      karmaPoints: 20,
      emotionalTone: "Simplicity",
      viceAvoided: "Exploitation"
    },
    {
      dutyId: 22,
      responsibilityTitle: "Educate children about respecting nature during rituals",
      role: "Sister",
      frequency: "Seasonal",
      karmaPoints: 18,
      emotionalTone: "Teaching",
      viceAvoided: "Exploitation"
    },
    {
      dutyId: 22,
      responsibilityTitle: "Refrain from using loud fireworks near animals",
      role: "Brother",
      frequency: "Seasonal",
      karmaPoints: 18,
      emotionalTone: "Compassion",
      viceAvoided: "Exploitation"
    },
    {
      dutyId: 22,
      responsibilityTitle: "Help clean up public spaces after celebrations",
      role: "Admin",
      frequency: "Seasonal",
      karmaPoints: 22,
      emotionalTone: "Service",
      viceAvoided: "Exploitation"
    },

    // Duty 23: Keep a pot of drinking water near the entrance
    {
      dutyId: 23,
      responsibilityTitle: "Keep a pot of drinking water near the entrance",
      role: "Grand Mother",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Hospitality",
      viceAvoided: "Withholding help"
    },
    {
      dutyId: 23,
      responsibilityTitle: "Refill water bowls for birds and animals",
      role: "Mother",
      frequency: "Daily",
      karmaPoints: 18,
      emotionalTone: "Compassion",
      viceAvoided: "Withholding help"
    },
    {
      dutyId: 23,
      responsibilityTitle: "Offer water to delivery workers or visitors",
      role: "Father",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Courtesy",
      viceAvoided: "Withholding help"
    },
    {
      dutyId: 23,
      responsibilityTitle: "Teach children to serve water before meals",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Nurturing",
      viceAvoided: "Withholding help"
    },
    {
      dutyId: 23,
      responsibilityTitle: "Avoid ignoring thirsty passersby during hot days",
      role: "Admin",
      frequency: "As needed",
      karmaPoints: 22,
      emotionalTone: "Awareness",
      viceAvoided: "Withholding help"
    },

    // Duty 24: Participate in local tree-planting drives
    {
      dutyId: 24,
      responsibilityTitle: "Participate in local tree-planting drives",
      role: "Admin",
      frequency: "Seasonal",
      karmaPoints: 22,
      emotionalTone: "Service",
      viceAvoided: "Selfishness"
    },
    {
      dutyId: 24,
      responsibilityTitle: "Help organize cleanup or repair of public spaces",
      role: "Father",
      frequency: "Seasonal",
      karmaPoints: 20,
      emotionalTone: "Responsibility",
      viceAvoided: "Selfishness"
    },
    {
      dutyId: 24,
      responsibilityTitle: "Encourage youth to join civic improvement efforts",
      role: "Grand Father",
      frequency: "Seasonal",
      karmaPoints: 20,
      emotionalTone: "Leadership",
      viceAvoided: "Selfishness"
    },
    {
      dutyId: 24,
      responsibilityTitle: "Avoid blocking or damaging shared pathways",
      role: "Mother",
      frequency: "Seasonal",
      karmaPoints: 18,
      emotionalTone: "Respect",
      viceAvoided: "Selfishness"
    },
    {
      dutyId: 24,
      responsibilityTitle: "Offer tools or funds for community upkeep",
      role: "Admin",
      frequency: "Seasonal",
      karmaPoints: 20,
      emotionalTone: "Generosity",
      viceAvoided: "Selfishness"
    },

    // Duty 25: Greet and serve elders with respect
    {
      dutyId: 25,
      responsibilityTitle: "Touch elders' feet or offer respectful greeting",
      role: "Sister",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Reverence",
      viceAvoided: "Disrespect"
    },
    {
      dutyId: 25,
      responsibilityTitle: "Serve food or water to elders before oneself",
      role: "Brother",
      frequency: "Daily",
      karmaPoints: 18,
      emotionalTone: "Humility",
      viceAvoided: "Disrespect"
    },
    {
      dutyId: 25,
      responsibilityTitle: "Avoid interrupting elders during conversation",
      role: "Youth",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Patience",
      viceAvoided: "Disrespect"
    },
    {
      dutyId: 25,
      responsibilityTitle: "Offer seat or shade to elders in public or home",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Courtesy",
      viceAvoided: "Disrespect"
    },
    {
      dutyId: 25,
      responsibilityTitle: "Teach children to honor elders through rituals",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Tradition",
      viceAvoided: "Disrespect"
    },

    // Duty 26: Share stories of elders during family meals
    {
      dutyId: 26,
      responsibilityTitle: "Narrate stories of grandparents during dinner",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Connection",
      viceAvoided: "Forgetfulness"
    },
    {
      dutyId: 26,
      responsibilityTitle: "Record family history in a shared journal",
      role: "Admin",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Memory",
      viceAvoided: "Forgetfulness"
    },
    {
      dutyId: 26,
      responsibilityTitle: "Encourage children to ask questions about ancestors",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Curiosity",
      viceAvoided: "Forgetfulness"
    },
    {
      dutyId: 26,
      responsibilityTitle: "Celebrate elder birthdays with storytelling",
      role: "Mother",
      frequency: "Seasonal",
      karmaPoints: 20,
      emotionalTone: "Joy",
      viceAvoided: "Forgetfulness"
    },
    {
      dutyId: 26,
      responsibilityTitle: "Avoid dismissing old customs—seek their meaning",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Respect",
      viceAvoided: "Forgetfulness"
    },

    // Duty 27: Resolve family conflicts with unity and love
    {
      dutyId: 27,
      responsibilityTitle: "Listen to all sides before judging family disputes",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 22,
      emotionalTone: "Fairness",
      viceAvoided: "Division"
    },
    {
      dutyId: 27,
      responsibilityTitle: "Avoid blaming—focus on shared solutions",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Compassion",
      viceAvoided: "Division"
    },
    {
      dutyId: 27,
      responsibilityTitle: "Use family meetings to resolve tensions",
      role: "Admin",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Structure",
      viceAvoided: "Division"
    },
    {
      dutyId: 27,
      responsibilityTitle: "Teach children to apologize and forgive",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Division"
    },
    {
      dutyId: 27,
      responsibilityTitle: "Refrain from gossip that deepens family rifts",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Integrity",
      viceAvoided: "Division"
    },

    // Duty 28: Celebrate festivals together as a united household
    {
      dutyId: 28,
      responsibilityTitle: "Plan festival rituals that include all generations",
      role: "Family",
      frequency: "Monthly",
      karmaPoints: 22,
      emotionalTone: "Togetherness",
      viceAvoided: "Isolation"
    },
    {
      dutyId: 28,
      responsibilityTitle: "Share meals and stories during celebrations",
      role: "Grand Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Joy",
      viceAvoided: "Isolation"
    },
    {
      dutyId: 28,
      responsibilityTitle: "Avoid isolating any member during festival prep",
      role: "Mother",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Inclusion",
      viceAvoided: "Isolation"
    },
    {
      dutyId: 28,
      responsibilityTitle: "Invite neighbors or friends to join family events",
      role: "Father",
      frequency: "Seasonal",
      karmaPoints: 18,
      emotionalTone: "Generosity",
      viceAvoided: "Isolation"
    },
    {
      dutyId: 28,
      responsibilityTitle: "Decorate together and assign roles for each member",
      role: "Sister",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Participation",
      viceAvoided: "Isolation"
    },

    // Duty 29: Meditate on soul purity and inner silence
    {
      dutyId: 29,
      responsibilityTitle: "Begin each day with silent reflection or prayer",
      role: "Grand Father",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Stillness",
      viceAvoided: "Ego"
    },
    {
      dutyId: 29,
      responsibilityTitle: "Avoid speaking unnecessarily—practice mindful silence",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Awareness",
      viceAvoided: "Ego"
    },
    {
      dutyId: 29,
      responsibilityTitle: "Teach children the value of quiet contemplation",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Wisdom",
      viceAvoided: "Ego"
    },
    {
      dutyId: 29,
      responsibilityTitle: "Refrain from boasting or self-promotion",
      role: "Brother",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Humility",
      viceAvoided: "Ego"
    },
    {
      dutyId: 29,
      responsibilityTitle: "Use journaling to observe and release inner pride",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Reflection",
      viceAvoided: "Ego"
    },

    // Duty 30: Avoid ego-driven decisions in family matters
    {
      dutyId: 30,
      responsibilityTitle: "Consult others before making major family decisions",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 22,
      emotionalTone: "Collaboration",
      viceAvoided: "Pride"
    },
    {
      dutyId: 30,
      responsibilityTitle: "Accept feedback without defensiveness",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Openness",
      viceAvoided: "Pride"
    },
    {
      dutyId: 30,
      responsibilityTitle: "Step back when others are better suited to lead",
      role: "Admin",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Maturity",
      viceAvoided: "Pride"
    },
    {
      dutyId: 30,
      responsibilityTitle: "Apologize when wrong, even if it feels difficult",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 22,
      emotionalTone: "Courage",
      viceAvoided: "Pride"
    },
    {
      dutyId: 30,
      responsibilityTitle: "Avoid insisting on one's way in shared decisions",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Flexibility",
      viceAvoided: "Pride"
    },

    // Duty 31: Show reverence to ascetics and spiritual seekers
    {
      dutyId: 31,
      responsibilityTitle: "Offer food or shelter to visiting ascetics",
      role: "Grand Father",
      frequency: "Monthly",
      karmaPoints: 22,
      emotionalTone: "Reverence",
      viceAvoided: "Disregard for tapas"
    },
    {
      dutyId: 31,
      responsibilityTitle: "Avoid mocking or questioning spiritual practices",
      role: "Admin",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Respect",
      viceAvoided: "Disregard for tapas"
    },
    {
      dutyId: 31,
      responsibilityTitle: "Teach children to bow or greet spiritual elders",
      role: "Grand Mother",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Tradition",
      viceAvoided: "Disregard for tapas"
    },
    {
      dutyId: 31,
      responsibilityTitle: "Refrain from interrupting meditative or prayer spaces",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Awareness",
      viceAvoided: "Disregard for tapas"
    },
    {
      dutyId: 31,
      responsibilityTitle: "Keep sacred spaces clean and undisturbed",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Stewardship",
      viceAvoided: "Disregard for tapas"
    },

    // Duty 32: Avoid alcohol and intoxicants
    {
      dutyId: 32,
      responsibilityTitle: "Say no to peer pressure involving alcohol",
      role: "Brother",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Courage",
      viceAvoided: "Intoxication"
    },
    {
      dutyId: 32,
      responsibilityTitle: "Avoid places or media that glorify substance use",
      role: "Youth",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Awareness",
      viceAvoided: "Intoxication"
    },
    {
      dutyId: 32,
      responsibilityTitle: "Teach children the dangers of intoxication",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Guidance",
      viceAvoided: "Intoxication"
    },
    {
      dutyId: 32,
      responsibilityTitle: "Refrain from offering alcohol at family events",
      role: "Admin",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Responsibility",
      viceAvoided: "Intoxication"
    },
    {
      dutyId: 32,
      responsibilityTitle: "Support friends or family in quitting harmful habits",
      role: "Sister",
      frequency: "As needed",
      karmaPoints: 18,
      emotionalTone: "Compassion",
      viceAvoided: "Intoxication"
    },

    // Duty 33: Avoid betting or games of chance
    {
      dutyId: 33,
      responsibilityTitle: "Avoid betting or games of chance",
      role: "Brother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Discipline",
      viceAvoided: "Recklessness"
    },
    {
      dutyId: 33,
      responsibilityTitle: "Refrain from speculative financial behavior",
      role: "Admin",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Prudence",
      viceAvoided: "Recklessness"
    },
    {
      dutyId: 33,
      responsibilityTitle: "Teach youth the risks of gambling",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Guidance",
      viceAvoided: "Recklessness"
    },
    {
      dutyId: 33,
      responsibilityTitle: "Avoid online games with addictive mechanics",
      role: "Youth",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Awareness",
      viceAvoided: "Recklessness"
    },
    {
      dutyId: 33,
      responsibilityTitle: "Support family members struggling with gambling habits",
      role: "Sister",
      frequency: "As needed",
      karmaPoints: 18,
      emotionalTone: "Compassion",
      viceAvoided: "Recklessness"
    },

    // Duty 34: Avoid taking things without permission
    {
      dutyId: 34,
      responsibilityTitle: "Avoid taking things without permission",
      role: "Youth",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Integrity",
      viceAvoided: "Stealing"
    },
    {
      dutyId: 34,
      responsibilityTitle: "Teach children to respect ownership",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Stealing"
    },
    {
      dutyId: 34,
      responsibilityTitle: "Refrain from copying or pirating digital content",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Responsibility",
      viceAvoided: "Stealing"
    },
    {
      dutyId: 34,
      responsibilityTitle: "Return borrowed items promptly",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Accountability",
      viceAvoided: "Stealing"
    },
    {
      dutyId: 34,
      responsibilityTitle: "Avoid exploiting others' labor or ideas unfairly",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 22,
      emotionalTone: "Justice",
      viceAvoided: "Stealing"
    },

    // Duty 35: Speak truth even when it's difficult
    {
      dutyId: 35,
      responsibilityTitle: "Speak truth even when it's difficult",
      role: "Sister",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Courage",
      viceAvoided: "Lying"
    },
    {
      dutyId: 35,
      responsibilityTitle: "Avoid exaggeration or manipulation",
      role: "Brother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Integrity",
      viceAvoided: "Lying"
    },
    {
      dutyId: 35,
      responsibilityTitle: "Teach children the value of honesty",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Lying"
    },
    {
      dutyId: 35,
      responsibilityTitle: "Refrain from hiding mistakes—own them",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Accountability",
      viceAvoided: "Lying"
    },
    {
      dutyId: 35,
      responsibilityTitle: "Avoid misleading others for personal gain",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Responsibility",
      viceAvoided: "Lying"
    },

    // Duty 36: Avoid speaking over others in conversation
    {
      dutyId: 36,
      responsibilityTitle: "Avoid speaking over others in conversation",
      role: "Sister",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Respect",
      viceAvoided: "Loquacity"
    },
    {
      dutyId: 36,
      responsibilityTitle: "Practice silence during meals or rituals",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Stillness",
      viceAvoided: "Loquacity"
    },
    {
      dutyId: 36,
      responsibilityTitle: "Teach children to listen more than they speak",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Loquacity"
    },
    {
      dutyId: 36,
      responsibilityTitle: "Refrain from gossip or idle talk",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Awareness",
      viceAvoided: "Loquacity"
    },
    {
      dutyId: 36,
      responsibilityTitle: "Use brief and clear words when giving instructions",
      role: "Father",
      frequency: "Daily",
      karmaPoints: 18,
      emotionalTone: "Clarity",
      viceAvoided: "Loquacity"
    },

    // Duty 37: Serve balanced meals with portion control
    {
      dutyId: 37,
      responsibilityTitle: "Serve balanced meals with portion control",
      role: "Mother",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Care",
      viceAvoided: "Gluttony"
    },
    {
      dutyId: 37,
      responsibilityTitle: "Avoid overeating during festivals or gatherings",
      role: "Father",
      frequency: "Seasonal",
      karmaPoints: 20,
      emotionalTone: "Discipline",
      viceAvoided: "Gluttony"
    },
    {
      dutyId: 37,
      responsibilityTitle: "Teach children to stop eating when full",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Gluttony"
    },
    {
      dutyId: 37,
      responsibilityTitle: "Refrain from wasteful food habits",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Responsibility",
      viceAvoided: "Gluttony"
    },
    {
      dutyId: 37,
      responsibilityTitle: "Practice fasting or light meals on sacred days",
      role: "Grand Father",
      frequency: "Monthly",
      karmaPoints: 18,
      emotionalTone: "Reverence",
      viceAvoided: "Gluttony"
    },

    // Duty 38: Avoid asking for things out of envy or impulse
    {
      dutyId: 38,
      responsibilityTitle: "Avoid asking for things out of envy or impulse",
      role: "Youth",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Awareness",
      viceAvoided: "Excessive craving"
    },
    {
      dutyId: 38,
      responsibilityTitle: "Practice gratitude for what one already has",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Contentment",
      viceAvoided: "Excessive craving"
    },
    {
      dutyId: 38,
      responsibilityTitle: "Refrain from chasing trends or status symbols",
      role: "Brother",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Integrity",
      viceAvoided: "Excessive craving"
    },
    {
      dutyId: 38,
      responsibilityTitle: "Teach children to value simplicity over novelty",
      role: "Mother",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Wisdom",
      viceAvoided: "Excessive craving"
    },
    {
      dutyId: 38,
      responsibilityTitle: "Use journaling to reflect on wants vs. needs",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Clarity",
      viceAvoided: "Excessive craving"
    },

    // Duty 39: Pause before reacting in heated moments
    {
      dutyId: 39,
      responsibilityTitle: "Pause before reacting in heated moments",
      role: "Father",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Self-control",
      viceAvoided: "Rage"
    },
    {
      dutyId: 39,
      responsibilityTitle: "Avoid shouting or harsh punishment",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Compassion",
      viceAvoided: "Rage"
    },
    {
      dutyId: 39,
      responsibilityTitle: "Teach children to express anger safely",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Guidance",
      viceAvoided: "Rage"
    },
    {
      dutyId: 39,
      responsibilityTitle: "Use breathing or prayer to calm oneself",
      role: "Grand Father",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Stillness",
      viceAvoided: "Rage"
    },
    {
      dutyId: 39,
      responsibilityTitle: "Refrain from escalating arguments",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Maturity",
      viceAvoided: "Rage"
    },

    // Duty 40: Donate unused items to those in need
    {
      dutyId: 40,
      responsibilityTitle: "Donate unused items to those in need",
      role: "Grand Father",
      frequency: "Monthly",
      karmaPoints: 22,
      emotionalTone: "Generosity",
      viceAvoided: "Materialism"
    },
    {
      dutyId: 40,
      responsibilityTitle: "Avoid buying things without clear purpose",
      role: "Admin",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Mindfulness",
      viceAvoided: "Materialism"
    },
    {
      dutyId: 40,
      responsibilityTitle: "Teach children to value use over ownership",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Wisdom",
      viceAvoided: "Materialism"
    },
    {
      dutyId: 40,
      responsibilityTitle: "Refrain from hoarding or excessive storage",
      role: "Mother",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Simplicity",
      viceAvoided: "Materialism"
    },
    {
      dutyId: 40,
      responsibilityTitle: "Celebrate minimalism through rituals or stories",
      role: "Grand Mother",
      frequency: "Monthly",
      karmaPoints: 18,
      emotionalTone: "Joy",
      viceAvoided: "Materialism"
    },

    // Duty 41: Listen fully before forming opinions
    {
      dutyId: 41,
      responsibilityTitle: "Listen fully before forming opinions",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 22,
      emotionalTone: "Patience",
      viceAvoided: "Rash judgment"
    },
    {
      dutyId: 41,
      responsibilityTitle: "Avoid labeling others based on appearance or hearsay",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Awareness",
      viceAvoided: "Rash judgment"
    },
    {
      dutyId: 41,
      responsibilityTitle: "Teach children to ask questions before assuming",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Curiosity",
      viceAvoided: "Rash judgment"
    },
    {
      dutyId: 41,
      responsibilityTitle: "Refrain from public shaming or quick blame",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Responsibility",
      viceAvoided: "Rash judgment"
    },
    {
      dutyId: 41,
      responsibilityTitle: "Reflect on one's own biases regularly",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Humility",
      viceAvoided: "Rash judgment"
    },

    // Duty 42: Avoid aimless wandering or loitering
    {
      dutyId: 42,
      responsibilityTitle: "Avoid aimless wandering or loitering",
      role: "Youth",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Focus",
      viceAvoided: "Restlessness"
    },
    {
      dutyId: 42,
      responsibilityTitle: "Practice walking meditation or mindful steps",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Stillness",
      viceAvoided: "Restlessness"
    },
    {
      dutyId: 42,
      responsibilityTitle: "Refrain from fidgeting or constant motion",
      role: "Brother",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Calm",
      viceAvoided: "Restlessness"
    },
    {
      dutyId: 42,
      responsibilityTitle: "Teach children to sit still during rituals or meals",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Discipline",
      viceAvoided: "Restlessness"
    },
    {
      dutyId: 42,
      responsibilityTitle: "Use travel time for reflection or prayer",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Awareness",
      viceAvoided: "Restlessness"
    },

    // Duty 43: Bathe before prayer or cooking
    {
      dutyId: 43,
      responsibilityTitle: "Bathe before prayer or cooking",
      role: "Mother",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Reverence",
      viceAvoided: "Impurity"
    },
    {
      dutyId: 43,
      responsibilityTitle: "Keep prayer spaces clean and uncluttered",
      role: "Admin",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Stewardship",
      viceAvoided: "Impurity"
    },
    {
      dutyId: 43,
      responsibilityTitle: "Teach children to wash hands before meals",
      role: "Father",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Impurity"
    },
    {
      dutyId: 43,
      responsibilityTitle: "Refrain from entering sacred spaces unclean",
      role: "Grand Father",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Respect",
      viceAvoided: "Impurity"
    },
    {
      dutyId: 43,
      responsibilityTitle: "Use natural and non-harmful cleaning materials",
      role: "Grand Mother",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Care",
      viceAvoided: "Impurity"
    },

    // Duty 44: Recite mantras or sacred verses aloud
    {
      dutyId: 44,
      responsibilityTitle: "Recite mantras or sacred verses aloud",
      role: "Grand Father",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Devotion",
      viceAvoided: "Profanity"
    },
    {
      dutyId: 44,
      responsibilityTitle: "Avoid using curse words or vulgar expressions",
      role: "Brother",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Discipline",
      viceAvoided: "Profanity"
    },
    {
      dutyId: 44,
      responsibilityTitle: "Teach children to speak with reverence",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Profanity"
    },
    {
      dutyId: 44,
      responsibilityTitle: "Use sacred names in daily greetings",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Joy",
      viceAvoided: "Profanity"
    },
    {
      dutyId: 44,
      responsibilityTitle: "Refrain from mocking religious chants or rituals",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Respect",
      viceAvoided: "Profanity"
    },

    // Duty 45: Observe a period of silence each week
    {
      dutyId: 45,
      responsibilityTitle: "Observe a period of silence each week",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 22,
      emotionalTone: "Stillness",
      viceAvoided: "Noise"
    },
    {
      dutyId: 45,
      responsibilityTitle: "Avoid interrupting others—listen fully",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Respect",
      viceAvoided: "Noise"
    },
    {
      dutyId: 45,
      responsibilityTitle: "Create quiet spaces in the home",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Stewardship",
      viceAvoided: "Noise"
    },
    {
      dutyId: 45,
      responsibilityTitle: "Teach children to listen with attention",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Noise"
    },
    {
      dutyId: 45,
      responsibilityTitle: "Refrain from loud devices during sacred times",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Awareness",
      viceAvoided: "Noise"
    },

    // Duty 46: Donate to temples or spiritual causes
    {
      dutyId: 46,
      responsibilityTitle: "Donate to temples or spiritual causes",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 22,
      emotionalTone: "Reverence",
      viceAvoided: "Stinginess"
    },
    {
      dutyId: 46,
      responsibilityTitle: "Avoid announcing or boasting about donations",
      role: "Admin",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Humility",
      viceAvoided: "Stinginess"
    },
    {
      dutyId: 46,
      responsibilityTitle: "Teach children to give with joy",
      role: "Mother",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Stinginess"
    },
    {
      dutyId: 46,
      responsibilityTitle: "Refrain from calculating returns on giving",
      role: "Grand Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Detachment",
      viceAvoided: "Stinginess"
    },
    {
      dutyId: 46,
      responsibilityTitle: "Offer food or gifts to wandering seekers",
      role: "Grand Mother",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Compassion",
      viceAvoided: "Stinginess"
    },

    // Duty 47: Read and reflect on one verse each week
    {
      dutyId: 47,
      responsibilityTitle: "Read and reflect on one verse each week",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 22,
      emotionalTone: "Wisdom",
      viceAvoided: "Ignorance"
    },
    {
      dutyId: 47,
      responsibilityTitle: "Share meanings of verses with children",
      role: "Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Teaching",
      viceAvoided: "Ignorance"
    },
    {
      dutyId: 47,
      responsibilityTitle: "Avoid dismissing ancient texts as irrelevant",
      role: "Admin",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Respect",
      viceAvoided: "Ignorance"
    },
    {
      dutyId: 47,
      responsibilityTitle: "Keep a family book of sacred learnings",
      role: "Grand Mother",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Memory",
      viceAvoided: "Ignorance"
    },
    {
      dutyId: 47,
      responsibilityTitle: "Refrain from arguing without understanding",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Humility",
      viceAvoided: "Ignorance"
    },

    // Duty 48: Begin work with a prayer or intention
    {
      dutyId: 48,
      responsibilityTitle: "Begin work with a prayer or intention",
      role: "Father",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Devotion",
      viceAvoided: "Laziness"
    },
    {
      dutyId: 48,
      responsibilityTitle: "Avoid procrastination in daily duties",
      role: "Admin",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Discipline",
      viceAvoided: "Laziness"
    },
    {
      dutyId: 48,
      responsibilityTitle: "Teach children the dignity of labor",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Nurturing",
      viceAvoided: "Laziness"
    },
    {
      dutyId: 48,
      responsibilityTitle: "Refrain from complaining about assigned tasks",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Acceptance",
      viceAvoided: "Laziness"
    },
    {
      dutyId: 48,
      responsibilityTitle: "Celebrate completion of work with gratitude",
      role: "Grand Father",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Joy",
      viceAvoided: "Laziness"
    },

    // Duty 49: Wake and sleep in alignment with sunrise/sunset
    {
      dutyId: 49,
      responsibilityTitle: "Wake and sleep in alignment with sunrise/sunset",
      role: "Admin",
      frequency: "Daily",
      karmaPoints: 22,
      emotionalTone: "Harmony",
      viceAvoided: "Wastefulness"
    },
    {
      dutyId: 49,
      responsibilityTitle: "Avoid idle time—fill gaps with reflection or service",
      role: "Grand Father",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Awareness",
      viceAvoided: "Wastefulness"
    },
    {
      dutyId: 49,
      responsibilityTitle: "Teach children to honor time through rituals",
      role: "Mother",
      frequency: "Weekly",
      karmaPoints: 20,
      emotionalTone: "Rhythm",
      viceAvoided: "Wastefulness"
    },
    {
      dutyId: 49,
      responsibilityTitle: "Refrain from delaying sacred duties",
      role: "Father",
      frequency: "Daily",
      karmaPoints: 20,
      emotionalTone: "Responsibility",
      viceAvoided: "Wastefulness"
    },
    {
      dutyId: 49,
      responsibilityTitle: "Use calendars or reminders to honor sacred timings",
      role: "Sister",
      frequency: "Weekly",
      karmaPoints: 18,
      emotionalTone: "Structure",
      viceAvoided: "Wastefulness"
    },

    // Duty 50: Share stories of ancestors during family gatherings
    {
      dutyId: 50,
      responsibilityTitle: "Share stories of ancestors during family gatherings",
      role: "Grand Mother",
      frequency: "Monthly",
      karmaPoints: 22,
      emotionalTone: "Connection",
      viceAvoided: "Forgetfulness"
    },
    {
      dutyId: 50,
      responsibilityTitle: "Maintain family tree or ancestral record",
      role: "Admin",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Stewardship",
      viceAvoided: "Forgetfulness"
    },
    {
      dutyId: 50,
      responsibilityTitle: "Teach children rituals that honor ancestors",
      role: "Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Reverence",
      viceAvoided: "Forgetfulness"
    },
    {
      dutyId: 50,
      responsibilityTitle: "Refrain from mocking or ignoring ancestral practices",
      role: "Sister",
      frequency: "Monthly",
      karmaPoints: 18,
      emotionalTone: "Respect",
      viceAvoided: "Forgetfulness"
    },
    {
      dutyId: 50,
      responsibilityTitle: "Celebrate ancestral days with offerings and prayer",
      role: "Grand Father",
      frequency: "Monthly",
      karmaPoints: 20,
      emotionalTone: "Gratitude",
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
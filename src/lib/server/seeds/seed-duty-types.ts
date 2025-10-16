import { PrismaClient } from "@prisma/client";

export async function seedDutyTypes(prisma: PrismaClient) {
  console.log("Seeding duty types...");

  await prisma.dutyType.createMany({
    data: [
      { code: "karmic_duty", label: "கர்ம யோகம் (Karma Yoga)", vedicTheme: "Karma", colorTag: "#FF6B6B", icon: "🧱", karmaPointRange: "20–39" },
      { code: "dharmic_duty", label: "தர்ம கடமை (Dharma Duty)", vedicTheme: "Dharma", colorTag: "#4ECDC4", icon: "🕊️", karmaPointRange: "40–59" },
      { code: "self_duty", label: "ஆன்மீக வளர்ச்சி (Self Development)", vedicTheme: "Atman", colorTag: "#45B7D1", icon: "🧘", karmaPointRange: "80–99" },
      { code: "heavenly_duty", label: "தேவர் கடமை (Devas Duty)", vedicTheme: "Devata", colorTag: "#FFA07A", icon: "🌠", karmaPointRange: "60–79" },
      { code: "divinely_duty", label: "ரிஷி கடமை (Rishi Duty)", vedicTheme: "Rishi", colorTag: "#98D8C8", icon: "✨", karmaPointRange: "100–112" },
      { code: "earthly_duty", label: "பஞ்சபூத கடமை (Pancha Bhootham)", vedicTheme: "Prakriti", colorTag: "#F7DC6F", icon: "🌿", karmaPointRange: "1–19" },
      { code: "clan_duty", label: "குல கடமை (Clan Heritage)", vedicTheme: "Kula", colorTag: "#BB8FCE", icon: "🧬", karmaPointRange: "40–59" }
    ]
  });
}
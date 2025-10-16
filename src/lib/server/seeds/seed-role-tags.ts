import { PrismaClient } from "@prisma/client";

export async function seedRoleTags(prisma: PrismaClient) {
  console.log("Seeding role tags...");

  const roleTags = [
    { id: "F1", englishName: "Elder Male (Thatha)", tamilName: "பெரியவர் (தாத்தா)" },
    { id: "F2", englishName: "Elder Female (Paatti)", tamilName: "பெரியவர் (பாட்டி)" },
    { id: "F3", englishName: "Adult Male (Father, Uncle)", tamilName: "அப்பா / மாமா" },
    { id: "F4", englishName: "Adult Female (Mother, Aunt)", tamilName: "அம்மா / அத்தை" },
    { id: "F5", englishName: "Young Male (Boy)", tamilName: "சிறுவன்" },
    { id: "F6", englishName: "Young Female (Girl)", tamilName: "சிறுமி" },
    { id: "F7", englishName: "Child (Any)", tamilName: "குழந்தை" },
    { id: "F8", englishName: "Priest / Ritual Role", tamilName: "பூசாரி / வேதியர்" },
    { id: "F9", englishName: "Guest / Receiver", tamilName: "விருந்தினர்" },
    { id: "F10", englishName: "Teacher / Guide", tamilName: "ஆசான் / குரு" }
  ];

  for (const roleTag of roleTags) {
    await prisma.roleTag.upsert({
      where: { id: roleTag.id },
      update: roleTag,
      create: roleTag
    });
  }

  console.log("Role tags seeded successfully");
}
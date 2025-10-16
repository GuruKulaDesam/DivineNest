-- CreateTable
CREATE TABLE "duty_types_lookup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dutyTypeTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "responsibility_types_lookup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "responsibilityTypeTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_duties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dutyCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "role" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "karmaPoints" INTEGER,
    "lifeStage" TEXT,
    "dutyTypeId" INTEGER,
    "virtueIds" TEXT,
    "sourceText" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "duties_dutyCode_fkey" FOREIGN KEY ("dutyCode") REFERENCES "duty_types" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "duties_dutyTypeId_fkey" FOREIGN KEY ("dutyTypeId") REFERENCES "duty_types_lookup" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_duties" ("createdAt", "description", "dutyCode", "frequency", "id", "karmaPoints", "role", "sourceText", "title", "updatedAt") SELECT "createdAt", "description", "dutyCode", "frequency", "id", "karmaPoints", "role", "sourceText", "title", "updatedAt" FROM "duties";
DROP TABLE "duties";
ALTER TABLE "new_duties" RENAME TO "duties";
CREATE TABLE "new_responsibilities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dutyId" INTEGER NOT NULL,
    "responsibilityTitle" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "karmaPoints" INTEGER NOT NULL,
    "emotionalTone" TEXT NOT NULL,
    "viceAvoided" TEXT NOT NULL,
    "responsibilityTypeId" INTEGER,
    "virtueIds" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "responsibilities_dutyId_fkey" FOREIGN KEY ("dutyId") REFERENCES "duties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "responsibilities_responsibilityTypeId_fkey" FOREIGN KEY ("responsibilityTypeId") REFERENCES "responsibility_types_lookup" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_responsibilities" ("createdAt", "dutyId", "emotionalTone", "frequency", "id", "karmaPoints", "responsibilityTitle", "role", "updatedAt", "viceAvoided") SELECT "createdAt", "dutyId", "emotionalTone", "frequency", "id", "karmaPoints", "responsibilityTitle", "role", "updatedAt", "viceAvoided" FROM "responsibilities";
DROP TABLE "responsibilities";
ALTER TABLE "new_responsibilities" RENAME TO "responsibilities";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

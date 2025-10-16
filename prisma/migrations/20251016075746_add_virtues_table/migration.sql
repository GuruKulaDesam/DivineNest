-- CreateTable
CREATE TABLE "virtues" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "virtueName" TEXT NOT NULL,
    "virtueType" TEXT NOT NULL,
    "virtueCategory" TEXT NOT NULL,
    "virtueStage" TEXT NOT NULL,
    "karmaPoints" INTEGER NOT NULL,
    "viceAvoided" TEXT,
    "sourceText" TEXT,
    "sourceType" TEXT,
    "description" TEXT,
    "isRenunciative" BOOLEAN NOT NULL DEFAULT false,
    "isDebtClearing" BOOLEAN NOT NULL DEFAULT false,
    "isSociallyVisible" BOOLEAN NOT NULL DEFAULT false,
    "recommendedRoles" TEXT,
    "recommendedFrequency" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

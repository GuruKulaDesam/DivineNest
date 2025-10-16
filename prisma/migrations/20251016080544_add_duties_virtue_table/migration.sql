-- CreateTable
CREATE TABLE "duties_virtue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "virtueId" INTEGER NOT NULL,
    "dutyTitle" TEXT NOT NULL,
    "karmaPoints" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "lifeStage" TEXT NOT NULL,
    "sourceText" TEXT,
    "viceAvoided" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "duties_virtue_virtueId_fkey" FOREIGN KEY ("virtueId") REFERENCES "virtues" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

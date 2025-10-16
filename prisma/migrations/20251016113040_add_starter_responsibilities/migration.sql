/*
  Warnings:

  - You are about to drop the column `activity` on the `responsibilities` table. All the data in the column will be lost.
  - You are about to drop the column `assignee` on the `responsibilities` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `responsibilities` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `responsibilities` table. All the data in the column will be lost.
  - You are about to drop the column `tools` on the `responsibilities` table. All the data in the column will be lost.
  - You are about to drop the column `zone` on the `responsibilities` table. All the data in the column will be lost.
  - Added the required column `karmaPoints` to the `responsibilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsibilityTitle` to the `responsibilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viceAvoided` to the `responsibilities` table without a default value. This is not possible if the table is not empty.
  - Made the column `emotionalTone` on table `responsibilities` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "emergencies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "issueType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "preventiveAction" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "urgencyLevel" TEXT NOT NULL,
    "lifeStage" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "emergency_virtues" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emergencyId" INTEGER NOT NULL,
    "virtueId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "emergency_virtues_emergencyId_fkey" FOREIGN KEY ("emergencyId") REFERENCES "emergencies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "emergency_virtues_virtueId_fkey" FOREIGN KEY ("virtueId") REFERENCES "virtues" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "issues" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "issueType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "preventiveAction" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "urgencyLevel" TEXT NOT NULL,
    "lifeStage" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "issue_virtues" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "issueId" INTEGER NOT NULL,
    "virtueId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "issue_virtues_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issues" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "issue_virtues_virtueId_fkey" FOREIGN KEY ("virtueId") REFERENCES "virtues" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "starter_responsibilities" (
    "responsibilityId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "virtueIds" TEXT NOT NULL,
    "linkedVirtueTitles" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "lifeStage" TEXT NOT NULL,
    "urgencyLevel" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_responsibilities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dutyId" INTEGER NOT NULL,
    "responsibilityTitle" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "karmaPoints" INTEGER NOT NULL,
    "emotionalTone" TEXT NOT NULL,
    "viceAvoided" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "responsibilities_dutyId_fkey" FOREIGN KEY ("dutyId") REFERENCES "duties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_responsibilities" ("createdAt", "dutyId", "emotionalTone", "frequency", "id", "role", "updatedAt") SELECT "createdAt", "dutyId", "emotionalTone", "frequency", "id", "role", "updatedAt" FROM "responsibilities";
DROP TABLE "responsibilities";
ALTER TABLE "new_responsibilities" RENAME TO "responsibilities";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "emergency_virtues_emergencyId_virtueId_key" ON "emergency_virtues"("emergencyId", "virtueId");

-- CreateIndex
CREATE UNIQUE INDEX "issue_virtues_issueId_virtueId_key" ON "issue_virtues"("issueId", "virtueId");

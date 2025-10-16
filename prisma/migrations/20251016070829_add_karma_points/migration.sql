-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "nickname" TEXT,
    "email" TEXT,
    "joinedDate" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "duty_types" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "vedicTheme" TEXT,
    "colorTag" TEXT,
    "icon" TEXT,
    "karmaPointRange" TEXT
);

-- CreateTable
CREATE TABLE "duties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dutyCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "role" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "karmaPoints" INTEGER,
    "sourceText" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "duties_dutyCode_fkey" FOREIGN KEY ("dutyCode") REFERENCES "duty_types" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "responsibilities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dutyId" INTEGER NOT NULL,
    "activity" TEXT NOT NULL,
    "description" TEXT,
    "tools" TEXT,
    "frequency" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "assignee" TEXT,
    "role" TEXT NOT NULL,
    "zone" TEXT,
    "emotionalTone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "responsibilities_dutyId_fkey" FOREIGN KEY ("dutyId") REFERENCES "duties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

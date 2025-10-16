-- CreateTable
CREATE TABLE "communication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "applicableRole" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "communication_messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "communicationId" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "messageType" TEXT NOT NULL,
    "readStatus" BOOLEAN NOT NULL DEFAULT false,
    "sentAt" DATETIME NOT NULL,
    CONSTRAINT "communication_messages_communicationId_fkey" FOREIGN KEY ("communicationId") REFERENCES "communication" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "communication_wish_lists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "communicationId" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "estimatedCost" REAL,
    "requestedBy" TEXT NOT NULL,
    CONSTRAINT "communication_wish_lists_communicationId_fkey" FOREIGN KEY ("communicationId") REFERENCES "communication" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "communication_suggestions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "communicationId" TEXT NOT NULL,
    "suggestion" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "proposedBy" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "communication_suggestions_communicationId_fkey" FOREIGN KEY ("communicationId") REFERENCES "communication" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "communication_discussions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "communicationId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "participants" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lastActivity" DATETIME NOT NULL,
    CONSTRAINT "communication_discussions_communicationId_fkey" FOREIGN KEY ("communicationId") REFERENCES "communication" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "communication_decisions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "communicationId" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "affectedParties" TEXT NOT NULL,
    "implemented" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "communication_decisions_communicationId_fkey" FOREIGN KEY ("communicationId") REFERENCES "communication" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "learning" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "applicableRole" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "learning_lessons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "learningId" TEXT NOT NULL,
    "lessonTitle" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "objectives" TEXT NOT NULL,
    "materials" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "learning_lessons_learningId_fkey" FOREIGN KEY ("learningId") REFERENCES "learning" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "learning_courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "learningId" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "certification" BOOLEAN NOT NULL DEFAULT false,
    "completionDate" DATETIME,
    CONSTRAINT "learning_courses_learningId_fkey" FOREIGN KEY ("learningId") REFERENCES "learning" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "learning_teaching_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "learningId" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "student" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "notes" TEXT,
    "date" DATETIME NOT NULL,
    CONSTRAINT "learning_teaching_logs_learningId_fkey" FOREIGN KEY ("learningId") REFERENCES "learning" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "learning_study_materials" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "learningId" TEXT NOT NULL,
    "materialType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "source" TEXT NOT NULL,
    "accessLink" TEXT,
    "difficulty" TEXT NOT NULL,
    CONSTRAINT "learning_study_materials_learningId_fkey" FOREIGN KEY ("learningId") REFERENCES "learning" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "learning_exams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "learningId" TEXT NOT NULL,
    "examName" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "score" REAL,
    "maxScore" REAL NOT NULL,
    "grade" TEXT,
    "certification" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "learning_exams_learningId_fkey" FOREIGN KEY ("learningId") REFERENCES "learning" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "issues_emergency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "issueId" INTEGER NOT NULL,
    "emergencyType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "responseTime" TEXT NOT NULL,
    "emergencyContacts" TEXT NOT NULL,
    "backupPlan" TEXT,
    "status" TEXT NOT NULL,
    "lastUpdated" DATETIME NOT NULL,
    CONSTRAINT "issues_emergency_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issues" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "issues_urgents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "issueId" INTEGER NOT NULL,
    "urgentType" TEXT NOT NULL,
    "deadline" DATETIME NOT NULL,
    "impact" TEXT NOT NULL,
    "stakeholders" TEXT NOT NULL,
    "actionPlan" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lastUpdated" DATETIME NOT NULL,
    CONSTRAINT "issues_urgents_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issues" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "issues_repairs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "issueId" INTEGER NOT NULL,
    "item" TEXT NOT NULL,
    "damage" TEXT NOT NULL,
    "repairType" TEXT NOT NULL,
    "estimatedCost" REAL,
    "contractor" TEXT,
    "parts" TEXT,
    "status" TEXT NOT NULL,
    "lastUpdated" DATETIME NOT NULL,
    CONSTRAINT "issues_repairs_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issues" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "issues_maintenance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "issueId" INTEGER NOT NULL,
    "system" TEXT NOT NULL,
    "maintenanceType" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "contractor" TEXT,
    "cost" REAL,
    "lastService" DATETIME,
    "nextService" DATETIME,
    CONSTRAINT "issues_maintenance_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issues" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "issues_upgrades" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "issueId" INTEGER NOT NULL,
    "upgradeType" TEXT NOT NULL,
    "benefit" TEXT NOT NULL,
    "roi" TEXT NOT NULL,
    "budget" REAL,
    "timeline" TEXT,
    "status" TEXT NOT NULL,
    "lastUpdated" DATETIME NOT NULL,
    CONSTRAINT "issues_upgrades_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issues" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "issues_conflicts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "issueId" INTEGER NOT NULL,
    "conflictType" TEXT NOT NULL,
    "parties" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "resolution" TEXT,
    "mediator" TEXT,
    "status" TEXT NOT NULL,
    "lastUpdated" DATETIME NOT NULL,
    CONSTRAINT "issues_conflicts_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issues" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "issues_habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "issueId" INTEGER NOT NULL,
    "habitType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "triggers" TEXT,
    "consequences" TEXT NOT NULL,
    "strategy" TEXT NOT NULL,
    "progress" TEXT NOT NULL,
    "lastUpdated" DATETIME NOT NULL,
    CONSTRAINT "issues_habits_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issues" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "wellness" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "applicableRole" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "wellness_physical_health" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wellnessId" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "intensity" TEXT NOT NULL,
    "vitals" TEXT,
    "notes" TEXT,
    "date" DATETIME NOT NULL,
    CONSTRAINT "wellness_physical_health_wellnessId_fkey" FOREIGN KEY ("wellnessId") REFERENCES "wellness" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "karma" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "linkedDuty" TEXT,
    "linkedAchievement" TEXT,
    "role" TEXT NOT NULL,
    "applicableRole" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "guests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "visitPurpose" TEXT NOT NULL,
    "expectedArrival" DATETIME,
    "expectedDeparture" DATETIME,
    "actualArrival" DATETIME,
    "actualDeparture" DATETIME,
    "specialNeeds" TEXT,
    "giftGiven" TEXT,
    "giftReceived" TEXT,
    "notes" TEXT,
    "applicableRole" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "environment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "maintenanceSchedule" TEXT,
    "lastMaintenance" DATETIME,
    "nextMaintenance" DATETIME,
    "responsiblePerson" TEXT,
    "cost" REAL,
    "applicableRole" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "finance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "actor" TEXT NOT NULL,
    "applicableRole" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "foods" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "healthFactor" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "cost" REAL,
    "applicableRole" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "applicableRole" TEXT NOT NULL,
    "expiryDate" DATETIME,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

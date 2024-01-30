-- CreateTable
CREATE TABLE "healthProblem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "degree" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    CONSTRAINT "healthProblem_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "sex" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

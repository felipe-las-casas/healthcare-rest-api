/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `client` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_healthProblem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "degree" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT NOT NULL,
    CONSTRAINT "healthProblem_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_healthProblem" ("clientId", "degree", "id", "name") SELECT "clientId", "degree", "id", "name" FROM "healthProblem";
DROP TABLE "healthProblem";
ALTER TABLE "new_healthProblem" RENAME TO "healthProblem";
CREATE TABLE "new_client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "sex" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_client" ("birthDate", "createdAt", "id", "name", "sex") SELECT "birthDate", "createdAt", "id", "name", "sex" FROM "client";
DROP TABLE "client";
ALTER TABLE "new_client" RENAME TO "client";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

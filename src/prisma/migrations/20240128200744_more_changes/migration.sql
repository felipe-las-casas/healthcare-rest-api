-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "sex" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_client" ("birthDate", "createdAt", "id", "name", "sex", "updatedAt") SELECT "birthDate", "createdAt", "id", "name", "sex", "updatedAt" FROM "client";
DROP TABLE "client";
ALTER TABLE "new_client" RENAME TO "client";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

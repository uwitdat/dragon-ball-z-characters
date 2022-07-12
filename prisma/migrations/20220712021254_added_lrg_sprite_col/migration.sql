-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "sprite" TEXT NOT NULL,
    "spriteLrg" TEXT NOT NULL DEFAULT '',
    "race" TEXT,
    "specialMove" TEXT,
    "gender" TEXT
);
INSERT INTO "new_Character" ("createdAt", "gender", "id", "name", "race", "specialMove", "sprite") SELECT "createdAt", "gender", "id", "name", "race", "specialMove", "sprite" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

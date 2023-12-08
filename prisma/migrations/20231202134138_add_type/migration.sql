-- AlterTable
ALTER TABLE "products" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;

-- CreateTable
CREATE TABLE "types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "img" TEXT,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "types_name_key" ON "types"("name");

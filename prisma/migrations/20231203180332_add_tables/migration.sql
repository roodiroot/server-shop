/*
  Warnings:

  - You are about to drop the column `created_at` on the `products` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "created_at",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "modelId" INTEGER NOT NULL,
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "categoryes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "img" TEXT,

    CONSTRAINT "categoryes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "models" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "img" TEXT,

    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToModel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ModelToType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "categoryes_name_key" ON "categoryes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "models_name_key" ON "models"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToType_AB_unique" ON "_CategoryToType"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToType_B_index" ON "_CategoryToType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToModel_AB_unique" ON "_CategoryToModel"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToModel_B_index" ON "_CategoryToModel"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ModelToType_AB_unique" ON "_ModelToType"("A", "B");

-- CreateIndex
CREATE INDEX "_ModelToType_B_index" ON "_ModelToType"("B");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categoryes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToType" ADD CONSTRAINT "_CategoryToType_A_fkey" FOREIGN KEY ("A") REFERENCES "categoryes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToType" ADD CONSTRAINT "_CategoryToType_B_fkey" FOREIGN KEY ("B") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToModel" ADD CONSTRAINT "_CategoryToModel_A_fkey" FOREIGN KEY ("A") REFERENCES "categoryes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToModel" ADD CONSTRAINT "_CategoryToModel_B_fkey" FOREIGN KEY ("B") REFERENCES "models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelToType" ADD CONSTRAINT "_ModelToType_A_fkey" FOREIGN KEY ("A") REFERENCES "models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelToType" ADD CONSTRAINT "_ModelToType_B_fkey" FOREIGN KEY ("B") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

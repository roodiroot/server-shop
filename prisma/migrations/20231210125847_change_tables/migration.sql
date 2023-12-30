/*
  Warnings:

  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `_CategoryToModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ModelToType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `typeId` to the `categoryes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `models` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToModel" DROP CONSTRAINT "_CategoryToModel_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToModel" DROP CONSTRAINT "_CategoryToModel_B_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToType" DROP CONSTRAINT "_CategoryToType_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToType" DROP CONSTRAINT "_CategoryToType_B_fkey";

-- DropForeignKey
ALTER TABLE "_ModelToType" DROP CONSTRAINT "_ModelToType_A_fkey";

-- DropForeignKey
ALTER TABLE "_ModelToType" DROP CONSTRAINT "_ModelToType_B_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_typeId_fkey";

-- AlterTable
ALTER TABLE "categoryes" ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "models" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "categoryId",
DROP COLUMN "typeId";

-- DropTable
DROP TABLE "_CategoryToModel";

-- DropTable
DROP TABLE "_CategoryToType";

-- DropTable
DROP TABLE "_ModelToType";

-- AddForeignKey
ALTER TABLE "categoryes" ADD CONSTRAINT "categoryes_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categoryes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

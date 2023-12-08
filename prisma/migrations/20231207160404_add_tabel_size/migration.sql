/*
  Warnings:

  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "price";

-- CreateTable
CREATE TABLE "sizes" (
    "id" SERIAL NOT NULL,
    "sizeMm" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sizes" ADD CONSTRAINT "sizes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

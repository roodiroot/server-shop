/*
  Warnings:

  - You are about to drop the column `price` on the `sizes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sizes" DROP COLUMN "price",
ADD COLUMN     "fastex_reinforced_price" INTEGER,
ADD COLUMN     "fastex_standard_price" INTEGER,
ADD COLUMN     "martingale_price" INTEGER,
ADD COLUMN     "slip_price" INTEGER;

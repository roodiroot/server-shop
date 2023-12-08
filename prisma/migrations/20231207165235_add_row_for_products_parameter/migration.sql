-- AlterTable
ALTER TABLE "products" ADD COLUMN     "parameter" TEXT;

-- AlterTable
ALTER TABLE "sizes" ALTER COLUMN "sizeMm" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;

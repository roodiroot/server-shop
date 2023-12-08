-- DropForeignKey
ALTER TABLE "sizes" DROP CONSTRAINT "sizes_productId_fkey";

-- AddForeignKey
ALTER TABLE "sizes" ADD CONSTRAINT "sizes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

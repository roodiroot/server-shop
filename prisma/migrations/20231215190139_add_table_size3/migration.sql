-- CreateTable
CREATE TABLE "sizes3" (
    "id" SERIAL NOT NULL,
    "size" TEXT,
    "description_size" TEXT,
    "price" INTEGER,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "sizes3_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sizes3" ADD CONSTRAINT "sizes3_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

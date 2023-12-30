-- CreateTable
CREATE TABLE "sizes2" (
    "id" SERIAL NOT NULL,
    "length" TEXT,
    "price" INTEGER,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "sizes2_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sizes2" ADD CONSTRAINT "sizes2_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

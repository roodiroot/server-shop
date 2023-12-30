-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "totalSumm" INTEGER,
    "commentValue" TEXT,
    "promocodeValue" TEXT,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product-basket" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "name" TEXT,
    "price" INTEGER,
    "comment" TEXT,
    "carbine" TEXT,
    "interception" TEXT,
    "size" TEXT,
    "count" INTEGER,
    "totalSum" INTEGER,
    "print" TEXT,
    "color" TEXT,
    "ring" TEXT,

    CONSTRAINT "product-basket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product-basket" ADD CONSTRAINT "product-basket_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

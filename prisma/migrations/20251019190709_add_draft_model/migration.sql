-- CreateTable
CREATE TABLE "Draft" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "platform" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "userId" TEXT NOT NULL,
    "localLastUpdatedAt" TIMESTAMP(3),
    "serverLastUpdatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Draft_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

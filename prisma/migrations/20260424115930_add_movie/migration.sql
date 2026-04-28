-- AlterTable
ALTER TABLE "products" ALTER COLUMN "movieId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "movie" (
    "id" TEXT NOT NULL,
    "movieTitle" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "year" INTEGER,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

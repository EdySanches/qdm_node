/*
  Warnings:

  - You are about to alter the column `title` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - Made the column `user_id` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `post_id` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `comment_description` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `post_description` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_type` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "post_id" SET NOT NULL,
ALTER COLUMN "comment_description" SET NOT NULL,
ALTER COLUMN "comment_description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "post_description" SET NOT NULL,
ALTER COLUMN "post_description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "user_email" SET DATA TYPE VARCHAR(191),
ALTER COLUMN "user_type" SET NOT NULL;

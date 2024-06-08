/*
  Warnings:

  - Added the required column `post_owner_id` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "post_owner_id" INTEGER NOT NULL;

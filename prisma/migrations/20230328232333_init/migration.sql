-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Employee', 'Customer', 'Admin');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'User';

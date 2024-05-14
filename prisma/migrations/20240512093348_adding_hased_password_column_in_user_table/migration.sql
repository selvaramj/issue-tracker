-- AlterSequence
ALTER SEQUENCE "Issue_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "hashedPassword" STRING;

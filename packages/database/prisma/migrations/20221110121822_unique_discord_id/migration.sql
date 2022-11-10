/*
  Warnings:

  - A unique constraint covering the columns `[discordId]` on the table `Ambasador` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Ambasador_discordId_key` ON `Ambasador`(`discordId`);

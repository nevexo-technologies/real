-- CreateTable
CREATE TABLE `MedieAdmitere` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hs` VARCHAR(255) NOT NULL,
    `medie` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

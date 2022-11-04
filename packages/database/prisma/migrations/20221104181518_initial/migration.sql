-- CreateTable
CREATE TABLE `Ambasador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `discordName` VARCHAR(255) NULL,
    `discordId` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Elev` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `age` INTEGER NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `hs` VARCHAR(255) NOT NULL,
    `class` INTEGER NOT NULL,
    `letter` VARCHAR(255) NOT NULL,
    `eth` VARCHAR(255) NOT NULL,
    `eth_full` VARCHAR(255) NULL,
    `e10` INTEGER NOT NULL,
    `e11` INTEGER NOT NULL,
    `e12` INTEGER NOT NULL,
    `e13` INTEGER NOT NULL,
    `e14` INTEGER NOT NULL,
    `e15` INTEGER NOT NULL,
    `e16` INTEGER NOT NULL,
    `e17` VARCHAR(255) NULL,
    `e18` INTEGER NOT NULL,
    `e19` VARCHAR(255) NOT NULL,
    `e20` INTEGER NOT NULL,
    `e21` VARCHAR(255) NOT NULL,
    `e22` INTEGER NOT NULL,
    `e23` INTEGER NOT NULL,
    `e24` INTEGER NOT NULL,
    `e24b` INTEGER NULL,
    `e25` INTEGER NOT NULL,
    `e25b` INTEGER NULL,
    `e26` INTEGER NOT NULL,
    `e27` INTEGER NOT NULL,
    `e28` INTEGER NOT NULL,
    `e29` INTEGER NOT NULL,
    `e30` INTEGER NOT NULL,
    `e31` INTEGER NOT NULL,
    `e32` INTEGER NOT NULL,
    `e33` VARCHAR(255) NOT NULL,
    `e34` INTEGER NOT NULL,
    `e35` INTEGER NOT NULL,
    `e36` INTEGER NOT NULL,
    `e37` INTEGER NOT NULL,
    `e38` VARCHAR(255) NOT NULL,
    `e38b` VARCHAR(255) NULL,
    `e39` INTEGER NOT NULL,
    `e39b` VARCHAR(255) NULL,
    `e40` INTEGER NOT NULL,
    `e41` VARCHAR(255) NOT NULL,
    `e41b` VARCHAR(255) NULL,
    `e43` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `completition_time` INTEGER NOT NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Elev_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parinte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `age` INTEGER NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `hs` VARCHAR(255) NOT NULL,
    `class` INTEGER NOT NULL,
    `letter` VARCHAR(255) NOT NULL,
    `eth` VARCHAR(255) NOT NULL,
    `eth_full` VARCHAR(255) NULL,
    `t10` INTEGER NOT NULL,
    `t11` INTEGER NOT NULL,
    `t12` INTEGER NOT NULL,
    `t13` INTEGER NOT NULL,
    `t13b` INTEGER NULL,
    `t14` INTEGER NOT NULL,
    `t15` INTEGER NOT NULL,
    `t16` INTEGER NOT NULL,
    `t17` INTEGER NOT NULL,
    `t18` INTEGER NOT NULL,
    `t19` INTEGER NOT NULL,
    `t19b` VARCHAR(255) NULL,
    `t20` VARCHAR(255) NOT NULL,
    `t20b` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `completition_time` INTEGER NOT NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Parinte_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profesor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `age` INTEGER NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `hs` VARCHAR(255) NOT NULL,
    `eth` VARCHAR(255) NOT NULL,
    `eth_full` VARCHAR(255) NULL,
    `p10` INTEGER NOT NULL,
    `p11` INTEGER NOT NULL,
    `p12` INTEGER NOT NULL,
    `p13` INTEGER NOT NULL,
    `p14` INTEGER NOT NULL,
    `p15` INTEGER NOT NULL,
    `p16` INTEGER NOT NULL,
    `p17` INTEGER NOT NULL,
    `p18` INTEGER NOT NULL,
    `p19` INTEGER NOT NULL,
    `p20` INTEGER NOT NULL,
    `p21` VARCHAR(255) NOT NULL,
    `p22` INTEGER NOT NULL,
    `p23` INTEGER NOT NULL,
    `p24` INTEGER NOT NULL,
    `p25` INTEGER NOT NULL,
    `p26` VARCHAR(255) NOT NULL,
    `p26b` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `completition_time` INTEGER NOT NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Profesor_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

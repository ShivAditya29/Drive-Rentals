CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `nodelogin`;

-- Users table
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_accounts_email` (`email`),
  UNIQUE KEY `uniq_accounts_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Admin table
CREATE TABLE IF NOT EXISTS `admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_admin_email` (`email`),
  UNIQUE KEY `uniq_admin_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bikes bookings table
CREATE TABLE IF NOT EXISTS `bikes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `mobile` BIGINT NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `license` VARCHAR(100) NOT NULL,
  `model` VARCHAR(100) NOT NULL,
  `area` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Admin add bikes catalog
CREATE TABLE IF NOT EXISTS `add_bikes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `model` VARCHAR(100) NOT NULL,
  `cost` INT NOT NULL,
  `features` VARCHAR(200) NOT NULL,
  `file_data` MEDIUMBLOB,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- User profiles
CREATE TABLE IF NOT EXISTS `user_profiles` (
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `number` BIGINT NOT NULL,
  `license` VARCHAR(100) NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `state` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Optional seed users
INSERT INTO `accounts` (`username`, `password`, `email`) VALUES
  ('test', 'test', 'test@test.com')
ON DUPLICATE KEY UPDATE email=VALUES(email);

INSERT INTO `admin` (`username`, `password`, `email`) VALUES
  ('kirti', 'kirti', 'kirti@kirti.com')
ON DUPLICATE KEY UPDATE email=VALUES(email);


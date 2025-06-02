-- CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;

-- CREATE TABLE IF NOT EXISTS `accounts` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `username` varchar(50) NOT NULL,
--   `password` varchar(255) NOT NULL,
--   `email` varchar(100) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'kirti123#';
-- CREATE TABLE IF NOT EXISTS `admin` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `username` varchar(50) NOT NULL,
--   `password` varchar(255) NOT NULL,
--   `email` varchar(100) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- INSERT INTO `admin` (`id`, `username`, `password`, `email`) VALUES (1, 'kirti', 'kirti', 'kirti@kirti.com');

-- CREATE TABLE IF NOT EXISTS `bikes` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `username` varchar(50) NOT NULL,
--   `password` varchar(255) NOT NULL,
--   `email` varchar(100) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- INSERT INTO `admin` (`id`, `username`, `password`, `email`) VALUES (1, 'kirti', 'kirti', 'kirti@kirti.com');

-- CREATE TABLE IF NOT EXISTS `bikes` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `name` varchar(50) NOT NULL,
--   `mobile` int(20) NOT NULL,
--    `address` varchar(100) NOT NULL,
--    `license` varchar(100) NOT NULL,
--    `state` varchar(100) NOT NULL,
--    `area` varchar(100) NOT NULL,
--   `email` varchar(100) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- SELECT * FROM bikes where name="test";

-- CREATE TABLE IF NOT EXISTS `add_bikes` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `name` varchar(50) NOT NULL,
--   
--    `description` varchar(200) NOT NULL,
--    `model` int(100) NOT NULL,
--    `cost` int(100) NOT NULL,
--    `features` varchar(200) NOT NULL,
--   `file_data` MEDIUMBLOB NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- CREATE TABLE IF NOT EXISTS `user_profiles` (
--   
--   `username` varchar(50) NOT NULL,
--    `email` varchar(200) NOT NULL,
--    `number` int(100) NOT NULL,
--    `license` int(100) NOT NULL,
--    `address` varchar(200) NOT NULL,
--    `state` varchar(200) NOT NULL,
--   
--   PRIMARY KEY (`username`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;



ALTER TABLE bikes
RENAME COLUMN state to model;


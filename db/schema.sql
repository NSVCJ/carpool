-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Users'
--
-- ---

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `email` VARCHAR NULL DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `phone` INTEGER NULL DEFAULT NULL,
  `rating` DECIMAL NULL DEFAULT NULL,
  `profilePicture` VARCHAR NULL DEFAULT NULL,
  `numberOfRatings` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Trips'
--
-- ---

DROP TABLE IF EXISTS `Trips`;

CREATE TABLE `Trips` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `startTime` DATETIME NULL DEFAULT NULL,
  `price` DECIMAL NULL DEFAULT NULL,
  `eventID` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'TripUsers'
--
-- ---

DROP TABLE IF EXISTS `TripUsers`;

CREATE TABLE `TripUsers` (
  `tripID` INTEGER NULL DEFAULT NULL,
  `userID` INTEGER NULL DEFAULT NULL,
  `startLocationLat` DECIMAL NULL DEFAULT NULL,
  `startLocationLng` DECIMAL NULL DEFAULT NULL,
  `Role` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`tripID`)
);

-- ---
-- Table 'UserEvents'
--
-- ---

DROP TABLE IF EXISTS `UserEvents`;

CREATE TABLE `UserEvents` (
  `userID` INTEGER NULL DEFAULT NULL,
  `eventID` INTEGER NULL DEFAULT NULL,
  `tripID` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`userID`)
);

-- ---
-- Table 'Events'
--
-- ---

DROP TABLE IF EXISTS `Events`;

CREATE TABLE `Events` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `locationLat` DECIMAL NULL DEFAULT NULL,
  `locationLng` DECIMAL NULL DEFAULT NULL,
  `startTime` DATETIME NULL DEFAULT NULL,
  `type` VARCHAR NULL DEFAULT NULL,
  `description` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Trips` ADD FOREIGN KEY (eventID) REFERENCES `Events` (`id`);
ALTER TABLE `TripUsers` ADD FOREIGN KEY (tripID) REFERENCES `Trips` (`id`);
ALTER TABLE `TripUsers` ADD FOREIGN KEY (userID) REFERENCES `Users` (`id`);
ALTER TABLE `UserEvents` ADD FOREIGN KEY (userID) REFERENCES `Users` (`id`);
ALTER TABLE `UserEvents` ADD FOREIGN KEY (eventID) REFERENCES `Events` (`id`);
ALTER TABLE `UserEvents` ADD FOREIGN KEY (tripID) REFERENCES `Trips` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Trips` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `TripUsers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `UserEvents` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Events` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Users` (`id`,`email`,`name`,`phone`,`rating`,`profilePicture`,`numberOfRatings`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Trips` (`id`,`startTime`,`price`,`eventID`) VALUES
-- ('','','','');
-- INSERT INTO `TripUsers` (`tripID`,`userID`,`startLocationLat`,`startLocationLng`,`Role`) VALUES
-- ('','','','','');
-- INSERT INTO `UserEvents` (`userID`,`eventID`,`tripID`) VALUES
-- ('','','');
-- INSERT INTO `Events` (`id`,`name`,`locationLat`,`locationLng`,`startTime`,`type`,`description`) VALUES
-- ('','','','','','','');

CREATE DATABASE nurse;

CREATE TABLE `nurse` (
  `license` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `age` smallint DEFAULT NULL,
  PRIMARY KEY (`license`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rostin_db
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `kunde`
--

DROP TABLE IF EXISTS `kunde`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kunde` (
  `KundenID` int NOT NULL AUTO_INCREMENT,
  `Benutzername` varchar(50) NOT NULL,
  `Nachname` varchar(50) NOT NULL,
  `Vorname` varchar(50) NOT NULL,
  `Geburtsdatum` date NOT NULL,
  `Telefonnummer` varchar(20) DEFAULT NULL,
  `EMail` varchar(100) NOT NULL,
  `Passwort` varchar(100) NOT NULL,
  `Straße` varchar(100) DEFAULT NULL,
  `Hausnummer` varchar(10) DEFAULT NULL,
  `Stadt` varchar(50) DEFAULT NULL,
  `PLZ` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`KundenID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kunde`
--

LOCK TABLES `kunde` WRITE;
/*!40000 ALTER TABLE `kunde` DISABLE KEYS */;
INSERT INTO `kunde` VALUES (1,'lala','lala','lala','1999-02-01','19283989','lolo@gmail.com','Ll123@','bremenstr','16','bremen','12345'),(2,'sorin','sorin','sorin','2001-01-01','12345678','sorin@gmail.com','Sorin1@','bremenstr','16','bremen','12345'),(3,'Lorin','ram','Lorin','1998-01-01','19283989','lorin@gmail.com','Lorin1@','bremenstr','16','bremen','12345'),(4,'rama','rama','rama','2001-01-01','19283989','rama@gmail.com','Rama1@','bremenstr','16','bremen','12345');
/*!40000 ALTER TABLE `kunde` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-18  0:16:59

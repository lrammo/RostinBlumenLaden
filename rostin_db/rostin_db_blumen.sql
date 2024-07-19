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
-- Table structure for table `blumen`
--

DROP TABLE IF EXISTS `blumen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blumen` (
  `blumeID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `art` varchar(255) NOT NULL,
  `description` text,
  `preis` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`blumeID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blumen`
--

LOCK TABLES `blumen` WRITE;
/*!40000 ALTER TABLE `blumen` DISABLE KEYS */;
INSERT INTO `blumen` VALUES (11,'Rose','Rosa','Eine schöne rote Rose.',2.99,'../assets/images/Rose.jpg'),(12,'Tulpe','Tulipa','Eine bunte Tulpe.',1.99,'../assets/images/Tulpe.jpg'),(13,'Sonnenblume','Helianthus','Eine große gelbe Sonnenblume.',3.49,'../assets/images/Sonnenblume.jpg'),(14,'Lilie','Lilium','Eine elegante weiße Lilie.',2.49,'../assets/images/Lilie.jpg'),(15,'Orchidee','Orchidaceae','Eine exotische Orchidee.',4.99,'../assets/images/Orchidee.jpg'),(16,'Gänseblümchen','Bellis','Ein einfaches und hübsches Gänseblümchen.',0.99,'../assets/images/Gänseblümchen.jpg'),(17,'Narzisse','Narcissus','Eine strahlend gelbe Narzisse.',1.49,'../assets/images/Narzisse.jpg'),(18,'Veilchen','Viola','Ein kleines violettes Veilchen.',1.79,'../assets/images/Veilchen.jpg'),(19,'Margerite','Leucanthemum','Eine klassische weiße Margerite.',1.29,'../assets/images/Margerite.jpg'),(20,'Lavendel','Lavandula','Duftender lila Lavendel.',2.19,'../assets/images/Lavendel.jpg');
/*!40000 ALTER TABLE `blumen` ENABLE KEYS */;
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

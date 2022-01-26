-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dentalink_db
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `teeth`
--

DROP TABLE IF EXISTS `teeth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teeth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` int NOT NULL,
  `position` int NOT NULL,
  `identifier` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teeth`
--

LOCK TABLES `teeth` WRITE;
/*!40000 ALTER TABLE `teeth` DISABLE KEYS */;
INSERT INTO `teeth` VALUES (1,1,1,1),(2,1,1,2),(3,2,1,3),(4,3,1,4),(5,3,1,5),(6,4,1,6),(7,4,1,7),(8,4,1,8),(9,1,2,1),(10,1,2,2),(11,2,2,3),(12,3,2,4),(13,3,2,5),(14,4,2,6),(15,4,2,7),(16,4,2,8),(17,1,3,1),(18,1,3,2),(19,2,3,3),(20,3,3,4),(21,3,3,5),(22,4,3,6),(23,4,3,7),(24,4,3,8),(25,1,4,1),(26,1,4,2),(27,2,4,3),(28,3,4,4),(29,3,4,5),(30,4,4,6),(31,4,4,7),(32,4,4,8),(33,1,5,1),(34,1,5,2),(35,2,5,3),(36,4,5,4),(37,4,5,5),(38,1,6,1),(39,1,6,2),(40,2,6,3),(41,4,6,4),(42,4,6,5),(43,1,7,1),(44,1,7,2),(45,2,7,3),(46,4,7,4),(47,4,7,5),(48,1,8,1),(49,1,8,2),(50,2,8,3),(51,4,8,4),(52,4,8,5);
/*!40000 ALTER TABLE `teeth` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-26 17:48:49

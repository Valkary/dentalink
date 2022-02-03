-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: dentalink_db
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `names` varchar(45) NOT NULL,
  `last_names` varchar(45) NOT NULL,
  `sex` int NOT NULL,
  `age` int NOT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `postal_code` int NOT NULL,
  `job` varchar(45) DEFAULT NULL,
  `house_phone` varchar(10) NOT NULL,
  `office_phone` varchar(10) NOT NULL,
  `emergency_contact` varchar(45) NOT NULL,
  `emergency_phone` varchar(10) NOT NULL,
  `civil_status` int NOT NULL,
  `birth_date` date NOT NULL,
  `prior_illnesses` json DEFAULT NULL,
  `family_illnesses` json DEFAULT NULL,
  `under_treatment` int NOT NULL,
  `severe_dental_issues` int DEFAULT NULL,
  `severe_dental_treatments` varchar(100) DEFAULT NULL,
  `taking_drugs` int NOT NULL,
  `drugs` varchar(45) DEFAULT NULL,
  `allergies` varchar(45) DEFAULT NULL,
  `addiction` int DEFAULT NULL,
  `addictions` varchar(45) DEFAULT NULL,
  `smoker` int DEFAULT NULL,
  `daily_cigarettes` int DEFAULT NULL,
  `pregnant` int DEFAULT NULL,
  `gestation_months` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'Jersón','Cortés Palomino',0,18,'3310649490','pepoclesng@gmail.com','Beristain y Souza 461',44500,'Freelance','3339525004','3314113912','Papá','3310649490',0,'2002-08-05',NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'Pikotes','Taka',0,15,'3310649490','pepoclesng@gmail.com','Beristain y Souza 461',44500,'Freelance','3339525004','3314113912','Papá','3310649490',0,'2002-08-05',NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procedures`
--

DROP TABLE IF EXISTS `procedures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `procedures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procedures`
--

LOCK TABLES `procedures` WRITE;
/*!40000 ALTER TABLE `procedures` DISABLE KEYS */;
INSERT INTO `procedures` VALUES (1,'Corona'),(2,'Corona provisionaria'),(3,'Endodoncia'),(4,'Restauración'),(5,'Implante'),(6,'Perno muñon'),(7,'Otro'),(8,'Prótesis removible'),(9,'Corona (mal estado)');
/*!40000 ALTER TABLE `procedures` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `teeth_types`
--

DROP TABLE IF EXISTS `teeth_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teeth_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teeth_types`
--

LOCK TABLES `teeth_types` WRITE;
/*!40000 ALTER TABLE `teeth_types` DISABLE KEYS */;
INSERT INTO `teeth_types` VALUES (1,'Incisor'),(2,'Canino'),(3,'Premolar'),(4,'Molar');
/*!40000 ALTER TABLE `teeth_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tooth_areas`
--

DROP TABLE IF EXISTS `tooth_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tooth_areas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tooth_areas`
--

LOCK TABLES `tooth_areas` WRITE;
/*!40000 ALTER TABLE `tooth_areas` DISABLE KEYS */;
INSERT INTO `tooth_areas` VALUES (1,'Superior'),(2,'Izquierda'),(3,'Centro'),(4,'Derecha'),(5,'Inferior');
/*!40000 ALTER TABLE `tooth_areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tooth_history`
--

DROP TABLE IF EXISTS `tooth_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tooth_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_patient` int NOT NULL,
  `id_procedure` int NOT NULL,
  `id_tooth` int NOT NULL,
  `date` date NOT NULL,
  `area` int NOT NULL,
  `status` int NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tooth_history`
--

LOCK TABLES `tooth_history` WRITE;
/*!40000 ALTER TABLE `tooth_history` DISABLE KEYS */;
INSERT INTO `tooth_history` VALUES (1,1,4,1,'2021-12-08',3,2,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),(2,1,2,1,'2021-12-08',2,1,'EEEEEEEEEEEEEE');
/*!40000 ALTER TABLE `tooth_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tooth_status`
--

DROP TABLE IF EXISTS `tooth_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tooth_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tooth_status`
--

LOCK TABLES `tooth_status` WRITE;
/*!40000 ALTER TABLE `tooth_status` DISABLE KEYS */;
INSERT INTO `tooth_status` VALUES (1,'Realizado anteriormente','#4A5568'),(2,'Por hacer','#C53030'),(3,'Realizado','#2B6CB0');
/*!40000 ALTER TABLE `tooth_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(60) NOT NULL,
  `security_lvl` int NOT NULL,
  `first_names` varchar(100) NOT NULL,
  `last_names` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2b$10$ArXXGO5e3N4ZX4ryURG8FOBNGJVahmlWbFbS1C9hQis253Mwe3JCW',1,'José','Salcedo Uribe');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-08 12:41:45

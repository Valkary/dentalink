DROP TABLE IF EXISTS `tooth_history`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `tooth_status`;

CREATE TABLE `tooth_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `tooth_status` WRITE;
INSERT INTO `tooth_status` VALUES (1,'Realizado anteriormente','#4A5568'),(2,'Por hacer','#C53030'),(3,'Realizado','#2B6CB0');
UNLOCK TABLES;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(60) NOT NULL,
  `security_lvl` int NOT NULL,
  `first_names` varchar(100) NOT NULL,
  `last_names` varchar(100) NOT NULL,
  `profile_picture` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1,'admin','$2b$10$O7P086vbpiaURViKMOBriuCek8pFioeZVLKh./0fEGtPHBo4w9Le6',0,'José','Salcedo Uribe',NULL),(2,'erick','$2b$10$GDHcR5tBdZ/70nEQDcHDG.MpthVqoQfVq4HJa1sAYfIfn9zph3jVS',1,'Erik','Sánchez Amezcua',1);
UNLOCK TABLES;

DROP TABLE IF EXISTS `tooth_areas`;

CREATE TABLE `tooth_areas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `tooth_areas` WRITE;
INSERT INTO `tooth_areas` VALUES (1,'Superior'),(2,'Izquierda'),(3,'Centro'),(4,'Derecha'),(5,'Inferior');
UNLOCK TABLES;

DROP TABLE IF EXISTS `image_history`;

CREATE TABLE `image_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `images_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `images_id_UNIQUE` (`images_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `images`;

CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `if_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `images` WRITE;
INSERT INTO `images` VALUES (1,'/images/profile_pictures/1643240792035-436727489-erik.png','erik.png');
UNLOCK TABLES;

DROP TABLE IF EXISTS `patients`;

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
  `other_information` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `procedures`;

CREATE TABLE `procedures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `procedures` WRITE;
INSERT INTO `procedures` VALUES (1,'Corona'),(2,'Corona provisionaria'),(3,'Endodoncia'),(4,'Restauración'),(5,'Implante'),(6,'Perno muñon'),(7,'Otro'),(8,'Prótesis removible'),(9,'Corona (mal estado)');
UNLOCK TABLES;

DROP TABLE IF EXISTS `teeth`;

CREATE TABLE `teeth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` int NOT NULL,
  `position` int NOT NULL,
  `identifier` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `teeth` WRITE;
INSERT INTO `teeth` VALUES (1,1,1,1),(2,1,1,2),(3,2,1,3),(4,3,1,4),(5,3,1,5),(6,4,1,6),(7,4,1,7),(8,4,1,8),(9,1,2,1),(10,1,2,2),(11,2,2,3),(12,3,2,4),(13,3,2,5),(14,4,2,6),(15,4,2,7),(16,4,2,8),(17,1,3,1),(18,1,3,2),(19,2,3,3),(20,3,3,4),(21,3,3,5),(22,4,3,6),(23,4,3,7),(24,4,3,8),(25,1,4,1),(26,1,4,2),(27,2,4,3),(28,3,4,4),(29,3,4,5),(30,4,4,6),(31,4,4,7),(32,4,4,8),(33,1,5,1),(34,1,5,2),(35,2,5,3),(36,4,5,4),(37,4,5,5),(38,1,6,1),(39,1,6,2),(40,2,6,3),(41,4,6,4),(42,4,6,5),(43,1,7,1),(44,1,7,2),(45,2,7,3),(46,4,7,4),(47,4,7,5),(48,1,8,1),(49,1,8,2),(50,2,8,3),(51,4,8,4),(52,4,8,5);
UNLOCK TABLES;

DROP TABLE IF EXISTS `tooth_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tooth_areas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `tooth_areas` WRITE;
INSERT INTO `tooth_areas` VALUES (1,'Superior'),(2,'Izquierda'),(3,'Centro'),(4,'Derecha'),(5,'Inferior');
UNLOCK TABLES;

DROP TABLE IF EXISTS `teeth_types`;

CREATE TABLE `teeth_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `teeth_types` WRITE;
INSERT INTO `teeth_types` VALUES (1,'Incisor'),(2,'Canino'),(3,'Premolar'),(4,'Molar');
UNLOCK TABLES;
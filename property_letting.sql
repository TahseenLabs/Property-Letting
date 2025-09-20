-- MySQL dump 10.13  Distrib 9.3.0, for macos14.7 (arm64)
--
-- Host: localhost    Database: property_letting
-- ------------------------------------------------------
-- Server version	9.3.0

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
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `application_id` int NOT NULL AUTO_INCREMENT,
  `tenant_id` int DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  PRIMARY KEY (`application_id`),
  KEY `tenant_id` (`tenant_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (4,14,3,'pending'),(5,15,12,'pending'),(6,16,13,'approved'),(7,17,14,'approved'),(8,18,15,'approved'),(9,19,16,'approved'),(10,20,17,'rejected'),(11,23,18,'rejected');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `property_id` int NOT NULL AUTO_INCREMENT,
  `landlord_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`property_id`),
  KEY `landlord_id` (`landlord_id`),
  CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`landlord_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (3,2,' Cozy Cottage with Garden','1 bed · 1 bath · Private garden space',850.00,'Galway, Ireland'),(12,12,'Modern Apartment in City Center','2 bed · 1 bath · Great view of the skyline',1200.00,'Dublin, Ireland'),(13,15,'Spacious 3-Bedroom Penthouse','3 bed · 2 bath · Rooftop access included',2000.00,'Cork, Ireland'),(14,17,'Quiet Suburban Family Home','4 bed · 3 bath · Large backyard and garage',1800.00,'Limerick, Ireland'),(15,19,'Budget Studio Apartment','Studio · 1 bath · Compact and affordable',650.00,' Waterford, Ireland'),(16,NULL,'Duplex Near Riverwalk','2 bed · 1.5 bath · Modern interiors, pet-friendly',1100.00,'Athlone, Ireland'),(17,13,'Stylish Loft in Tech Hub','1 bed · 1 bath · Close to coworking spaces and cafes',1300.00,'Dublin Docklands, Ireland'),(18,11,'Countryside Retreat','3 bed · 2 bath · Scenic views, peaceful area',950.00,'Killarney, Ireland');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('landlord','tenant','admin') NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'testuser','testpass','tenant'),(2,'123','123','landlord'),(4,'12345','12345','landlord'),(5,'12','12','tenant'),(6,'aaa','aaa','landlord'),(7,'Apple','Apple','landlord'),(8,'New','New','landlord'),(10,'adminuser','adminpass','admin'),(11,'TestingFinal','123456','landlord'),(12,'Tahseen','Tahseen','landlord'),(13,'tahseen.ahmad','password123','landlord'),(14,'ali.khan','securepass456','tenant'),(15,'sara.khan','mypassword789','landlord'),(16,'nina.singh','strongpassword234','tenant'),(17,'john.doe','johndoe123','landlord'),(18,'emma.jones','emmapass567','tenant'),(19,'michael.smith','michael1234','landlord'),(20,'ravi.sharma','ravi4567','tenant'),(23,'Sofia','Sofia123','tenant'),(24,'Henry','Henry123','tenant'),(25,'Ricky','Ricky123','tenant');
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

-- Dump completed on 2025-05-14 16:09:08

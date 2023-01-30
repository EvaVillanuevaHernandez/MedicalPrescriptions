CREATE DATABASE  IF NOT EXISTS `medicalprescriptions` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `medicalprescriptions`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: medicalprescriptions
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `collegiate_num` varchar(255) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `second_surname` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK11wrxiolc8qa2e64s32xc2yy4` (`user_id`),
  CONSTRAINT `FK11wrxiolc8qa2e64s32xc2yy4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,'65434099R','76789900W','Juan','Santana','HernΓ΅ndez',NULL),(2,'345678987','45354207W','Paca','Santana','SΓ΅nchez',NULL);
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dni` varchar(255) DEFAULT NULL,
  `history` varchar(255) DEFAULT NULL,
  `image` mediumblob,
  `name` varchar(255) DEFAULT NULL,
  `name_img` varchar(255) DEFAULT NULL,
  `second_surname` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `type_img` varchar(255) DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmer5utvy1hiff7ovs6f4bjtnw` (`doctor_id`),
  CONSTRAINT `FKmer5utvy1hiff7ovs6f4bjtnw` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'45354267Q','Alergia al polvo',NULL,'Yolanda',NULL,'Santana','Gonzalez',NULL,1),(2,'45354267Q','Alergia al polen',_binary 'x\Ϊ\λπs\η\ε’\βb``\ΰυτp	b``”²³8Ψ€d\ΗE\Υ3@±8\Θέ‰a\έ9™—@KΊ£―#\Γ\Ζ~\ξ?‰¬@>gGd1\ίaf<Ώ\"¨΅\Χ\Σ\Ε1¤\"\ξ\νΝ‚‡ώσ\ή\μ$ήv§)xMƒP\ΙΝΌC\αό¨\έχ΅c\Ο7\Ξ	’\nªF^)\rSN0hNdRb^\β\Β\ζ\Ρ\Ι3Ad	©\Χ\Ϋ\Ò\ίD–86gz{ΌBςd\Μ%,qeFρ:[f›w}g€όc¥½¥·<\ΞA\ΦυΈv\\]c\Ο}U…§»Xh\θΈDK\ίcώ/o\εφ²,¨t\Ζƒ§«\Λ:§„&\0[U΅','Marta','6b50ff5d-129d-4975-8ad7-6d9f687938c66b50ff5d-129d-4975-8ad7-6d9f687938c6.png','Diaz','Guerra','image/png',1),(3,'45354267Q','Alergia al polen',_binary 'x\Ϊ\λπs\η\ε’\βb``\ΰυτp	b``”²³8Ψ€d\ΗE\Υ3@±8\Θέ‰a\έ9™—@KΊ£―#\Γ\Ζ~\ξ?‰¬@>gGd1\ίaf<Ώ\"¨΅\Χ\Σ\Ε1¤\"\ξ\νΝ‚‡ώσ\ή\μ$ήv§)xMƒP\ΙΝΌC\αό¨\έχ΅c\Ο7\Ξ	’\nªF^)\rSN0hNdRb^\β\Β\ζ\Ρ\Ι3Ad	©\Χ\Ϋ\Ò\ίD–86gz{ΌBςd\Μ%,qeFρ:[f›w}g€όc¥½¥·<\ΞA\ΦυΈv\\]c\Ο}U…§»Xh\θΈDK\ίcώ/o\εφ²,¨t\Ζƒ§«\Λ:§„&\0[U΅','Juan','f9cba778-244b-46b7-b87c-51d040b3f2d2f9cba778-244b-46b7-b87c-51d040b3f2d2.png','Santana','Sanchez','image/png',1);
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `medicine` varchar(255) DEFAULT NULL,
  `posology` varchar(255) DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1ppr8greedyrey8nchpr0v4dn` (`doctor_id`),
  KEY `FKqrlh184tfvdi95erwl65p4xj3` (`patient_id`),
  CONSTRAINT `FK1ppr8greedyrey8nchpr0v4dn` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`),
  CONSTRAINT `FKqrlh184tfvdi95erwl65p4xj3` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription`
--

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
INSERT INTO `prescription` VALUES (1,'2022-08-12 00:00:00','Paracetamol','1-0-1',1,1),(2,'2022-08-12 00:00:00','Ebastel','1-0-1',1,2),(3,'2022-08-12 00:00:00','Ibuprofeno','1-0-1',1,3);
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_USERS'),(2,'ROLE_ADMIN');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKrhfovtciq1l558cw6udg0h0d3` (`role_id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKrhfovtciq1l558cw6udg0h0d3` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,2);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(120) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@admin.com','$2a$10$xWJ45pJf09VEqN/y2xmuPO.UJu.YjSu.b74cOnkQ0whf/Rhjq16l2','admin');
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

-- Dump completed on 2023-01-30 16:35:34

-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: mint
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hashtags`
--

DROP TABLE IF EXISTS `hashtags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hashtags` (
  `hashtag_id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) unsigned NOT NULL,
  `hashtag` varchar(200) NOT NULL,
  PRIMARY KEY (`hashtag_id`),
  KEY `post_id_idx` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtags`
--

LOCK TABLES `hashtags` WRITE;
/*!40000 ALTER TABLE `hashtags` DISABLE KEYS */;
INSERT INTO `hashtags` VALUES (1,1,'дороу'),(8,1,'я'),(9,1,'тут'),(10,1,'фантазия'),(11,4,'вид?'),(12,5,'смерть?'),(13,7,'красота'),(14,7,'бег'),(15,8,'сон'),(16,8,'сон'),(17,8,'я'),(18,9,'ты'),(19,9,'сижу'),(20,10,'пожалуйтса');
/*!40000 ALTER TABLE `hashtags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `postID` int(11) NOT NULL,
  PRIMARY KEY (`like_id`),
  UNIQUE KEY `like_id_UNIQUE` (`like_id`),
  KEY `user_id_idx` (`userID`),
  KEY `postID_idx` (`postID`),
  CONSTRAINT `postID` FOREIGN KEY (`postID`) REFERENCES `photo_post` (`post_id`),
  CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `photo_post` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,1,8),(2,1,9),(3,1,3),(4,1,5),(5,4,6),(6,5,1),(7,7,3),(8,7,5),(9,8,6),(10,8,7),(11,8,8),(12,9,8),(13,9,10),(14,10,10);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo_post`
--

DROP TABLE IF EXISTS `photo_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `photo_post` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` varchar(200) NOT NULL,
  `CREATION_DATE` datetime NOT NULL,
  `PHOTO_LINK` varchar(2000) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id_UNIQUE` (`post_id`),
  KEY `user_id_idx` (`USER_ID`),
  CONSTRAINT `user_id` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_post`
--

LOCK TABLES `photo_post` WRITE;
/*!40000 ALTER TABLE `photo_post` DISABLE KEYS */;
INSERT INTO `photo_post` VALUES (1,'Cat','2007-10-23 11:46:31','D:games',1),(3,'cat2','2019-05-01 00:00:00','D:games',1),(5,'hi hello','2019-05-09 00:00:00','D:prog',5),(6,'casdfgdfgt2dfgsdfgjmbdsf,jgbdsfmngvbjhsdgtrleuwtgerjhtgrdshfmsdvsd,jhtgrewjkltghtgerjhtge','2019-05-01 00:00:00','D:photo7',4),(7,'sag','2018-10-23 00:00:00','D:games',7),(8,'cacvbcvbt2','2018-10-23 00:00:00','D:photo2',8),(9,'hello','2018-10-23 00:00:00','D:photo1',9),(10,'hello it\'s me','2019-05-01 00:00:00','D:games',10),(11,'sdgfre','2019-05-09 00:00:00','D:img5',11),(12,'bvnvbn','2018-10-23 00:00:00','D:img1',6),(13,'jgbdsfmngvbjhsdgtrleuwtgerjhtgrdshfmsdvsdqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq','2019-05-09 00:00:00','D:photo12',4),(14,'sdfxc','2018-10-23 00:00:00','D:photo',5),(15,'bfghu','2018-05-19 00:00:00','D:img',10),(16,'werewrt','2018-10-23 00:00:00','D:img1',11),(17,'324','2018-05-19 00:00:00','D:img10',10),(18,'deshfsdfuhweqi','2019-05-20 21:57:40','D:YP',10);
/*!40000 ALTER TABLE `photo_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `name` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('Alex',6),('AlisaVa',12),('Cat',4),('Dosd',11),('Julia',1),('Julia12',9),('Julia1234235',8),('Liosha',7),('Masya',10),('Petrr',5),('YP12',13);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-20 22:04:40

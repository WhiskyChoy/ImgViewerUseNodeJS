-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: homeworkweb
-- ------------------------------------------------------
-- Server version	8.0.2-dmr-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `image_user`
--

DROP TABLE IF EXISTS `image_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `imagesrc` varchar(255) NOT NULL,
  `imagetitle` varchar(255) NOT NULL DEFAULT '无标题',
  `imagedate` varchar(255) NOT NULL,
  `visitnumber` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_user`
--

LOCK TABLES `image_user` WRITE;
/*!40000 ALTER TABLE `image_user` DISABLE KEYS */;
INSERT INTO `image_user` VALUES (7,6,'/user_images/161250002@smail.nju.edu.cn/161250002@smail.nju.edu.cn1542277710029.jpg','无标题','2018-11-15',0),(8,6,'/user_images/161250002@smail.nju.edu.cn/161250002@smail.nju.edu.cn1542277710058.jpg','浩瀚星空','2018-11-15',0),(9,6,'/user_images/161250002@smail.nju.edu.cn/161250002@smail.nju.edu.cn1542277710104.jpg','无标题','2018-11-15',0),(10,6,'/user_images/161250002@smail.nju.edu.cn/161250002@smail.nju.edu.cn1543885017405.jpg','无标题','2018-12-4',0),(11,6,'/user_images/161250002@smail.nju.edu.cn/161250002@smail.nju.edu.cn1543969845527.jpg','无标题','2018-12-5',0),(12,6,'/user_images/161250002@smail.nju.edu.cn/161250002@smail.nju.edu.cn1543969845611.jpg','无标题','2018-12-5',0),(13,6,'/user_images/161250002@smail.nju.edu.cn/161250002@smail.nju.edu.cn1543969845630.jpg','无标题','2018-12-5',0);
/*!40000 ALTER TABLE `image_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagname` varchar(255) NOT NULL,
  `tagnumber` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tagname_UNIQUE` (`tagname`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (11,'star',3),(12,'sky',2),(13,'人物',2),(14,'角色',1),(15,'星空',1);
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_image`
--

DROP TABLE IF EXISTS `tag_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imageid` int(11) NOT NULL,
  `tagid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `imageid_idx` (`imageid`),
  KEY `tagid_idx` (`tagid`),
  CONSTRAINT `imageid` FOREIGN KEY (`imageid`) REFERENCES `image_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tagid` FOREIGN KEY (`tagid`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_image`
--

LOCK TABLES `tag_image` WRITE;
/*!40000 ALTER TABLE `tag_image` DISABLE KEYS */;
INSERT INTO `tag_image` VALUES (24,7,11),(25,7,12),(26,8,11),(27,9,12),(28,10,11),(29,9,13),(30,9,14),(31,11,13),(32,7,15);
/*!40000 ALTER TABLE `tag_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'eyJhbGciOiJIUzI1NiJ9.MTYxMjUwMDAyQHNtYWlsLm5qdS5lZHUuY24.eC6rtqRjTLItWIrpB8EByRgQwgGboAF4-BKmEirv6dM','eyJhbGciOiJIUzI1NiJ9.MTIzNDU2.Rt_Ee_GUp5Lgyy_U-_N9brgm1pQghyk1PRK-vIUqCpE');
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

-- Dump completed on 2019-07-08 22:06:31

-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: Heros
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `heros`
--

DROP TABLE IF EXISTS `heros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `heros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(10) DEFAULT NULL,
  `avatar` varchar(45) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `skill` varchar(45) DEFAULT NULL,
  `proficiency` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `heros`
--

LOCK TABLES `heros` WRITE;
/*!40000 ALTER TABLE `heros` DISABLE KEYS */;
INSERT INTO `heros` VALUES (1,'鲁班大师','鲁班大师.jpg','辅助','下路','强力收纳',500),(2,'西施','西施.jpg','辅助','下路','心无旁骛',350),(3,'露娜','露娜.jpg','打野','野区','新月突击',6320),(4,'马超','马超.jpg','战士','野区/上路','万刃归鞘',1280),(5,'曜','曜.jpg','战士','野区/上路','归尘',680),(6,'云中君','云中君.jpg','刺客','野区','风雷引',1100),(7,'上官婉儿','上官婉儿.jpg','法师','中路','章草·横鳞',6800),(8,'干将莫邪','干将莫邪.jpg','法师','中路','剑来',5500),(9,'明世隐','明世隐.jpg','辅助','下路','泰卦·长生',2200),(10,'孙尚香','孙尚香.jpg','射手','下路','究极弩炮',3100),(11,'狄仁杰','狄仁杰.jpg','射手','下路','王朝密令',4200),(12,'周瑜','周瑜.jpg','法师','中路','烽火赤壁',6240),(13,'百里玄策','百里玄策.jpg','刺客','野区','瞬镰闪',2560),(14,'猪八戒','猪八戒.jpg','坦克','上路','圈养时刻',990),(15,'亚瑟','亚瑟.jpg','战士','上路','圣剑裁决',5840),(16,'程咬金','程咬金.jpg','坦克','上路','正义潜能',3280),(17,'关羽','关羽.jpg','战士','上路','刀锋铁骑',3960),(18,'武则天','武则天.jpg','法师','中路','生杀予夺',2690),(19,'宫本武藏','宫本武藏.jpg','战士','野区/上路','二天一流',1540),(20,'李白','李白.jpg','刺客','野区','青莲剑歌',5785),(21,'娜可露露','娜可露露.jpg','刺客','野区','飞鹰急袭',6345),(22,'花木兰','花木兰.jpg','战士','上路','绽放刀锋',4835),(23,'姜子牙','姜子牙.jpg','辅助','下路','断罪',865),(24,'牛魔','牛魔.jpg','辅助','下路','山崩地裂',1385),(25,'张飞','张飞.jpg','坦克','下路','狂兽血性',1655),(26,'貂蝉','貂蝉.jpg','法师','中路','绽·风华',4550),(27,'王昭君','王昭君.jpg','法师','中路','凛冬已至',5920),(28,'孙悟空','孙悟空.jpg','刺客','野区','如意金箍',6650),(29,'后羿','后羿.jpg','射手','下路','灼日之矢',6125),(30,'鬼谷子','鬼谷子.jpg','辅助','下路','先知·雾隐',2620);
/*!40000 ALTER TABLE `heros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin','123','undefined','undefined'),('lihy','123','lihy_online@163.com','17398888669');
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

-- Dump completed on 2019-12-06  0:40:13

/*
Navicat MySQL Data Transfer

Source Server         : 192.168.1.1 DB Connection
Source Server Version : 50532
Source Host           : 192.168.1.1:3306
Source Database       : afcash_db

Target Server Type    : MYSQL
Target Server Version : 50532
File Encoding         : 65001

Date: 2018-11-21 20:37:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_groups
-- ----------------------------
DROP TABLE IF EXISTS `admin_groups`;
CREATE TABLE `admin_groups` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_groups
-- ----------------------------
INSERT INTO `admin_groups` VALUES ('1', 'webmaster', 'webmaster');

-- ----------------------------
-- Table structure for admin_users
-- ----------------------------
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(15) DEFAULT NULL,
  `login_name` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `activation_code` varchar(40) DEFAULT NULL,
  `forgotten_password_code` varchar(40) DEFAULT NULL,
  `forgotten_password_time` int(11) unsigned DEFAULT NULL,
  `remember_code` varchar(40) DEFAULT NULL,
  `created_on` int(11) unsigned DEFAULT NULL,
  `last_login` int(11) unsigned DEFAULT NULL,
  `active` tinyint(1) unsigned DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_users
-- ----------------------------
INSERT INTO `admin_users` VALUES ('1', '127.0.0.1', 'webmaster', 'webmaster@gmail.com', '$2y$07$TI.WmgpkXBB8XGHXgQrlj.YEBsIqJS1imU/YMO72Mn2jqOZOh0gFu', null, null, null, null, '/74YaLgeodJKSVwyL66Cwu', '1451900190', '1535144279', '1', 'webmaster', '', null);

-- ----------------------------
-- Table structure for admin_users_groups
-- ----------------------------
DROP TABLE IF EXISTS `admin_users_groups`;
CREATE TABLE `admin_users_groups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) unsigned DEFAULT NULL,
  `group_id` mediumint(8) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_users_groups
-- ----------------------------
INSERT INTO `admin_users_groups` VALUES ('1', '1', '1');

-- ----------------------------
-- Table structure for carts
-- ----------------------------
DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `product_id` int(11) unsigned DEFAULT NULL,
  `quantity` int(11) unsigned DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  `created_at` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of carts
-- ----------------------------
INSERT INTO `carts` VALUES ('1', '2', '41', '1', '700.00', '1542197334');

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `parent_id` int(11) unsigned DEFAULT NULL,
  `thumb_image_path` varchar(255) DEFAULT NULL,
  `created_on` bigint(50) unsigned DEFAULT NULL,
  `has_sub_category` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('1', 'Motors', 'Motors', '', '0', 'http://192.168.1.1/categories/cat_motor.jpg', '1451905011', '1');
INSERT INTO `categories` VALUES ('2', 'Fashion', 'Fashion', '', '0', 'http://192.168.1.1/categories/cat_fashion.jpeg', '1451905011', '1');
INSERT INTO `categories` VALUES ('3', 'Electronics', 'Electronics', '', '0', '', '1451905011', '0');
INSERT INTO `categories` VALUES ('4', 'Collectibles & Art', 'Collectibles & Art', '', '0', '', '1451905011', '0');
INSERT INTO `categories` VALUES ('5', 'Home & Garden', 'Home & Garden', '', '0', '', '1451905011', '0');
INSERT INTO `categories` VALUES ('6', 'Sporting Goods', 'Sporting Goods', '', '0', '', '1451905011', '0');
INSERT INTO `categories` VALUES ('7', 'Toys & Hobbies', 'Toys & Hobbies', '', '0', '', '1451905011', '0');
INSERT INTO `categories` VALUES ('8', 'Business & Industrial', 'Business & Industrial', '', '0', '', '1451905011', '0');
INSERT INTO `categories` VALUES ('9', 'Music', 'Music', '', '0', '', '1451905011', '0');
INSERT INTO `categories` VALUES ('10', 'Parts & Accessories', 'Parts & Accessories', '', '1', '', '1451905011', '0');
INSERT INTO `categories` VALUES ('11', 'Vehicles', 'Vehicles', '', '1', '', '1451905011', '0');
INSERT INTO `categories` VALUES ('12', 'WOMEN', 'WOMEN', '', '2', '', '1451905011', '1');
INSERT INTO `categories` VALUES ('13', 'MEN', 'MEN', '', '2', '', '1451905011', '1');
INSERT INTO `categories` VALUES ('14', 'KIDS', 'KIDS', null, '2', null, '1451905011', '1');
INSERT INTO `categories` VALUES ('15', 'ACCESSORIES', 'ACCESSORIES', null, '2', null, '1451905011', '1');
INSERT INTO `categories` VALUES ('16', 'Dresses & Skirts', 'Dresses & Skirts', null, '12', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('17', 'Jackets', 'Jackets', null, '12', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('18', 'Tops & Blouses', 'Tops & Blouses', null, '12', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('19', 'Shoes & Boots', 'Shoes & Boots', null, '12', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('20', 'Knitwear', 'Knitwear', null, '12', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('21', 'T-shirts & Polos', 'T-shirts & Polos', null, '13', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('22', 'Shoes & Boots', 'Shoes & Boots', null, '13', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('23', 'Jeans', 'Jeans', null, '13', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('24', 'Coats', 'Coats', null, '13', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('25', 'Top', 'Top', null, '14', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('26', 'Pants & Shorts', 'Pants & Shorts', null, '14', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('27', 'Dresses', 'Dresses', null, '14', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('28', 'Skirts', 'Skirts', null, '14', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('29', 'Set & Body', 'Set & Body', null, '14', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('30', 'Watches', 'Watches', null, '15', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('31', 'Bags & Wallet', 'Bags & Wallet', null, '15', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('32', 'Sunglasses', 'Sunglasses', null, '15', null, '1451905011', '0');
INSERT INTO `categories` VALUES ('33', 'Belts & Hats', 'Belts & Hats', null, '15', null, '1451905011', '0');

-- ----------------------------
-- Table structure for chat_histories
-- ----------------------------
DROP TABLE IF EXISTS `chat_histories`;
CREATE TABLE `chat_histories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) unsigned DEFAULT NULL,
  `receiver_id` int(11) unsigned DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `created_at` bigint(50) unsigned DEFAULT NULL,
  `is_read` tinyint(1) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chat_histories
-- ----------------------------
INSERT INTO `chat_histories` VALUES ('1', '7', '1', 'hello', '1540802397', '0');
INSERT INTO `chat_histories` VALUES ('2', '1', '7', 'oh hi', '1540802407', '0');

-- ----------------------------
-- Table structure for colors
-- ----------------------------
DROP TABLE IF EXISTS `colors`;
CREATE TABLE `colors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `value` varchar(50) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of colors
-- ----------------------------
INSERT INTO `colors` VALUES ('1', 'Red', '#FF0000');
INSERT INTO `colors` VALUES ('2', 'Green', '#00FF00');
INSERT INTO `colors` VALUES ('3', 'Blue', '#0000FF');
INSERT INTO `colors` VALUES ('4', 'Yellow', '#FFFF00');
INSERT INTO `colors` VALUES ('5', 'Black', '#000000');

-- ----------------------------
-- Table structure for compares
-- ----------------------------
DROP TABLE IF EXISTS `compares`;
CREATE TABLE `compares` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `product_id` int(11) unsigned DEFAULT NULL,
  `created_at` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of compares
-- ----------------------------

-- ----------------------------
-- Table structure for connection_register
-- ----------------------------
DROP TABLE IF EXISTS `connection_register`;
CREATE TABLE `connection_register` (
  `user_id` int(11) DEFAULT NULL,
  `connection_time` datetime DEFAULT NULL,
  `ip_address` char(30) DEFAULT NULL,
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of connection_register
-- ----------------------------
INSERT INTO `connection_register` VALUES ('2', '2018-11-01 15:02:27', '192.168.1.111', '00000000001');
INSERT INTO `connection_register` VALUES ('2', '2018-11-01 17:23:04', '192.168.1.111', '00000000002');
INSERT INTO `connection_register` VALUES ('7', '2018-11-01 17:24:30', '192.168.1.111', '00000000003');
INSERT INTO `connection_register` VALUES ('1', '2018-11-01 18:01:47', '192.168.1.123', '00000000004');
INSERT INTO `connection_register` VALUES ('1', '2018-11-01 18:02:16', '192.168.1.123', '00000000005');
INSERT INTO `connection_register` VALUES ('2', '2018-11-02 09:18:01', '192.168.1.123', '00000000006');
INSERT INTO `connection_register` VALUES ('2', '2018-11-02 12:28:49', '192.168.1.123', '00000000007');
INSERT INTO `connection_register` VALUES ('1', '2018-11-02 12:29:29', '192.168.1.123', '00000000008');
INSERT INTO `connection_register` VALUES ('1', '2018-11-02 12:30:46', '192.168.1.123', '00000000009');
INSERT INTO `connection_register` VALUES ('1', '2018-11-02 12:33:32', '192.168.1.123', '00000000010');
INSERT INTO `connection_register` VALUES ('1', '2018-11-02 12:50:56', '192.168.1.123', '00000000011');
INSERT INTO `connection_register` VALUES ('1', '2018-11-02 16:49:38', '192.168.1.123', '00000000012');
INSERT INTO `connection_register` VALUES ('2', '2018-11-02 18:34:55', '127.0.0.1', '00000000013');
INSERT INTO `connection_register` VALUES ('1', '2018-11-03 11:07:57', '127.0.0.1', '00000000014');
INSERT INTO `connection_register` VALUES ('2', '2018-11-03 11:22:02', '127.0.0.1', '00000000015');
INSERT INTO `connection_register` VALUES ('1', '2018-11-03 11:22:52', '127.0.0.1', '00000000016');
INSERT INTO `connection_register` VALUES ('1', '2018-11-03 18:18:35', '127.0.0.1', '00000000017');
INSERT INTO `connection_register` VALUES ('1', '2018-11-03 18:31:30', '127.0.0.1', '00000000018');
INSERT INTO `connection_register` VALUES ('1', '2018-11-03 18:42:43', '127.0.0.1', '00000000019');
INSERT INTO `connection_register` VALUES ('7', '2018-11-04 11:20:14', '127.0.0.1', '00000000020');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 11:23:58', '127.0.0.1', '00000000021');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 11:35:48', '127.0.0.1', '00000000022');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 11:37:10', '127.0.0.1', '00000000023');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 11:38:19', '127.0.0.1', '00000000024');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 11:39:39', '127.0.0.1', '00000000025');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 11:39:51', '127.0.0.1', '00000000026');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 11:40:34', '127.0.0.1', '00000000027');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 11:46:16', '127.0.0.1', '00000000028');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 11:49:45', '127.0.0.1', '00000000029');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 11:53:40', '127.0.0.1', '00000000030');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 11:59:13', '127.0.0.1', '00000000031');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 12:04:05', '127.0.0.1', '00000000032');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 12:14:46', '127.0.0.1', '00000000033');
INSERT INTO `connection_register` VALUES ('7', '2018-11-04 12:20:52', '127.0.0.1', '00000000034');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 12:22:47', '127.0.0.1', '00000000035');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 12:25:22', '127.0.0.1', '00000000036');
INSERT INTO `connection_register` VALUES ('7', '2018-11-04 12:25:42', '127.0.0.1', '00000000037');
INSERT INTO `connection_register` VALUES ('7', '2018-11-04 12:27:03', '127.0.0.1', '00000000038');
INSERT INTO `connection_register` VALUES ('7', '2018-11-04 12:27:41', '127.0.0.1', '00000000039');
INSERT INTO `connection_register` VALUES ('7', '2018-11-04 12:40:46', '127.0.0.1', '00000000040');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 12:41:30', '127.0.0.1', '00000000041');
INSERT INTO `connection_register` VALUES ('7', '2018-11-04 12:43:18', '127.0.0.1', '00000000042');
INSERT INTO `connection_register` VALUES ('7', '2018-11-04 12:49:48', '127.0.0.1', '00000000043');
INSERT INTO `connection_register` VALUES ('7', '2018-11-04 12:50:51', '127.0.0.1', '00000000044');
INSERT INTO `connection_register` VALUES ('7', '2018-11-04 12:52:42', '127.0.0.1', '00000000045');
INSERT INTO `connection_register` VALUES ('7', '2018-11-04 12:55:55', '127.0.0.1', '00000000046');
INSERT INTO `connection_register` VALUES ('7', '2018-11-04 12:57:53', '127.0.0.1', '00000000047');
INSERT INTO `connection_register` VALUES ('7', '2018-11-04 13:29:30', '127.0.0.1', '00000000048');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 13:30:46', '127.0.0.1', '00000000049');
INSERT INTO `connection_register` VALUES ('7', '2018-11-04 13:31:26', '127.0.0.1', '00000000050');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 13:35:53', '127.0.0.1', '00000000051');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 13:44:35', '127.0.0.1', '00000000052');
INSERT INTO `connection_register` VALUES ('1', '2018-11-04 13:47:57', '127.0.0.1', '00000000053');
INSERT INTO `connection_register` VALUES ('1', '2018-11-05 11:50:48', '192.168.1.111', '00000000054');
INSERT INTO `connection_register` VALUES ('7', '2018-11-05 11:51:28', '192.168.1.111', '00000000055');
INSERT INTO `connection_register` VALUES ('1', '2018-11-05 13:36:21', '192.168.1.111', '00000000056');
INSERT INTO `connection_register` VALUES ('7', '2018-11-05 15:02:07', '192.168.1.111', '00000000057');
INSERT INTO `connection_register` VALUES ('17', '2018-11-06 18:31:51', '127.0.0.1', '00000000058');
INSERT INTO `connection_register` VALUES ('17', '2018-11-06 18:59:38', '127.0.0.1', '00000000059');
INSERT INTO `connection_register` VALUES ('17', '2018-11-06 20:03:31', '127.0.0.1', '00000000060');
INSERT INTO `connection_register` VALUES ('17', '2018-11-06 21:49:51', '127.0.0.1', '00000000061');
INSERT INTO `connection_register` VALUES ('17', '2018-11-07 01:04:02', '127.0.0.1', '00000000062');
INSERT INTO `connection_register` VALUES ('17', '2018-11-08 11:52:31', '183.182.113.132', '00000000063');
INSERT INTO `connection_register` VALUES ('31', '2018-11-09 02:30:35', '120.29.72.11', '00000000064');
INSERT INTO `connection_register` VALUES ('2', '2018-11-09 12:33:51', '134.249.191.31', '00000000065');
INSERT INTO `connection_register` VALUES ('17', '2018-11-10 01:16:01', '183.182.113.132', '00000000066');
INSERT INTO `connection_register` VALUES ('17', '2018-11-10 06:51:00', '183.182.113.132', '00000000067');
INSERT INTO `connection_register` VALUES ('17', '2018-11-11 05:04:24', '183.182.110.157', '00000000068');
INSERT INTO `connection_register` VALUES ('17', '2018-11-12 17:16:43', '183.182.111.163', '00000000069');
INSERT INTO `connection_register` VALUES ('17', '2018-11-12 20:50:06', '183.182.111.163', '00000000070');
INSERT INTO `connection_register` VALUES ('33', '2018-11-13 04:22:24', '120.29.72.11', '00000000071');
INSERT INTO `connection_register` VALUES ('2', '2018-11-14 12:08:05', '134.249.191.31', '00000000072');
INSERT INTO `connection_register` VALUES ('1', '2018-11-15 16:13:43', '192.168.1.1', '00000000073');
INSERT INTO `connection_register` VALUES ('17', '2018-11-15 16:25:44', '192.168.1.1', '00000000074');
INSERT INTO `connection_register` VALUES ('1', '2018-11-15 16:35:31', '192.168.1.1', '00000000075');
INSERT INTO `connection_register` VALUES ('1', '2018-11-15 16:58:51', '192.168.1.1', '00000000076');
INSERT INTO `connection_register` VALUES ('17', '2018-11-15 18:02:51', '192.168.1.1', '00000000077');
INSERT INTO `connection_register` VALUES ('7', '2018-11-15 18:51:16', '192.168.1.123', '00000000078');
INSERT INTO `connection_register` VALUES ('7', '2018-11-15 18:52:18', '192.168.1.123', '00000000079');
INSERT INTO `connection_register` VALUES ('2', '2018-11-15 19:07:33', '127.0.0.1', '00000000080');
INSERT INTO `connection_register` VALUES ('2', '2018-11-15 19:25:40', '127.0.0.1', '00000000081');
INSERT INTO `connection_register` VALUES ('17', '2018-11-15 19:35:05', '192.168.1.1', '00000000082');
INSERT INTO `connection_register` VALUES ('2', '2018-11-15 19:57:43', '192.168.1.123', '00000000083');
INSERT INTO `connection_register` VALUES ('1', '2018-11-15 20:02:57', '192.168.1.1', '00000000084');
INSERT INTO `connection_register` VALUES ('7', '2018-11-15 20:14:11', '192.168.1.123', '00000000085');
INSERT INTO `connection_register` VALUES ('1', '2018-11-15 20:15:19', '192.168.1.1', '00000000086');
INSERT INTO `connection_register` VALUES ('2', '2018-11-15 20:16:57', '192.168.1.123', '00000000087');
INSERT INTO `connection_register` VALUES ('7', '2018-11-15 20:57:37', '192.168.1.123', '00000000088');
INSERT INTO `connection_register` VALUES ('2', '2018-11-15 20:58:16', '192.168.1.123', '00000000089');
INSERT INTO `connection_register` VALUES ('1', '2018-11-15 21:09:35', '127.0.0.1', '00000000090');
INSERT INTO `connection_register` VALUES ('2', '2018-11-15 21:09:44', '127.0.0.1', '00000000091');
INSERT INTO `connection_register` VALUES ('1', '2018-11-16 11:13:08', '127.0.0.1', '00000000092');
INSERT INTO `connection_register` VALUES ('1', '2018-11-16 12:07:36', '127.0.0.1', '00000000093');
INSERT INTO `connection_register` VALUES ('1', '2018-11-16 12:13:06', '127.0.0.1', '00000000094');
INSERT INTO `connection_register` VALUES ('1', '2018-11-16 12:18:54', '127.0.0.1', '00000000095');
INSERT INTO `connection_register` VALUES ('1', '2018-11-16 12:25:49', '127.0.0.1', '00000000096');
INSERT INTO `connection_register` VALUES ('1', '2018-11-16 12:27:55', '127.0.0.1', '00000000097');
INSERT INTO `connection_register` VALUES ('1', '2018-11-16 15:04:07', '127.0.0.1', '00000000098');
INSERT INTO `connection_register` VALUES ('17', '2018-11-16 15:45:13', '127.0.0.1', '00000000099');
INSERT INTO `connection_register` VALUES ('1', '2018-11-16 15:45:29', '127.0.0.1', '00000000100');
INSERT INTO `connection_register` VALUES ('2', '2018-11-16 15:46:22', '127.0.0.1', '00000000101');
INSERT INTO `connection_register` VALUES ('1', '2018-11-17 13:36:29', '127.0.0.1', '00000000102');
INSERT INTO `connection_register` VALUES ('2', '2018-11-17 13:38:17', '127.0.0.1', '00000000103');
INSERT INTO `connection_register` VALUES ('2', '2018-11-17 16:05:31', '127.0.0.1', '00000000104');
INSERT INTO `connection_register` VALUES ('1', '2018-11-17 16:13:17', '127.0.0.1', '00000000105');
INSERT INTO `connection_register` VALUES ('2', '2018-11-17 16:13:35', '127.0.0.1', '00000000106');
INSERT INTO `connection_register` VALUES ('2', '2018-11-17 17:40:46', '127.0.0.1', '00000000107');
INSERT INTO `connection_register` VALUES ('2', '2018-11-19 08:51:19', '127.0.0.1', '00000000108');
INSERT INTO `connection_register` VALUES ('7', '2018-11-19 09:26:00', '127.0.0.1', '00000000109');
INSERT INTO `connection_register` VALUES ('2', '2018-11-19 09:59:06', '127.0.0.1', '00000000110');
INSERT INTO `connection_register` VALUES ('1', '2018-11-19 12:02:18', '127.0.0.1', '00000000111');
INSERT INTO `connection_register` VALUES ('2', '2018-11-19 12:35:39', '127.0.0.1', '00000000112');
INSERT INTO `connection_register` VALUES ('2', '2018-11-19 12:36:16', '127.0.0.1', '00000000113');
INSERT INTO `connection_register` VALUES ('1', '2018-11-19 12:48:40', '127.0.0.1', '00000000114');
INSERT INTO `connection_register` VALUES ('2', '2018-11-19 12:58:58', '127.0.0.1', '00000000115');
INSERT INTO `connection_register` VALUES ('2', '2018-11-19 13:47:26', '127.0.0.1', '00000000116');
INSERT INTO `connection_register` VALUES ('1', '2018-11-19 14:58:04', '127.0.0.1', '00000000117');
INSERT INTO `connection_register` VALUES ('2', '2018-11-19 16:54:16', '127.0.0.1', '00000000118');
INSERT INTO `connection_register` VALUES ('2', '2018-11-19 19:13:49', '127.0.0.1', '00000000119');
INSERT INTO `connection_register` VALUES ('7', '2018-11-20 08:47:45', '127.0.0.1', '00000000120');
INSERT INTO `connection_register` VALUES ('2', '2018-11-20 08:56:34', '127.0.0.1', '00000000121');
INSERT INTO `connection_register` VALUES ('1', '2018-11-20 11:02:48', '127.0.0.1', '00000000122');
INSERT INTO `connection_register` VALUES ('1', '2018-11-20 11:03:59', '127.0.0.1', '00000000123');
INSERT INTO `connection_register` VALUES ('2', '2018-11-20 11:19:05', '127.0.0.1', '00000000124');
INSERT INTO `connection_register` VALUES ('34', '2018-11-20 11:22:40', '127.0.0.1', '00000000125');
INSERT INTO `connection_register` VALUES ('34', '2018-11-20 12:03:24', '127.0.0.1', '00000000126');
INSERT INTO `connection_register` VALUES ('37', '2018-11-20 12:46:01', '127.0.0.1', '00000000127');
INSERT INTO `connection_register` VALUES ('2', '2018-11-20 16:39:38', '127.0.0.1', '00000000128');
INSERT INTO `connection_register` VALUES ('2', '2018-11-21 09:57:53', '127.0.0.1', '00000000129');

-- ----------------------------
-- Table structure for contacts
-- ----------------------------
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) unsigned DEFAULT NULL,
  `receiver_id` int(11) unsigned DEFAULT NULL,
  `created_at` bigint(50) unsigned DEFAULT NULL,
  `is_accept` tinyint(1) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of contacts
-- ----------------------------
INSERT INTO `contacts` VALUES ('1', '1', '2', '1540498192', '1');
INSERT INTO `contacts` VALUES ('3', '2', '11', '1540498251', '0');
INSERT INTO `contacts` VALUES ('4', '2', '12', '1540498265', '0');
INSERT INTO `contacts` VALUES ('5', '2', '13', '1540498276', '0');
INSERT INTO `contacts` VALUES ('6', '2', '14', '1540498283', '0');
INSERT INTO `contacts` VALUES ('7', '2', '16', '1540550989', '0');
INSERT INTO `contacts` VALUES ('8', '7', '1', '1540799809', '1');
INSERT INTO `contacts` VALUES ('21', '2', '7', '1540808063', '1');

-- ----------------------------
-- Table structure for currencies
-- ----------------------------
DROP TABLE IF EXISTS `currencies`;
CREATE TABLE `currencies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of currencies
-- ----------------------------
INSERT INTO `currencies` VALUES ('1', 'afcash');

-- ----------------------------
-- Table structure for domestic_shipping
-- ----------------------------
DROP TABLE IF EXISTS `domestic_shipping`;
CREATE TABLE `domestic_shipping` (
  `id` int(3) unsigned NOT NULL,
  `name` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of domestic_shipping
-- ----------------------------

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `type` tinyint(5) NOT NULL DEFAULT '0' COMMENT '1:seller, 2:buyer',
  `created_at` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of feedback
-- ----------------------------

-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of groups
-- ----------------------------
INSERT INTO `groups` VALUES ('1', 'buyer', 'Buyer');
INSERT INTO `groups` VALUES ('2', 'seller', 'Seller');

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sender_email` varchar(50) NOT NULL DEFAULT '0',
  `receiver_email` varchar(50) NOT NULL DEFAULT '0',
  `title` varchar(50) NOT NULL DEFAULT '',
  `content` text,
  `sendTime` datetime NOT NULL,
  `discount_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('35', 'buyer@gmail.com', 'seller@gmail.com', 'Discount Offer', 'buyer@gmail.com has sent discount offer to seller@gmail.com for product Motor2 with price 123', '2018-11-17 17:35:58', '51');
INSERT INTO `message` VALUES ('36', 'seller@gmail.com', 'buyer@gmail.com', 'Discount Offer Accepted', 'seller@gmail.com accepted your discount offer (price 123 for product Motor2).', '2018-11-17 17:36:22', '51');
INSERT INTO `message` VALUES ('37', 'buyer@gmail.com', 'seller@gmail.com', 'Discount Offer', 'buyer@gmail.com has sent discount offer to seller@gmail.com for product Motor2 with price 631', '2018-11-17 17:40:57', '52');
INSERT INTO `message` VALUES ('38', 'seller@gmail.com', 'buyer@gmail.com', 'Discount Offer Accepted', 'seller@gmail.com accepted your discount offer (price 631 for product Motor2).', '2018-11-17 17:41:13', '52');
INSERT INTO `message` VALUES ('39', 'buyer@gmail.com', 'seller@gmail.com', 'Discount Offer', 'buyer@gmail.com has sent discount offer to seller@gmail.com for product Motor2 with price 512', '2018-11-17 17:44:45', '53');
INSERT INTO `message` VALUES ('40', 'seller@gmail.com', 'buyer@gmail.com', 'Discount Offer Rejected', 'seller@gmail.com rejected your discount offer (price 512 for product Motor2).', '2018-11-17 17:45:02', '53');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `product_id` int(11) unsigned DEFAULT NULL,
  `quantity` int(11) unsigned DEFAULT NULL,
  `ordering_price` double(10,2) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `country` int(11) unsigned DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `zip_code` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `delivery_method` int(11) unsigned DEFAULT NULL,
  `ordered_at` int(11) unsigned DEFAULT NULL,
  `status` tinyint(1) unsigned DEFAULT NULL,
  `completed_at` int(11) DEFAULT NULL,
  `feedback` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('12', '1', '36', '1', '2000.00', 'aaaa', 'bbbb', 'cccccc', 'ddddd', 'ee@gmail.com', 'fdfdsf', '0', 'sdfdsf', 'ahfd', 'sdfsf', 'sdfsdf', '0', '1542598287', '5', null, '');
INSERT INTO `orders` VALUES ('13', '7', '34', '1', '7800.00', 'first name', 'last name', 'middle name', 'company ', 'michael@seo.com', '123', '0', 'city', 'province', '123', 'address', '0', '1542759764', '5', null, '');

-- ----------------------------
-- Table structure for order_discounts
-- ----------------------------
DROP TABLE IF EXISTS `order_discounts`;
CREATE TABLE `order_discounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) unsigned NOT NULL,
  `image` int(11) unsigned NOT NULL,
  `event_name` varchar(256) DEFAULT NULL,
  `start_date` int(11) DEFAULT NULL,
  `end_date` int(11) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_discounts
-- ----------------------------
INSERT INTO `order_discounts` VALUES ('3', '7', '1', 'sale event name', '1542758067', '1542812400', 'event description');
INSERT INTO `order_discounts` VALUES ('4', '8', '1', '123', '1542760002', '1542898800', 'description');
INSERT INTO `order_discounts` VALUES ('5', '9', '1', '', '1542737729', '0', '');
INSERT INTO `order_discounts` VALUES ('6', '10', '1', '', '1542738138', '0', '');
INSERT INTO `order_discounts` VALUES ('7', '11', '6', '', '1542738775', '0', '');

-- ----------------------------
-- Table structure for order_discount_images
-- ----------------------------
DROP TABLE IF EXISTS `order_discount_images`;
CREATE TABLE `order_discount_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `path` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_discount_images
-- ----------------------------
INSERT INTO `order_discount_images` VALUES ('1', 'http://192.168.1.123/events/default.png');
INSERT INTO `order_discount_images` VALUES ('2', 'http://192.168.1.123/events/wood_94_diffuse.jpg');
INSERT INTO `order_discount_images` VALUES ('3', 'http://192.168.1.123/events/Untitled.png');
INSERT INTO `order_discount_images` VALUES ('4', 'http://192.168.1.123/events/Pic (11).jpg');
INSERT INTO `order_discount_images` VALUES ('5', 'http://192.168.1.123/events/Pic (2).jpg');
INSERT INTO `order_discount_images` VALUES ('6', 'http://192.168.1.1/events/Pic (9).jpg');
INSERT INTO `order_discount_images` VALUES ('7', 'http://192.168.1.1/events/Pic (5).jpg');
INSERT INTO `order_discount_images` VALUES ('8', 'http://192.168.1.1/events/Pic (11).jpg');
INSERT INTO `order_discount_images` VALUES ('9', 'http://192.168.1.123/events/Untitled.png');
INSERT INTO `order_discount_images` VALUES ('10', 'http://192.168.1.123/events/wood_94_diffuse.jpg');
INSERT INTO `order_discount_images` VALUES ('11', 'http://192.168.1.123/events/wood_94_diffuse.jpg');
INSERT INTO `order_discount_images` VALUES ('12', 'http://192.168.1.123/events/wood_94_diffuse.jpg');
INSERT INTO `order_discount_images` VALUES ('13', 'http://192.168.1.123/events/wood_94_diffuse.jpg');
INSERT INTO `order_discount_images` VALUES ('14', 'http://192.168.1.1/promotions/saleEvent\\wood_94_diffuse.jpg');

-- ----------------------------
-- Table structure for order_discount_types
-- ----------------------------
DROP TABLE IF EXISTS `order_discount_types`;
CREATE TABLE `order_discount_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `discount_value` int(11) DEFAULT NULL,
  `event_value` int(11) DEFAULT NULL,
  `buy_number` int(11) DEFAULT NULL,
  `get_number` int(11) DEFAULT NULL,
  `discount_type` int(11) DEFAULT NULL,
  `message` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_discount_types
-- ----------------------------
INSERT INTO `order_discount_types` VALUES ('7', '5', '50', '1', '1', '1', 'Extra AFCASH 5 off AFCASH 50 +');
INSERT INTO `order_discount_types` VALUES ('8', '5', '50', '1', '1', '2', 'Extra 5 % off AFCASH 50 +');
INSERT INTO `order_discount_types` VALUES ('9', '5', '50', '1', '1', '1', 'Extra AFCASH 5 off AFCASH 50 +');
INSERT INTO `order_discount_types` VALUES ('10', '5', '50', '1', '1', '1', 'Extra AFCASH 5 off AFCASH 50 +');
INSERT INTO `order_discount_types` VALUES ('11', '5', '50', '1', '1', '1', 'Extra AFCASH 5 off AFCASH 50 +');

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `sub_title` varchar(255) DEFAULT NULL,
  `short_description` text,
  `condition_desc` text,
  `description` text,
  `additional_info` text,
  `selling_format` int(1) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `starting_price` double(10,2) DEFAULT NULL,
  `current_price` double(10,2) DEFAULT NULL,
  `reserve_price` double(10,2) DEFAULT NULL,
  `orig_quantity` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `sales_tax` double(10,2) DEFAULT NULL,
  `discount_price` double(10,2) DEFAULT NULL,
  `ratings_count` int(11) DEFAULT NULL,
  `ratings_value` int(11) DEFAULT NULL,
  `created_on` bigint(50) unsigned DEFAULT NULL,
  `created_by` int(11) unsigned DEFAULT NULL,
  `condition_id` int(11) NOT NULL DEFAULT '1',
  `package_type` int(1) DEFAULT NULL,
  `package_dimens_x` int(10) DEFAULT NULL,
  `package_dimens_y` int(10) DEFAULT NULL,
  `package_dimens_z` int(10) DEFAULT NULL,
  `weight_type` int(10) DEFAULT NULL,
  `weight_lbs` int(10) DEFAULT NULL,
  `weight_oz` int(10) DEFAULT NULL,
  `brands` varchar(100) DEFAULT NULL,
  `publish` int(1) DEFAULT '0',
  `material` varchar(50) DEFAULT '',
  `provenance` varchar(50) DEFAULT '',
  `shipping_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_users` (`created_by`),
  CONSTRAINT `FK_users` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('34', 'Exotic Car', 'Exotic Car-Title', 'Exotic Car-Sub Title', '', 'Exotic Car-Condition Description', 'Exotic Car-Item Description', '', '1', '3', '7600.00', '7800.00', '6000.00', '1', '1', '-1.00', null, '0', '0', '1542284053', '2', '1', '1', '-1', '-1', '-1', '2', '-1', '-1', 'assets/images/brands/adidas.png,assets/images/brands/air_jordan.png', '1', '', '', null);
INSERT INTO `products` VALUES ('35', 'Motor1', 'Motor1-Title', 'Motor1-SubTitle', '', 'Motor1-Condition Description', 'Motor1-Item Description', '', '2', '1', '0.00', '3000.00', '0.00', '3', '3', '-1.00', null, '0', '0', '1541564136', '2', '2', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/aloha.png', '0', '', '', null);
INSERT INTO `products` VALUES ('36', 'Motor2', 'Motor2-Title', 'Motor2-Sub Title', '', 'Motor2-Condition Description', 'Motor2-Item Description', '', '2', '1', '0.00', '2000.00', '0.00', '5', '5', '-1.00', null, '0', '0', '1541564119', '2', '3', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/easter.png', '1', '', '', null);
INSERT INTO `products` VALUES ('37', 'Fashion-Skirt', 'Fashion-Skirt-Title', 'Fashion-Skirt-Sub Tilte', '', 'Fashion-Skirt- condition description', 'Fashion-Skirt-Item description', '', '1', '4', '300.00', '12.00', '450.00', '1', '1', '-1.00', null, '0', '0', '1541570897', '2', '5', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/best.png,assets/images/brands/original.png,assets/images/brands/retro.png', '1', '', '', null);
INSERT INTO `products` VALUES ('38', 'Jewerly-Women', 'Jewerly-Women-Title', 'Jewerly-Women-Sub Title ', '', 'Jewerly-Women-Condition Description', 'Jewerly-Women-Item Description', '', '2', '-1', '0.00', '2000.00', '0.00', '3', '3', '-1.00', null, '0', '0', '1541571245', '2', '1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/dream.png,assets/images/brands/congrats.png', '1', '', '', null);
INSERT INTO `products` VALUES ('39', 'Women-top', 'Women-top-Title', 'Women-top-Sub-Tilte', '', 'Women-top-Condition Description', 'Women-top-Item Description', '', '2', '-1', '0.00', '400.00', '0.00', '7', '7', '-1.00', null, '0', '0', '1541571450', '2', '9', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/congrats.png', '1', '', '', null);
INSERT INTO `products` VALUES ('40', 'Women-Tshirts', 'Women-Tshirts-Title', 'Women-Tshirts-Sub title', '', 'Women-Tshirts-Condition Description', 'Women-Tshirts-Item Description', '', '1', '2', '250.00', '300.00', '350.00', '4', '4', '-1.00', null, '0', '0', '1541574733', '17', '12', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/original.png,assets/images/brands/retro.png', '1', '', '', null);
INSERT INTO `products` VALUES ('41', 'iphone-XXXX', 'iphone-XXXX', 'iphone-XXXX', '', 'iphone-XXXX', 'iphone-XXXX', '', '1', '3', '500.00', '700.00', '450.00', '1', '1', '-1.00', null, '0', '0', '1541575037', '17', '5', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/retro.png', '1', '', '', null);
INSERT INTO `products` VALUES ('42', 'Macbook-Pro', 'Macbook-Pro', 'Macbook-Pro', '', 'Macbook-Pro', 'Macbook-Pro', '', '2', '-1', '0.00', '800.00', '0.00', '4', '4', '-1.00', null, '0', '0', '1541575183', '17', '6', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/retro.png', '1', '', '', null);
INSERT INTO `products` VALUES ('43', 'Art-product', 'Art-product', 'Art-product', '', 'Art-product', 'Art-product', '', '2', '-1', '0.00', '453.00', '0.00', '5', '5', '-1.00', null, '0', '0', '1541575316', '17', '7', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/original.png', '1', '', '', null);
INSERT INTO `products` VALUES ('44', 'collectible', 'collectible', 'collectible', '', 'collectible', 'collectible', '', '1', '4', '1.00', '100.00', '76.00', '1', '1', '-1.00', null, '0', '0', '1541575455', '17', '8', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/dream.png', '1', '', '', null);
INSERT INTO `products` VALUES ('45', 'Garden-product', 'Garden-product', 'Garden-product', '', 'Garden-product', 'Garden-product', '', '2', '-1', '0.00', '132.00', '0.00', '14', '14', '-1.00', null, '0', '0', '1541575604', '17', '5', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/retro.png', '1', '', '', null);
INSERT INTO `products` VALUES ('46', 'Kitchen-knife', 'Kitchen-knife', 'Kitchen-knife', '', 'Kitchen-knife', 'Kitchen-knife', '', '1', '1', '10.00', '300.00', '242.00', '1', '1', '-1.00', null, '0', '0', '1541575728', '17', '2', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/dream.png', '1', '', '', null);
INSERT INTO `products` VALUES ('47', 'Fitness Item', 'Fitness Item', 'Fitness Item', '', 'Fitness Item', 'Fitness Item', '', '2', '-1', '0.00', '453.00', '0.00', '2', '2', '-1.00', null, '0', '0', '1541575884', '17', '6', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/congrats.png', '1', '', '', null);
INSERT INTO `products` VALUES ('48', 'Soccor Shoes', 'Soccor Shoes', 'Soccor Shoes', '', 'Soccor Shoes', 'Soccor Shoes', '', '2', '-1', '0.00', '212.00', '0.00', '4', '4', '-1.00', null, '0', '0', '1541576072', '17', '2', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/retro.png', '1', '', '', null);
INSERT INTO `products` VALUES ('49', 'Product Dolls', 'Product Dolls', 'Product Dolls', '', 'Product Dolls', 'Product Dolls', '', '2', '-1', '0.00', '123.00', '0.00', '3', '3', '-1.00', null, '0', '0', '1541576379', '17', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/original.png', '1', '', '', null);
INSERT INTO `products` VALUES ('50', 'holiday-toys', 'holiday-toys-l500.jpg', 'holiday-toys-l500.jpg', '', 'holiday-toys-l500.jpg', 'holiday-toys-l500.jpg', '', '2', '-1', '0.00', '222.00', '0.00', '6', '6', '2.00', null, '0', '0', '1541576534', '17', '6', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/original.png', '1', '', '', null);
INSERT INTO `products` VALUES ('51', 'GAT-Product', 'GAT-Product', 'GAT-Product', '', 'GAT-Product', 'GAT-Product', '', '2', '-1', '0.00', '11111.00', '0.00', '3', '3', '-1.00', null, '0', '0', '1541576804', '17', '6', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/dream.png', '1', '', '', null);
INSERT INTO `products` VALUES ('52', 'Seat-Cover', 'Seat-Cover', 'Seat-Cover', '', 'Seat-Cover', 'Seat-Cover', '', '2', '-1', '0.00', '132.00', '0.00', '4', '4', '-1.00', null, '0', '0', '1541576905', '17', '10', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/congrats.png', '1', '', '', null);
INSERT INTO `products` VALUES ('53', 'Guitar-Product', 'Guitar-Product', 'Guitar-Product', '', '`Guitar-Product', 'Guitar-Product', '', '2', '-1', '0.00', '233.00', '0.00', '6', '6', '-1.00', null, '0', '0', '1541577011', '17', '2', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/dream.png', '1', '', '', null);
INSERT INTO `products` VALUES ('54', 'Microphone', 'Microphone', 'Microphone', '', 'Microphone', 'Microphone', '', '2', '-1', '0.00', '332.00', '0.00', '67', '67', '2.00', null, '0', '0', '1541577125', '17', '6', '-1', '-1', '-1', '-1', '-1', '-1', '-1', 'assets/images/brands/retro.png', '0', '', '', null);
INSERT INTO `products` VALUES ('55', 'my name1', 'my title1', 'my subtitle', '', 'my condition description1', 'my item description', '', '2', '0', '100.00', '100.00', '0.00', '140', '140', '2.00', null, '0', '0', '1542275125', '7', '11', '1', '10', '10', '10', '1', '1', '1', 'assets/images/brands/calvin_klein.png,assets/images/brands/chanel.png,assets/images/brands/rolex.png', '1', 'material', 'provenance', '9');
INSERT INTO `products` VALUES ('56', 'Adidas Football Shoes - 100', 'Adidas Football Shoes - 100', 'Adidas Football Shoes - 100', '', 'Adidas Football Shoes - 100', 'Adidas Football Shoes - 100 is a fashion product.', '', '1', '3', '18.00', '18.00', '20.00', '29', '29', '2.00', null, '0', '0', '1542687254', '37', '1', '2', '3', '7', '7', '2', '7', '9', 'assets/images/brands/adidas.png,assets/images/brands/anthropology.png,assets/images/brands/rolex.png', '1', 'Adidas Football Shoes - 100 (Material)', 'Adidas Football Shoes - 100 (Provenance)', '10');

-- ----------------------------
-- Table structure for product_bids
-- ----------------------------
DROP TABLE IF EXISTS `product_bids`;
CREATE TABLE `product_bids` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buyer_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `bid_time` int(11) DEFAULT NULL,
  `bid_amount` int(10) DEFAULT '0',
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_bids
-- ----------------------------
INSERT INTO `product_bids` VALUES ('2', '1', '34', '1542446351', '7700');
INSERT INTO `product_bids` VALUES ('3', '1', '34', '1542446564', '7800');

-- ----------------------------
-- Table structure for product_cart
-- ----------------------------
DROP TABLE IF EXISTS `product_cart`;
CREATE TABLE `product_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL DEFAULT '0',
  `regdate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_cart
-- ----------------------------

-- ----------------------------
-- Table structure for product_cate_relations
-- ----------------------------
DROP TABLE IF EXISTS `product_cate_relations`;
CREATE TABLE `product_cate_relations` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_cate_relations
-- ----------------------------
INSERT INTO `product_cate_relations` VALUES ('35', '35', '1');
INSERT INTO `product_cate_relations` VALUES ('36', '36', '1');
INSERT INTO `product_cate_relations` VALUES ('37', '37', '2');
INSERT INTO `product_cate_relations` VALUES ('38', '38', '2');
INSERT INTO `product_cate_relations` VALUES ('39', '39', '2');
INSERT INTO `product_cate_relations` VALUES ('40', '40', '2');
INSERT INTO `product_cate_relations` VALUES ('41', '41', '3');
INSERT INTO `product_cate_relations` VALUES ('42', '42', '3');
INSERT INTO `product_cate_relations` VALUES ('43', '43', '4');
INSERT INTO `product_cate_relations` VALUES ('44', '44', '4');
INSERT INTO `product_cate_relations` VALUES ('45', '45', '5');
INSERT INTO `product_cate_relations` VALUES ('46', '46', '5');
INSERT INTO `product_cate_relations` VALUES ('47', '47', '6');
INSERT INTO `product_cate_relations` VALUES ('48', '48', '6');
INSERT INTO `product_cate_relations` VALUES ('49', '49', '7');
INSERT INTO `product_cate_relations` VALUES ('50', '50', '7');
INSERT INTO `product_cate_relations` VALUES ('51', '51', '8');
INSERT INTO `product_cate_relations` VALUES ('52', '52', '8');
INSERT INTO `product_cate_relations` VALUES ('53', '53', '9');
INSERT INTO `product_cate_relations` VALUES ('54', '54', '9');
INSERT INTO `product_cate_relations` VALUES ('72', '55', '6');
INSERT INTO `product_cate_relations` VALUES ('73', '34', '1');
INSERT INTO `product_cate_relations` VALUES ('75', '56', '0');

-- ----------------------------
-- Table structure for product_color_relations
-- ----------------------------
DROP TABLE IF EXISTS `product_color_relations`;
CREATE TABLE `product_color_relations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `color_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_color_relations
-- ----------------------------
INSERT INTO `product_color_relations` VALUES ('19', '1', '35');
INSERT INTO `product_color_relations` VALUES ('20', '1', '36');
INSERT INTO `product_color_relations` VALUES ('21', '3', '37');
INSERT INTO `product_color_relations` VALUES ('22', '4', '37');
INSERT INTO `product_color_relations` VALUES ('23', '1', '38');
INSERT INTO `product_color_relations` VALUES ('24', '2', '38');
INSERT INTO `product_color_relations` VALUES ('25', '1', '39');
INSERT INTO `product_color_relations` VALUES ('26', '1', '40');
INSERT INTO `product_color_relations` VALUES ('27', '4', '40');
INSERT INTO `product_color_relations` VALUES ('28', '1', '41');
INSERT INTO `product_color_relations` VALUES ('29', '5', '42');
INSERT INTO `product_color_relations` VALUES ('30', '4', '43');
INSERT INTO `product_color_relations` VALUES ('31', '1', '44');
INSERT INTO `product_color_relations` VALUES ('32', '5', '45');
INSERT INTO `product_color_relations` VALUES ('33', '2', '46');
INSERT INTO `product_color_relations` VALUES ('34', '1', '47');
INSERT INTO `product_color_relations` VALUES ('35', '1', '48');
INSERT INTO `product_color_relations` VALUES ('36', '3', '49');
INSERT INTO `product_color_relations` VALUES ('37', '5', '50');
INSERT INTO `product_color_relations` VALUES ('38', '1', '51');
INSERT INTO `product_color_relations` VALUES ('39', '1', '52');
INSERT INTO `product_color_relations` VALUES ('40', '2', '53');
INSERT INTO `product_color_relations` VALUES ('41', '2', '54');
INSERT INTO `product_color_relations` VALUES ('46', '1', '55');
INSERT INTO `product_color_relations` VALUES ('47', '2', '55');
INSERT INTO `product_color_relations` VALUES ('48', '3', '55');
INSERT INTO `product_color_relations` VALUES ('49', '3', '34');
INSERT INTO `product_color_relations` VALUES ('50', '4', '34');
INSERT INTO `product_color_relations` VALUES ('51', '5', '34');
INSERT INTO `product_color_relations` VALUES ('55', '2', '56');
INSERT INTO `product_color_relations` VALUES ('56', '3', '56');
INSERT INTO `product_color_relations` VALUES ('57', '4', '56');

-- ----------------------------
-- Table structure for product_compare
-- ----------------------------
DROP TABLE IF EXISTS `product_compare`;
CREATE TABLE `product_compare` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL DEFAULT '0',
  `regdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_compare
-- ----------------------------

-- ----------------------------
-- Table structure for product_conditions
-- ----------------------------
DROP TABLE IF EXISTS `product_conditions`;
CREATE TABLE `product_conditions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_conditions
-- ----------------------------
INSERT INTO `product_conditions` VALUES ('1', 'New', 'new condition');
INSERT INTO `product_conditions` VALUES ('2', 'New other', 'new other condition');
INSERT INTO `product_conditions` VALUES ('3', 'New without tags', 'new without tags condition');
INSERT INTO `product_conditions` VALUES ('4', 'New without box', 'new without box condition');
INSERT INTO `product_conditions` VALUES ('5', 'New with defects', 'new with defects condition');
INSERT INTO `product_conditions` VALUES ('6', 'Manufacturer refurbished', 'manufacture refubished condition');
INSERT INTO `product_conditions` VALUES ('7', 'Like New', 'like new condition');
INSERT INTO `product_conditions` VALUES ('8', 'Seller refurbished', 'seller refurbished condition');
INSERT INTO `product_conditions` VALUES ('9', 'Very Good', 'very good condition');
INSERT INTO `product_conditions` VALUES ('10', 'For parts or not working', 'for parts or not working condition');
INSERT INTO `product_conditions` VALUES ('11', 'Damaged', 'damaged condition');
INSERT INTO `product_conditions` VALUES ('12', 'Acceptable', 'acceptable condition');

-- ----------------------------
-- Table structure for product_discounts
-- ----------------------------
DROP TABLE IF EXISTS `product_discounts`;
CREATE TABLE `product_discounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seller_id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `discount_price` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_discounts
-- ----------------------------
INSERT INTO `product_discounts` VALUES ('51', '2', '1', '36', '123', '1');
INSERT INTO `product_discounts` VALUES ('52', '2', '1', '36', '631', '1');
INSERT INTO `product_discounts` VALUES ('53', '2', '1', '36', '512', '-1');

-- ----------------------------
-- Table structure for product_images
-- ----------------------------
DROP TABLE IF EXISTS `product_images`;
CREATE TABLE `product_images` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `image_path` varchar(255) DEFAULT NULL,
  `product_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_images
-- ----------------------------
INSERT INTO `product_images` VALUES ('52', 'http://192.168.1.1/products/s-l500.jpg', '35');
INSERT INTO `product_images` VALUES ('53', 'http://192.168.1.1/products/s-l500 (1).jpg', '35');
INSERT INTO `product_images` VALUES ('54', 'http://192.168.1.1/products/s-l1600.jpg', '35');
INSERT INTO `product_images` VALUES ('55', 'http://192.168.1.1/products/s-l1600 (1).jpg', '35');
INSERT INTO `product_images` VALUES ('56', 'http://192.168.1.1/products/s-l1600.jpg', '36');
INSERT INTO `product_images` VALUES ('57', 'http://192.168.1.1/products/s-l1600 (1).jpg', '36');
INSERT INTO `product_images` VALUES ('58', 'http://192.168.1.1/products/s-l1600 (3).jpg', '36');
INSERT INTO `product_images` VALUES ('59', 'http://192.168.1.1/products/s-l1600 (4).jpg', '36');
INSERT INTO `product_images` VALUES ('60', 'http://192.168.1.1/products/s-l1600 (2).jpg', '36');
INSERT INTO `product_images` VALUES ('61', 'http://192.168.1.1/products/s-l501.jpg', '37');
INSERT INTO `product_images` VALUES ('62', 'http://192.168.1.1/products/s-l501 (1).jpg', '37');
INSERT INTO `product_images` VALUES ('63', 'http://192.168.1.1/products/s-l501 (2).jpg', '37');
INSERT INTO `product_images` VALUES ('64', 'http://192.168.1.1/products/s-l501 (3).jpg', '37');
INSERT INTO `product_images` VALUES ('65', 'http://192.168.1.1/products/s-l501 (4).jpg', '37');
INSERT INTO `product_images` VALUES ('66', 'http://192.168.1.1/products/s-l501 (5).jpg', '37');
INSERT INTO `product_images` VALUES ('67', 'http://192.168.1.1/products/s-l501 (6).jpg', '37');
INSERT INTO `product_images` VALUES ('68', 'http://192.168.1.1/products/j-l1600.jpg', '38');
INSERT INTO `product_images` VALUES ('69', 'http://192.168.1.1/products/j-l1600 (1).jpg', '38');
INSERT INTO `product_images` VALUES ('70', 'http://192.168.1.1/products/j-l1600 (2).jpg', '38');
INSERT INTO `product_images` VALUES ('71', 'http://192.168.1.1/products/j-l1600 (3).jpg', '38');
INSERT INTO `product_images` VALUES ('72', 'http://192.168.1.1/products/j-l1600 (4).jpg', '38');
INSERT INTO `product_images` VALUES ('73', 'http://192.168.1.1/products/j-l1600 (5).jpg', '38');
INSERT INTO `product_images` VALUES ('74', 'http://192.168.1.1/products/j-l1600 (6).jpg', '38');
INSERT INTO `product_images` VALUES ('75', 'http://192.168.1.1/products/j-l1600 (7).jpg', '38');
INSERT INTO `product_images` VALUES ('76', 'http://192.168.1.1/products/t-l1600.jpg', '39');
INSERT INTO `product_images` VALUES ('77', 'http://192.168.1.1/products/t-l1600 (1).jpg', '39');
INSERT INTO `product_images` VALUES ('78', 'http://192.168.1.1/products/t-l1600 (2).jpg', '39');
INSERT INTO `product_images` VALUES ('79', 'http://192.168.1.1/products/t-l1600 (3).jpg', '39');
INSERT INTO `product_images` VALUES ('80', 'http://192.168.1.1/products/t-l1600 (4).jpg', '39');
INSERT INTO `product_images` VALUES ('81', 'http://192.168.1.1/products/t-l1600 (5).jpg', '39');
INSERT INTO `product_images` VALUES ('82', 'http://192.168.1.1/products/t-l1600 (6).jpg', '39');
INSERT INTO `product_images` VALUES ('83', 'http://192.168.1.1/products/t-l1600 (7).jpg', '39');
INSERT INTO `product_images` VALUES ('84', 'http://192.168.1.1/products/ts-l1600.jpg', '40');
INSERT INTO `product_images` VALUES ('85', 'http://192.168.1.1/products/ts-l1600 (1).jpg', '40');
INSERT INTO `product_images` VALUES ('86', 'http://192.168.1.1/products/ts-l1600 (2).jpg', '40');
INSERT INTO `product_images` VALUES ('87', 'http://192.168.1.1/products/ts-l1600 (3).jpg', '40');
INSERT INTO `product_images` VALUES ('88', 'http://192.168.1.1/products/ts-l1600 (4).jpg', '40');
INSERT INTO `product_images` VALUES ('89', 'http://192.168.1.1/products/1a.jpg', '41');
INSERT INTO `product_images` VALUES ('90', 'http://192.168.1.1/products/1b-600x600.jpg', '41');
INSERT INTO `product_images` VALUES ('91', 'http://192.168.1.1/products/1c-600x600.jpg', '41');
INSERT INTO `product_images` VALUES ('92', 'http://192.168.1.1/products/14a.jpg', '42');
INSERT INTO `product_images` VALUES ('93', 'http://192.168.1.1/products/14b-600x600.jpg', '42');
INSERT INTO `product_images` VALUES ('94', 'http://192.168.1.1/products/14c-600x600.jpg', '42');
INSERT INTO `product_images` VALUES ('95', 'http://192.168.1.1/products/14d-600x600.jpg', '42');
INSERT INTO `product_images` VALUES ('96', 'http://192.168.1.1/products/as-l1600.jpg', '43');
INSERT INTO `product_images` VALUES ('97', 'http://192.168.1.1/products/as-l1600 (1).jpg', '43');
INSERT INTO `product_images` VALUES ('98', 'http://192.168.1.1/products/cs-l500.jpg', '44');
INSERT INTO `product_images` VALUES ('99', 'http://192.168.1.1/products/cs-l1600.jpg', '44');
INSERT INTO `product_images` VALUES ('100', 'http://192.168.1.1/products/cs-l1600 (1).jpg', '44');
INSERT INTO `product_images` VALUES ('101', 'http://192.168.1.1/products/cs-l1600 (3).jpg', '44');
INSERT INTO `product_images` VALUES ('102', 'http://192.168.1.1/products/cs-l1600 (4).jpg', '44');
INSERT INTO `product_images` VALUES ('103', 'http://192.168.1.1/products/cs-l1600 (5).jpg', '44');
INSERT INTO `product_images` VALUES ('104', 'http://192.168.1.1/products/cs-l1600 (6).jpg', '44');
INSERT INTO `product_images` VALUES ('105', 'http://192.168.1.1/products/cs-l1600 (7).jpg', '44');
INSERT INTO `product_images` VALUES ('106', 'http://192.168.1.1/products/gs-l1600.jpg', '45');
INSERT INTO `product_images` VALUES ('107', 'http://192.168.1.1/products/gs-l1600 (1).jpg', '45');
INSERT INTO `product_images` VALUES ('108', 'http://192.168.1.1/products/gs-l1600 (2).jpg', '45');
INSERT INTO `product_images` VALUES ('109', 'http://192.168.1.1/products/gs-l1600 (3).jpg', '45');
INSERT INTO `product_images` VALUES ('110', 'http://192.168.1.1/products/gs-l1600 (4).jpg', '45');
INSERT INTO `product_images` VALUES ('111', 'http://192.168.1.1/products/gs-l1600 (5).jpg', '45');
INSERT INTO `product_images` VALUES ('112', 'http://192.168.1.1/products/ks-l500.jpg', '46');
INSERT INTO `product_images` VALUES ('113', 'http://192.168.1.1/products/ks-l500 (1).jpg', '46');
INSERT INTO `product_images` VALUES ('114', 'http://192.168.1.1/products/ks-l500 (2).jpg', '46');
INSERT INTO `product_images` VALUES ('115', 'http://192.168.1.1/products/ks-l500 (3).jpg', '46');
INSERT INTO `product_images` VALUES ('116', 'http://192.168.1.1/products/ks-l500 (4).jpg', '46');
INSERT INTO `product_images` VALUES ('117', 'http://192.168.1.1/products/ks-l500 (5).jpg', '46');
INSERT INTO `product_images` VALUES ('118', 'http://192.168.1.10/products/ks-l500 (6).jpg', '46');
INSERT INTO `product_images` VALUES ('119', 'http://192.168.1.1/products/ks-l500 (7).jpg', '46');
INSERT INTO `product_images` VALUES ('120', 'http://192.168.1.1/products/fs-l1600.jpg', '47');
INSERT INTO `product_images` VALUES ('121', 'http://192.168.1.1/products/fs-l1600 (1).jpg', '47');
INSERT INTO `product_images` VALUES ('122', 'http://192.168.1.1/products/fs-l1600 (2).jpg', '47');
INSERT INTO `product_images` VALUES ('123', 'http://192.168.1.1/products/fs-l1600 (3).jpg', '47');
INSERT INTO `product_images` VALUES ('124', 'http://192.168.1.1/products/fs-l1600 (4).jpg', '47');
INSERT INTO `product_images` VALUES ('125', 'http://192.168.1.1/products/fs-l1600 (5).jpg', '47');
INSERT INTO `product_images` VALUES ('126', 'http://192.168.1.1/products/ss-l500.jpg', '48');
INSERT INTO `product_images` VALUES ('127', 'http://192.168.1.1/products/ss-l1600.jpg', '48');
INSERT INTO `product_images` VALUES ('128', 'http://192.168.1.1/products/ss-l1600 (1).jpg', '48');
INSERT INTO `product_images` VALUES ('129', 'http://192.168.1.1/products/ss-l1600 (2).jpg', '48');
INSERT INTO `product_images` VALUES ('130', 'http://192.168.1.1/products/ss-l1600 (3).jpg', '48');
INSERT INTO `product_images` VALUES ('131', 'http://192.168.1.1/products/ss-l1600 (4).jpg', '48');
INSERT INTO `product_images` VALUES ('132', 'http://192.168.1.1/products/ss-l1600 (5).jpg', '48');
INSERT INTO `product_images` VALUES ('133', 'http://192.168.1.1/products/dolls-l1600.jpg', '49');
INSERT INTO `product_images` VALUES ('134', 'http://192.168.1.1/products/dolls-l1600 (1).jpg', '49');
INSERT INTO `product_images` VALUES ('135', 'http://192.168.1.1/products/dolls-l1600 (2).jpg', '49');
INSERT INTO `product_images` VALUES ('136', 'http://192.168.1.1/products/dolls-l1600 (3).jpg', '49');
INSERT INTO `product_images` VALUES ('137', 'http://192.168.1.1/products/dolls-l1600 (4).jpg', '49');
INSERT INTO `product_images` VALUES ('138', 'http://192.168.1.1/products/dolls-l1600 (5).jpg', '49');
INSERT INTO `product_images` VALUES ('139', 'http://192.168.1.1/products/holiday-toys-l500.jpg', '50');
INSERT INTO `product_images` VALUES ('140', 'http://192.168.1.1/products/holiday-toys-l500 (1).jpg', '50');
INSERT INTO `product_images` VALUES ('141', 'http://192.168.1.1/products/holiday-toys-l1600.jpg', '50');
INSERT INTO `product_images` VALUES ('142', 'http://192.168.1.1/products/GAT-l1600.jpg', '51');
INSERT INTO `product_images` VALUES ('143', 'http://192.168.1.1/products/GAT-l1600 (1).jpg', '51');
INSERT INTO `product_images` VALUES ('144', 'http://192.168.1.1/products/GAT-l1600 (2).jpg', '51');
INSERT INTO `product_images` VALUES ('145', 'http://192.168.1.1/products/GAT-l1600 (3).jpg', '51');
INSERT INTO `product_images` VALUES ('146', 'http://192.168.1.1/products/GAT-l1600 (4).jpg', '51');
INSERT INTO `product_images` VALUES ('147', 'http://192.168.1.1/products/GAT-l1600 (5).jpg', '51');
INSERT INTO `product_images` VALUES ('148', 'http://192.168.1.1/products/GAT-l1600 (6).jpg', '51');
INSERT INTO `product_images` VALUES ('149', 'http://192.168.1.1/products/GAT-l1600 (7).jpg', '51');
INSERT INTO `product_images` VALUES ('150', 'http://192.168.1.1/products/seat-l500.png', '52');
INSERT INTO `product_images` VALUES ('151', 'http://192.168.1.1/products/seat-l500 (1).png', '52');
INSERT INTO `product_images` VALUES ('152', 'http://192.168.1.1/products/seat-l500 (2).png', '52');
INSERT INTO `product_images` VALUES ('153', 'http://192.168.1.1/products/guitar-l640.jpg', '53');
INSERT INTO `product_images` VALUES ('154', 'http://192.168.1.1/products/guitar-l640 (1).jpg', '53');
INSERT INTO `product_images` VALUES ('155', 'http://192.168.1.1/products/guitar-l640 (2).jpg', '53');
INSERT INTO `product_images` VALUES ('156', 'http://192.168.1.1/products/guitar-l640 (3).jpg', '53');
INSERT INTO `product_images` VALUES ('157', 'http://192.168.1.1/products/microphone-l1600.jpg', '54');
INSERT INTO `product_images` VALUES ('158', 'http://192.168.1.1/products/microphone-l1600 (1).jpg', '54');
INSERT INTO `product_images` VALUES ('159', 'http://192.168.1.1/products/microphone-l1600 (2).jpg', '54');
INSERT INTO `product_images` VALUES ('160', 'http://192.168.1.1/products/microphone-l1600 (3).jpg', '54');
INSERT INTO `product_images` VALUES ('161', 'http://192.168.1.1/products/microphone-l1600 (4).jpg', '54');
INSERT INTO `product_images` VALUES ('175', 'http://192.168.1.123/products/wood_94_diffuse.jpg', '55');
INSERT INTO `product_images` VALUES ('176', 'http://192.168.1.123/products/Untitled.png', '55');
INSERT INTO `product_images` VALUES ('177', 'http://192.168.1.1/products/s-l1601.jpg', '34');
INSERT INTO `product_images` VALUES ('178', 'http://192.168.1.1/products/s-l1601 (1).jpg', '34');
INSERT INTO `product_images` VALUES ('182', 'http://192.168.1.1/products/Pic (12).jpg', '56');
INSERT INTO `product_images` VALUES ('183', 'http://192.168.1.1/products/Pic (5).jpg', '56');
INSERT INTO `product_images` VALUES ('184', 'http://192.168.1.1/products/Pic (155).jpg', '56');

-- ----------------------------
-- Table structure for product_image_relations
-- ----------------------------
DROP TABLE IF EXISTS `product_image_relations`;
CREATE TABLE `product_image_relations` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `image_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_image_relations
-- ----------------------------

-- ----------------------------
-- Table structure for product_order_discount_relations
-- ----------------------------
DROP TABLE IF EXISTS `product_order_discount_relations`;
CREATE TABLE `product_order_discount_relations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `order_discount_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_order_discount_relations
-- ----------------------------
INSERT INTO `product_order_discount_relations` VALUES ('2', '36', '2');
INSERT INTO `product_order_discount_relations` VALUES ('3', '34', '3');
INSERT INTO `product_order_discount_relations` VALUES ('4', '34', '4');
INSERT INTO `product_order_discount_relations` VALUES ('5', '35', '4');
INSERT INTO `product_order_discount_relations` VALUES ('6', '43', '6');
INSERT INTO `product_order_discount_relations` VALUES ('7', '47', '7');
INSERT INTO `product_order_discount_relations` VALUES ('8', '48', '7');

-- ----------------------------
-- Table structure for product_purchases
-- ----------------------------
DROP TABLE IF EXISTS `product_purchases`;
CREATE TABLE `product_purchases` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `purchase_type` int(11) unsigned DEFAULT NULL,
  `quantity` int(11) unsigned DEFAULT NULL,
  `purchase_on` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_purchases
-- ----------------------------

-- ----------------------------
-- Table structure for product_review
-- ----------------------------
DROP TABLE IF EXISTS `product_review`;
CREATE TABLE `product_review` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `rating` double(10,2) DEFAULT NULL,
  `review` text,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_on` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_review
-- ----------------------------

-- ----------------------------
-- Table structure for product_reviews
-- ----------------------------
DROP TABLE IF EXISTS `product_reviews`;
CREATE TABLE `product_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `review` text,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_on` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_reviews
-- ----------------------------

-- ----------------------------
-- Table structure for product_sale_event_relations
-- ----------------------------
DROP TABLE IF EXISTS `product_sale_event_relations`;
CREATE TABLE `product_sale_event_relations` (
  `product_id` int(10) unsigned DEFAULT NULL,
  `sale_event_id` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_sale_event_relations
-- ----------------------------
INSERT INTO `product_sale_event_relations` VALUES ('34', '4');

-- ----------------------------
-- Table structure for product_shipping_discount_relations
-- ----------------------------
DROP TABLE IF EXISTS `product_shipping_discount_relations`;
CREATE TABLE `product_shipping_discount_relations` (
  `product_id` int(10) unsigned DEFAULT NULL,
  `shipping_discount_id` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_shipping_discount_relations
-- ----------------------------
INSERT INTO `product_shipping_discount_relations` VALUES ('56', '4');
INSERT INTO `product_shipping_discount_relations` VALUES ('43', '4');

-- ----------------------------
-- Table structure for product_visits
-- ----------------------------
DROP TABLE IF EXISTS `product_visits`;
CREATE TABLE `product_visits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `visit_time` int(11) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_visits
-- ----------------------------

-- ----------------------------
-- Table structure for product_wish
-- ----------------------------
DROP TABLE IF EXISTS `product_wish`;
CREATE TABLE `product_wish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL DEFAULT '0',
  `regdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_wish
-- ----------------------------

-- ----------------------------
-- Table structure for promotions_shipping_discount
-- ----------------------------
DROP TABLE IF EXISTS `promotions_shipping_discount`;
CREATE TABLE `promotions_shipping_discount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinyint(4) DEFAULT NULL,
  `product_ids` text NOT NULL,
  `delivery_mode` tinyint(4) DEFAULT '0',
  `min_purchase` tinyint(4) DEFAULT NULL,
  `economy_cost` tinyint(4) DEFAULT '-1',
  `standard_cost` tinyint(4) DEFAULT '-1',
  `expedited_cost` tinyint(4) DEFAULT '-1',
  `towday_cost` tinyint(4) DEFAULT '-1',
  `overnight_cost` tinyint(4) DEFAULT '-1',
  `promotional_shipping_cost` tinyint(4) DEFAULT '-1',
  `description` text,
  `offer_title` varchar(100) DEFAULT '',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `priority` int(11) DEFAULT '0',
  `created_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of promotions_shipping_discount
-- ----------------------------

-- ----------------------------
-- Table structure for sale_events
-- ----------------------------
DROP TABLE IF EXISTS `sale_events`;
CREATE TABLE `sale_events` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `event_name` varchar(256) DEFAULT NULL,
  `type` int(10) DEFAULT NULL,
  `discount_value` int(10) DEFAULT NULL,
  `event_value` int(10) DEFAULT NULL,
  `start_date` int(10) unsigned DEFAULT NULL,
  `end_date` int(10) unsigned DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `image_id` int(10) unsigned DEFAULT NULL,
  `message` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sale_events
-- ----------------------------
INSERT INTO `sale_events` VALUES ('4', 'event name', '1', '5', '50', '1542726000', '1543503600', 'description', '1', 'Take 5% off each item50');

-- ----------------------------
-- Table structure for sale_event_images
-- ----------------------------
DROP TABLE IF EXISTS `sale_event_images`;
CREATE TABLE `sale_event_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `path` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sale_event_images
-- ----------------------------
INSERT INTO `sale_event_images` VALUES ('1', 'http://192.168.1.123/promotions/saleEvent/wood_94_diffuse.jpg');
INSERT INTO `sale_event_images` VALUES ('3', 'http://192.168.1.123/promotions/saleEvent/Untitled.png');

-- ----------------------------
-- Table structure for shippings
-- ----------------------------
DROP TABLE IF EXISTS `shippings`;
CREATE TABLE `shippings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `domestic_type` int(3) DEFAULT '0',
  `domestic_service` int(3) DEFAULT '0',
  `domestic_handling_time` int(3) DEFAULT '0',
  `internal_shipping_type` int(3) DEFAULT '0',
  `shipping_to_type` int(3) DEFAULT '0',
  `international_service` int(3) DEFAULT '0',
  `domestic_cost` int(3) DEFAULT '0',
  `international_cost` int(3) DEFAULT '0',
  `additional_location` int(3) DEFAULT '0',
  `free` int(1) DEFAULT '0',
  `offer_local_pickup` int(1) DEFAULT '0',
  `offical_cost` int(3) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shippings
-- ----------------------------
INSERT INTO `shippings` VALUES ('9', '2', '2', '4', '2', '2', null, null, '50', '1', null, null, '100');
INSERT INTO `shippings` VALUES ('10', '1', '2', '3', '1', '2', null, null, '10', '2', null, null, '19');

-- ----------------------------
-- Table structure for shipping_discounts
-- ----------------------------
DROP TABLE IF EXISTS `shipping_discounts`;
CREATE TABLE `shipping_discounts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `economy_check` tinyint(1) DEFAULT '0',
  `economy_price` int(10) DEFAULT NULL,
  `standard_check` tinyint(1) DEFAULT '0',
  `standard_price` int(10) DEFAULT NULL,
  `expected_check` tinyint(1) DEFAULT '0',
  `expected_price` int(10) DEFAULT NULL,
  `twoday_check` tinyint(1) DEFAULT '0',
  `twoday_price` int(10) DEFAULT NULL,
  `overnight_check` tinyint(1) DEFAULT '0',
  `overnight_price` int(10) DEFAULT NULL,
  `promotional_check` tinyint(1) DEFAULT '0',
  `promotional_price` int(10) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `start_date` int(10) unsigned DEFAULT NULL,
  `end_date` int(10) unsigned DEFAULT NULL,
  `priority` int(1) unsigned DEFAULT NULL,
  `image_path` varchar(256) DEFAULT NULL,
  `min_price` int(10) DEFAULT NULL,
  `min_amount` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shipping_discounts
-- ----------------------------
INSERT INTO `shipping_discounts` VALUES ('4', '1', '50', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', 'shipping discount description', 'shipping discount title', '1542726000', '1543503600', '5', 'http://192.168.1.123/events/wood_94_diffuse.jpg', '10', '0');

-- ----------------------------
-- Table structure for special_products
-- ----------------------------
DROP TABLE IF EXISTS `special_products`;
CREATE TABLE `special_products` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `special_id` int(11) DEFAULT NULL,
  `registered_on` bigint(50) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of special_products
-- ----------------------------
INSERT INTO `special_products` VALUES ('37', '34', '1', '1541562728');
INSERT INTO `special_products` VALUES ('39', '36', '1', '1541564090');
INSERT INTO `special_products` VALUES ('40', '37', '1', '1541570868');
INSERT INTO `special_products` VALUES ('41', '38', '1', '1541571220');
INSERT INTO `special_products` VALUES ('43', '40', '1', '1541574619');
INSERT INTO `special_products` VALUES ('45', '42', '1', '1541575172');
INSERT INTO `special_products` VALUES ('48', '45', '1', '1541575594');
INSERT INTO `special_products` VALUES ('49', '46', '1', '1541575716');
INSERT INTO `special_products` VALUES ('52', '49', '1', '1541576364');
INSERT INTO `special_products` VALUES ('53', '50', '1', '1541576512');
INSERT INTO `special_products` VALUES ('54', '51', '1', '1541576794');
INSERT INTO `special_products` VALUES ('55', '52', '1', '1541576896');
INSERT INTO `special_products` VALUES ('56', '53', '1', '1541577002');
INSERT INTO `special_products` VALUES ('57', '54', '1', '1541577108');
INSERT INTO `special_products` VALUES ('58', '55', '1', '1542267947');
INSERT INTO `special_products` VALUES ('59', '56', '1', '1542687112');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `google_id` varchar(255) DEFAULT NULL,
  `login_name` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `activation_code` varchar(40) DEFAULT NULL,
  `forgotten_password_code` varchar(40) DEFAULT NULL,
  `forgotten_password_time` int(11) unsigned DEFAULT NULL,
  `remember_code` varchar(40) DEFAULT NULL,
  `created_on` bigint(50) unsigned DEFAULT NULL,
  `last_login` bigint(50) unsigned DEFAULT NULL,
  `active` tinyint(1) unsigned DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `address_sub` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `rating` double(10,2) DEFAULT NULL,
  `balance` double(10,2) DEFAULT NULL,
  `is_online` tinyint(1) unsigned DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `member_ship` int(1) unsigned DEFAULT NULL,
  `socket_id` varchar(50) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', null, 'buyer', 'buyer@gmail.com', '$2y$07$TI.WmgpkXBB8XGHXgQrlj.YEBsIqJS1imU/YMO72Mn2jqOZOh0gFu', null, null, null, null, null, '1451903855', '1542679439', '1', 'Jack', 'Johnson', null, null, null, null, null, null, null, '1672000.00', '0', '$2a$08$45qT7hcdSYjyhZFsHxHIQuJelEauBSt1qJcbLr3uglAyJcgVznWGW', '0', 'JLAV5ONdLsWbD2-nAAAV', 'http://192.168.1.1/avatar/user.jpg');
INSERT INTO `users` VALUES ('2', null, 'seller', 'seller@gmail.com', '$2y$07$TI.WmgpkXBB8XGHXgQrlj.YEBsIqJS1imU/YMO72Mn2jqOZOh0gFu', null, null, null, null, null, '1451903855', '1542761873', '1', 'Janny', 'Tomson', '999999', 'Test Address', 'Test Address Sub', 'Test City', null, null, null, '9932.60', '0', '$2a$08$KV9RXaNBKoP3sa2wNZan7e35Lm.kZY9LhGOHOLhLTSEzyZnalZ5HK', '2', 'amZ-HScBk-QH4-EyAABN', 'http://192.168.1.1/avatar/user.jpg');
INSERT INTO `users` VALUES ('7', null, '', 'michael@seo.com', '$2y$07$TI.WmgpkXBB8XGHXgQrlj.YEBsIqJS1imU/YMO72Mn2jqOZOh0gFu', '$2a$10$HJI6cOGFzfJZsqJcZ7hmKu', '', '', '0', '', '4294967295', '1542338631', '1', 'michael', 'seo', '02435435', '123', 'W', 'NewYork', '', '', '0.00', '1664200.00', '0', '$2a$08$IB3ra7NZvWkgYHNSy4aA/.5aR.mmY8q/0Bjs0g4cKglL6g2bTFTOy', '1', 'XKPkwBttGyrzL6aeAABM', null);
INSERT INTO `users` VALUES ('9', null, null, 'cksuper0928@gmail.com', null, null, null, null, null, null, null, '1542338631', '1', 'DaRen', 'Cheng', null, null, null, null, null, null, null, null, null, '$2a$08$IB3ra7NZvWkgYHNSy4aA/.5aR.mmY8q/0Bjs0g4cKglL6g2bTFTOy', '0', 'AhrorcYeUINiruYqAAAF', 'https://lh4.googleusercontent.com/-wDlx3V1czEc/AAAAAAAAAAI/AAAAAAAAAAA/ABtNlbCTgEeuuRzGw6xRihbRvSy2jY76cQ/s96-c/photo.jpg');
INSERT INTO `users` VALUES ('11', null, null, 'asd', '$2a$10$sE7yz364PJyWdp6Pkz9D4euBA8VhiNdBBsc30bQID5T4GzaFflnTS', '$2a$10$sE7yz364PJyWdp6Pkz9D4e', null, null, null, null, '4294967295', '1542338631', '1', 'seller1', 'seller1', null, null, null, null, null, null, '5.00', null, '0', '$2a$08$IB3ra7NZvWkgYHNSy4aA/.5aR.mmY8q/0Bjs0g4cKglL6g2bTFTOy', '0', null, 'http://192.168.1.1/avatar/user.jpg');
INSERT INTO `users` VALUES ('12', null, null, 'seller2@mail.com', '$2a$10$AoKp/B83OKugZSTGWGjeU.j3ivM7Ps0KVO7m5gSh1l8hqXxhnCvju', '$2a$10$AoKp/B83OKugZSTGWGjeU.', null, null, null, null, '4294967295', '1542338631', '1', 'seller2', 'seller2', null, null, null, null, null, null, null, null, '0', '$2a$08$IB3ra7NZvWkgYHNSy4aA/.5aR.mmY8q/0Bjs0g4cKglL6g2bTFTOy', '0', null, 'http://192.168.1.1/avatar/user.jpg');
INSERT INTO `users` VALUES ('13', null, null, 'seller3@mail.com', '$2a$10$xfAGQFMjFk00Fgda1FS60.4mO8PnUSP2Aia4F5xCRyzQok8txLWDq', '$2a$10$xfAGQFMjFk00Fgda1FS60.', null, null, null, null, '4294967295', '1542338631', '1', 'seller3', 'seller3', null, null, null, null, null, null, null, null, '0', '$2a$08$IB3ra7NZvWkgYHNSy4aA/.5aR.mmY8q/0Bjs0g4cKglL6g2bTFTOy', '0', null, 'http://192.168.1.1/avatar/user.jpg');
INSERT INTO `users` VALUES ('14', null, null, 'buyer1@mail.com', '$2a$10$sNQy9PiIQx9Fv7qB2XOz7.ZBnJzwj16D2YFr7tavvBEtZWxPG70AO', '$2a$10$sNQy9PiIQx9Fv7qB2XOz7.', null, null, null, null, '4294967295', '1542350713', '1', 'buyer1', 'buyer1', null, null, null, null, null, null, null, null, '0', '$2a$08$U0Ef4aYe6GvU9djPoFGb..lD1./c7xQy.2q2X.KZ7aL4xe52hiOfS', '0', null, 'http://192.168.1.1/avatar/user.jpg');
INSERT INTO `users` VALUES ('15', null, null, 'buyer2@mail.com', '$2a$10$fSOWMRVrSF6NK7qIVxgcI.vs3DOIaVBJ4JTl8G5IS9QRc/H5oXqmi', '$2a$10$fSOWMRVrSF6NK7qIVxgcI.', null, null, null, null, '4294967295', '1542338631', '1', 'buyer2', 'buyer2', null, null, null, null, null, null, null, null, '0', '$2a$08$IB3ra7NZvWkgYHNSy4aA/.5aR.mmY8q/0Bjs0g4cKglL6g2bTFTOy', '0', null, 'http://192.168.1.1/avatar/user.jpg');
INSERT INTO `users` VALUES ('16', null, null, 'buyer3@mail.com', '$2a$10$dgsGxtBxi0gHxUXlrlDwk.nrLhgKZqM.8U4XStwwzvntOFudigxaG', '$2a$10$dgsGxtBxi0gHxUXlrlDwk.', null, null, null, null, '4294967295', '1542338631', '1', 'buyer3', 'buyer3', null, null, null, null, null, null, null, null, '0', '$2a$08$IB3ra7NZvWkgYHNSy4aA/.5aR.mmY8q/0Bjs0g4cKglL6g2bTFTOy', '0', null, 'http://192.168.1.1/avatar/user.jpg');
INSERT INTO `users` VALUES ('17', null, null, 'nail@c3guru.com', '$2y$07$TI.WmgpkXBB8XGHXgQrlj.YEBsIqJS1imU/YMO72Mn2jqOZOh0gFu', '$2a$10$eGeGxFZcCgAjRgSb.GWWI.', '8yygCPvXA7QDyRqUTu4Z5L', null, null, null, '4294967295', '1542338631', '1', 'Nail', 'Menon', null, null, null, null, null, null, null, null, null, '$2a$08$IB3ra7NZvWkgYHNSy4aA/.5aR.mmY8q/0Bjs0g4cKglL6g2bTFTOy', '0', 'CzPh1LONo36dobEKAAAM', 'http://192.168.1.1/avatar/user.jpg');
INSERT INTO `users` VALUES ('29', '103000446797160933887', null, 'cksuper0928@gmail.com', null, null, null, null, null, null, null, '1542338631', '1', 'DaRen', 'Cheng', '+380679979200', null, null, null, null, null, null, null, null, '$2a$08$IB3ra7NZvWkgYHNSy4aA/.5aR.mmY8q/0Bjs0g4cKglL6g2bTFTOy', '0', 'AhrorcYeUINiruYqAAAF', 'https://lh4.googleusercontent.com/-wDlx3V1czEc/AAAAAAAAAAI/AAAAAAAAAAA/ABtNlbCTgEeuuRzGw6xRihbRvSy2jY76cQ/s96-c/photo.jpg');
INSERT INTO `users` VALUES ('31', null, null, 'jayper.loyd@gmail.com', '$2a$10$pNpa64wCcG6FkTTQTE6C5O1fEZji9tws5sJVUKo7k0Bb5tlvX6gd2', '$2a$10$pNpa64wCcG6FkTTQTE6C5O', '4djedjwci3ZVLwLrSwTDSM', null, null, null, '20181109022626', '1542680461', '1', 'John', 'Bens', null, null, null, null, null, null, null, null, null, '$2a$08$T5qT.r7H1Tt0OtbYN.9EUOOrYN4Ke8ygvGunH.ky8yh6lir9KMye6', null, null, 'http://192.168.1.1/avatar/user.jpg');
INSERT INTO `users` VALUES ('32', '110625420411053445555', null, 'sasha@papevis.com', null, null, null, null, null, null, null, '1542338631', '1', 'Папевис', 'Александр', null, null, null, null, null, null, null, null, null, '$2a$08$IB3ra7NZvWkgYHNSy4aA/.5aR.mmY8q/0Bjs0g4cKglL6g2bTFTOy', '0', null, 'https://lh5.googleusercontent.com/-7Y-4P26sz14/AAAAAAAAAAI/AAAAAAAAAAA/ABtNlbDEWkwr4JCKqU7SL6wd8gNXyOr2MA/s96-c/photo.jpg');
INSERT INTO `users` VALUES ('33', null, null, 'ltbesitulo@gmail.com', '$2a$10$2zOQq8OfsJeqVNUsHP0Xu.SYtzZ0CAGdQ8nsuiz/HHCCof9wG5UcG', '$2a$10$2zOQq8OfsJeqVNUsHP0Xu.', 'T6zyWJBQQN59RK2q36otCe', null, null, null, '20181113041724', '1542338631', '1', 'John', 'Bens', null, null, null, null, null, null, null, null, null, '$2a$08$IB3ra7NZvWkgYHNSy4aA/.5aR.mmY8q/0Bjs0g4cKglL6g2bTFTOy', null, null, 'http://192.168.1.1/avatar/user.jpg');
INSERT INTO `users` VALUES ('37', null, null, 'richard.stewart.95@gmail.com', '$2a$10$EQOUAQpxa1tCHy4Mp.BJweuRq9pwGxiZYF7pOzjeR76.06KUNN9Dy', '$2a$10$EQOUAQpxa1tCHy4Mp.BJwe', 'CFSVi8qBPzXZ76WoiiAcdb', null, null, null, '1542685333', '1542685561', '1', 'Richard', 'Stewart', null, null, null, null, null, null, null, null, null, '$2a$08$29YIsdC.w.vvzaeGYy8Keua0FU.wyIyeoGOKlnebmRj.aPbFhpmba', null, 'jL78FroOgkoKWlIVAAAh', 'http://192.168.1.1/avatar/user.jpg');

-- ----------------------------
-- Table structure for users_groups
-- ----------------------------
DROP TABLE IF EXISTS `users_groups`;
CREATE TABLE `users_groups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `group_id` mediumint(8) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users_groups
-- ----------------------------
INSERT INTO `users_groups` VALUES ('1', '1', '1');
INSERT INTO `users_groups` VALUES ('2', '2', '2');
INSERT INTO `users_groups` VALUES ('3', '4', '2');
INSERT INTO `users_groups` VALUES ('4', '5', '2');
INSERT INTO `users_groups` VALUES ('5', '6', '2');
INSERT INTO `users_groups` VALUES ('6', '7', '2');
INSERT INTO `users_groups` VALUES ('7', '10', '2');
INSERT INTO `users_groups` VALUES ('8', '11', '2');
INSERT INTO `users_groups` VALUES ('9', '12', '2');
INSERT INTO `users_groups` VALUES ('10', '13', '2');
INSERT INTO `users_groups` VALUES ('11', '14', '2');
INSERT INTO `users_groups` VALUES ('12', '15', '2');
INSERT INTO `users_groups` VALUES ('13', '16', '2');
INSERT INTO `users_groups` VALUES ('14', '17', '2');
INSERT INTO `users_groups` VALUES ('26', '29', '2');
INSERT INTO `users_groups` VALUES ('28', '31', '2');
INSERT INTO `users_groups` VALUES ('29', '32', '2');
INSERT INTO `users_groups` VALUES ('30', '33', '2');
INSERT INTO `users_groups` VALUES ('34', '37', '2');

-- ----------------------------
-- Table structure for volume_pricings
-- ----------------------------
DROP TABLE IF EXISTS `volume_pricings`;
CREATE TABLE `volume_pricings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `offer_name` varchar(255) DEFAULT NULL,
  `two_items_percent` int(11) unsigned DEFAULT NULL,
  `three_items_percent` int(11) unsigned DEFAULT NULL,
  `four_items_percent` int(11) unsigned DEFAULT NULL,
  `from` int(11) unsigned DEFAULT NULL,
  `to` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of volume_pricings
-- ----------------------------
INSERT INTO `volume_pricings` VALUES ('20', 'Volume Pricing Event 2', '5', '10', '0', '1542015000', '1542967200');

-- ----------------------------
-- Table structure for volume_pricing_product_rels
-- ----------------------------
DROP TABLE IF EXISTS `volume_pricing_product_rels`;
CREATE TABLE `volume_pricing_product_rels` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) unsigned DEFAULT NULL,
  `volume_pricing_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of volume_pricing_product_rels
-- ----------------------------
INSERT INTO `volume_pricing_product_rels` VALUES ('17', '36', '20');
INSERT INTO `volume_pricing_product_rels` VALUES ('18', '46', '20');
INSERT INTO `volume_pricing_product_rels` VALUES ('19', '41', '20');

-- ----------------------------
-- Table structure for wishes
-- ----------------------------
DROP TABLE IF EXISTS `wishes`;
CREATE TABLE `wishes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `product_id` int(11) unsigned DEFAULT NULL,
  `created_at` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wishes
-- ----------------------------

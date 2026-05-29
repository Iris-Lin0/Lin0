/*
 Navicat Premium Dump SQL

 Source Server         : travel Dream
 Source Server Type    : MySQL
 Source Server Version : 80044 (8.0.44)
 Source Host           : localhost:3306
 Source Schema         : travel_db

 Target Server Type    : MySQL
 Target Server Version : 80044 (8.0.44)
 File Encoding         : 65001

 Date: 29/05/2026 17:51:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for attractions
-- ----------------------------
DROP TABLE IF EXISTS `attractions`;
CREATE TABLE `attractions`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '景点名称',
  `location` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '地点',
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '图片URL',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '简短描述',
  `transport_cost` decimal(10, 2) NULL DEFAULT NULL COMMENT '交通费用估算（元）',
  `accommodation_cost` decimal(10, 2) NULL DEFAULT NULL COMMENT '住宿费用估算（元）',
  `food_cost` decimal(10, 2) NULL DEFAULT NULL COMMENT '餐饮费用估算（元）',
  `entertainment_cost` decimal(10, 2) NULL DEFAULT NULL COMMENT '门票/娱乐费用估算（元）',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attractions
-- ----------------------------
INSERT INTO `attractions` VALUES (1, '丽江古城', '云南省丽江市', 'https://picsum.photos/id/104/400/300', '世界文化遗产，小桥流水，纳西风情', 50.00, 200.00, 100.00, 80.00, '2026-03-25 16:34:35', '2026-03-25 16:34:35');
INSERT INTO `attractions` VALUES (2, '故宫博物院', '北京市东城区', 'https://picsum.photos/id/10/400/300', '明清皇家宫殿，中华文明的瑰宝', 20.00, 300.00, 120.00, 60.00, '2026-03-25 16:34:35', '2026-03-25 16:34:35');
INSERT INTO `attractions` VALUES (3, '张家界国家森林公园', '湖南省张家界市', 'https://picsum.photos/id/15/400/300', '奇峰三千，秀水八百，《阿凡达》取景地', 80.00, 250.00, 90.00, 120.00, '2026-03-25 16:34:35', '2026-03-25 16:34:35');

SET FOREIGN_KEY_CHECKS = 1;

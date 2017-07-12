-- 初始化
-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2017-07-12 13:09:27
-- 服务器版本： 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Open2017`
--

-- --------------------------------------------------------

--
-- 表的结构 `companys`
--

CREATE TABLE `companys` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL COMMENT '企业名称',
  `code` varchar(100) NOT NULL COMMENT '组织机构代码',
  `regno` varchar(100) NOT NULL COMMENT '企业注册号',
  `idfile` varchar(500) NOT NULL COMMENT '资质证明',
  `status` varchar(2) NOT NULL COMMENT '状态',
  `uid` int(11) NOT NULL COMMENT '管理者用户ID',
  `type` varchar(4) NOT NULL COMMENT '企业类型',
  `urole` varchar(40) NOT NULL COMMENT '企业联系人职位',
  `phone` varchar(40) DEFAULT NULL COMMENT '企业座机'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='企业';

-- --------------------------------------------------------

--
-- 表的结构 `company_import`
--

CREATE TABLE `company_import` (
  `id` int(11) NOT NULL,
  `bdUid` int(11) NOT NULL,
  `bdName` varchar(50) NOT NULL,
  `bdUm` varchar(50) DEFAULT NULL,
  `bdNick` varchar(50) DEFAULT NULL,
  `bdMobile` varchar(20) NOT NULL,
  `bdMemo` varchar(200) NOT NULL,
  `sellUid` int(11) DEFAULT NULL,
  `sellName` varchar(50) DEFAULT NULL,
  `sellNick` varchar(50) DEFAULT NULL,
  `sellUm` varchar(50) DEFAULT NULL,
  `sellMemo` varchar(200) DEFAULT NULL,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `udpatetime` timestamp NULL DEFAULT NULL,
  `comfiretime` timestamp NULL DEFAULT NULL,
  `status` varchar(2) DEFAULT NULL,
  `isok` varchar(1) NOT NULL DEFAULT '0',
  `memo` varchar(200) DEFAULT NULL COMMENT '备用字段',
  `cid` int(11) DEFAULT NULL COMMENT '企业',
  `uid` int(11) DEFAULT NULL COMMENT '用户'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `company_prods`
--

CREATE TABLE `company_prods` (
  `id` int(11) NOT NULL,
  `pid` int(11) NOT NULL COMMENT '产品ID',
  `cid` int(11) DEFAULT NULL COMMENT '企业ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户',
  `begintime` timestamp NULL DEFAULT NULL COMMENT '有效期-开始',
  `endtime` timestamp NULL DEFAULT NULL COMMENT '有效期-结束',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '申请日期',
  `updatetime` timestamp NULL DEFAULT NULL COMMENT '修改日期',
  `status` varchar(2) NOT NULL COMMENT '状态',
  `reason` varchar(500) DEFAULT NULL COMMENT '申请原因',
  `confirmReason` varchar(500) DEFAULT NULL COMMENT '审核原因'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='企业产品表';

-- --------------------------------------------------------

--
-- 表的结构 `log_auth`
--

CREATE TABLE `log_auth` (
  `uid` int(11) NOT NULL COMMENT '授权人',
  `auid` int(11) NOT NULL COMMENT '被授权人',
  `type` varchar(4) NOT NULL COMMENT '操作类型',
  `status` varchar(2) NOT NULL COMMENT '状态',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '操作日期',
  `cid` int(11) DEFAULT NULL COMMENT '企业id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL COMMENT '用户名称',
  `mobile` varchar(11) NOT NULL COMMENT '用户手机',
  `password` varchar(200) NOT NULL COMMENT '用户登录密码',
  `role` varchar(4) NOT NULL COMMENT '用户角色/用户类型',
  `status` varchar(2) NOT NULL COMMENT '用户状态',
  `source` varchar(4) NOT NULL COMMENT '注册来源',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `updatetime` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  `cid` int(11) DEFAULT NULL COMMENT '企业'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companys`
--
ALTER TABLE `companys`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_UNIQUE` (`code`),
  ADD UNIQUE KEY `regno_UNIQUE` (`regno`),
  ADD KEY `user_idx` (`uid`);

--
-- Indexes for table `company_import`
--
ALTER TABLE `company_import`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_prods`
--
ALTER TABLE `company_prods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`email`),
  ADD UNIQUE KEY `mobile_UNIQUE` (`mobile`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `companys`
--
ALTER TABLE `companys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `company_import`
--
ALTER TABLE `company_import`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `company_prods`
--
ALTER TABLE `company_prods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 限制导出的表
--

--
-- 限制表 `companys`
--
ALTER TABLE `companys`
  ADD CONSTRAINT `user` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

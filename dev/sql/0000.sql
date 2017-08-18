--
-- 状态表，状态一旦确定，则不能修改
--
DROP TABLE IF EXISTS STATUS;
CREATE TABLE STATUS (
  `id` varchar(4) NOT NULL PRIMARY KEY,
  `name` varchar(50) NOT NULL COMMENT '状态名称',
  `createTime` varchar(20) NOT NULL,
  `createUser` int NOT NULL,
  `memo` varchar(100) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='状态表';


--
-- 角色表
--
DROP TABLE IF EXISTS ROLES;
CREATE TABLE ROLES (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '角色名称',
  `createTime` varchar(20) NOT NULL,
  `createUser` int NOT NULL,
  `updateTime` varchar(20) NULL,
  `updateUser` int NULL,
  `comfirmTime` varchar(20) NULL,
  `confirmUser` int NULL,
  `backTime` varchar(20) NULL,
  `backUser` int NULL,
  `memo` varchar(100) NULL,
  `status`  varchar(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

--
-- 菜单权限表
--
DROP TABLE IF EXISTS MENUS;
CREATE TABLE MENUS (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `pid` int NOT NULL DEFAULT 0 COMMENT '父菜单',
  `name` varchar(50) NOT NULL COMMENT '权限名称',
  `url` varchar(255) NULL COMMENT '访问路径',
  `createTime` varchar(20) NOT NULL COMMENT '创建时间',
  `createUser` int NOT NULL COMMENT '创建人',
  `updateTime` varchar(20) NULL COMMENT '修改时间',
  `updateUser` int NULL COMMENT '修改人',
  `isLink` int NOT NULL DEFAULT 1 COMMENT '是否连接，0否，1是',
  `isButton` int NOT NULL DEFAULT 0 COMMENT '是否按钮，0否，1是，如果是按钮不显示在按钮菜单',
  `isUse` int NOT NULL DEFAULT 1 COMMENT '是否启用，0否，1是'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单权限表';

--
-- 用户表
--
DROP TABLE IF EXISTS ADMINS;
DROP TABLE IF EXISTS USERS;
CREATE TABLE USERS (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `role` int NOT NULL COMMENT '用户角色',
  `name` varchar(50) NOT NULL COMMENT '用户登录名称',
  `type` int NOT NULL DEFAULT 0 COMMENT '用户类型，0前台用户，1后管用户，2UM账号',
  `email` varchar(50) NOT NULL COMMENT '用户邮箱',
  `mobile` varchar(50) NOT NULL COMMENT '用户手机号',
  `password` varchar(255) NOT NULL COMMENT '登录密码',
  `nick` varchar(50) NULL COMMENT '用户昵称',
  `phone` varchar(50) NULL COMMENT '用户座机',
  `sex` varchar(2) NULL DEFAULT 0 COMMENT '性别，0男，1女，2其他',
  `registChannel` int(11) DEFAULT NULL COMMENT '注册渠道 0:网络注册 1:后管录入',
  `status`  varchar(4) NOT NULL,
  `createTime` varchar(20) NOT NULL,
  `createIp` varchar(128) NULL COMMENT '注册 IP',
  `loginTime` varchar(20) NULL,
  `loginIp` varchar(128) NULL,
  `loginTimes` int DEFAULT 0 COMMENT '登录次数',
  `lastLoginIp` varchar(128) NULL COMMENT '最后登录ip',
  `lastLoginTime` varchar(20) NULL COMMENT '最后登录时间',
  `companyId` int COMMENT '企业',
  `companyRole` int NULL COMMENT '0.普通用户 1.企业用户 2. 企业管理员',
  `applyId` int NULL COMMENT '供应商'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='后台用户表';

ALTER TABLE `USERS`
  ADD UNIQUE KEY `UQ_email` (`name`, `type`, `email`) USING HASH,
  ADD UNIQUE KEY `UQ_mobile` (`name`, `type`, `mobile`) USING HASH;

-- 
-- 前台用户供应商角色
--
DROP TABLE IF EXISTS USER_APPLY;
CREATE TABLE USER_APPLY(
  `uid` int NOT NULL COMMENT '前台用户',
  `applyRole` int NOT NULL COMMENT '前台用户角色'
);

ALTER TABLE `USER_APPLY`
  ADD UNIQUE KEY `PK_UID_APPLY` (`uid`, `applyRole`) USING HASH,
  ADD INDEX `INDEX_UID` (`uid`) USING HASH;

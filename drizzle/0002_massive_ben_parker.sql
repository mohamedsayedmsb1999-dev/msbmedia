CREATE TABLE `leadAccounts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`passwordHash` varchar(128) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leadAccounts_id` PRIMARY KEY(`id`),
	CONSTRAINT `leadAccounts_phone_unique` UNIQUE(`phone`)
);

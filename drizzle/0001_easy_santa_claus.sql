CREATE TABLE `paymentReceipts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`method` enum('vodafone_cash','binance_pay') NOT NULL,
	`customerName` varchar(120) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`binancePhone` varchar(32),
	`receiptKey` varchar(512) NOT NULL,
	`receiptUrl` text NOT NULL,
	`filename` varchar(255) NOT NULL,
	`mimeType` varchar(80) NOT NULL,
	`sizeBytes` int NOT NULL,
	`status` enum('received','reviewing','confirmed') NOT NULL DEFAULT 'received',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `paymentReceipts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `supportTickets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`email` varchar(320),
	`subject` varchar(180) NOT NULL,
	`message` text NOT NULL,
	`status` enum('new','in_progress','closed') NOT NULL DEFAULT 'new',
	`emailDispatched` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `supportTickets_id` PRIMARY KEY(`id`)
);

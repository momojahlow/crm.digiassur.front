CREATE TABLE `quote_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reference` varchar(16) NOT NULL,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100) NOT NULL,
	`company` varchar(191) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(32),
	`projectType` varchar(32) NOT NULL,
	`volume` varchar(32) NOT NULL,
	`message` text,
	`consentAt` timestamp NOT NULL,
	`status` enum('new','in_progress','closed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quote_requests_id` PRIMARY KEY(`id`),
	CONSTRAINT `quote_requests_reference_unique` UNIQUE(`reference`)
);

DROP INDEX IF EXISTS "user_username_unique";--> statement-breakpoint
ALTER TABLE `order` ALTER COLUMN "status" TO "status" text NOT NULL DEFAULT 'pending';--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
ALTER TABLE `order` ADD `address` text NOT NULL;
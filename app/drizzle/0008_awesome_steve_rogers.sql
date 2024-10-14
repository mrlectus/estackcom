ALTER TABLE `order` RENAME COLUMN "status" TO "shipping_status";--> statement-breakpoint
ALTER TABLE `order` ADD `payment_status` text DEFAULT 'pending' NOT NULL;
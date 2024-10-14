import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import crypto from "crypto";

export const userTable = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: text("username").notNull().unique(),
  password: text("password", { length: 512 }).notNull(),
  email: text("email").notNull(),
  role: text("role").$type<"admin" | "seller" | "shopper">().notNull(),
});

export const productTable = sqliteTable("product", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  key: text("key"),
  description: text("description"),
  price: integer("price").notNull(),
  sellerId: text("seller_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }), // assuming seller is a user
  stock: integer("stock").notNull().default(0),
});

export const orderTable = sqliteTable("order", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  sellerId: text("seller_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  shippingStatus: text("shipping_status")
    .$type<"pending" | "approved" | "shipped">()
    .default("pending")
    .notNull(),
  paymentStatus: text("payment_status")
    .$type<"pending" | "paid" | "declined">()
    .default("pending")
    .notNull(),
  address: text("address").notNull(),
  orderDate: integer("order_date").notNull().$defaultFn(() => Date.now().valueOf()), // timestamp
  totalPrice: integer("total_price").notNull(),
  quantity: integer("quantity").notNull(),
});

export const cartTable = sqliteTable("cart", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  key: text("key"),
  description: text("description"),
  price: integer("price").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  quantity: integer("quantity").default(1).notNull(),
  sellerId: text("seller_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at").notNull(),
});

export type ProductTable = typeof productTable.$inferSelect;
export type UserTable = typeof userTable.$inferSelect;
export type CartTable = typeof cartTable.$inferSelect;
export type OrderTable = typeof orderTable.$inferSelect;

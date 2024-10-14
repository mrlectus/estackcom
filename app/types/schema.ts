import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string({
      message: "Username must be a string",
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(3, {
      message: "Username must be at least 3 characters",
    })
    .max(20),
  email: z
    .string({
      message: "Email must be a string",
      required_error: "Email is required",
    })
    .email({
      message: "Email must be a valid email address",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  role: z.enum(["admin", "seller", "shopper"], {
    message: "Role must be either admin, seller, or shopper",
  }),
});

export const productSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(50),
  description: z.string().optional(),
  file:
    typeof window === "undefined" ? z.any() : z.instanceof(FileList).optional(),
  price: z.coerce
    .number({
      message: "Price must be a number",
      invalid_type_error: "Price must be a number",
    })
    .min(0, {
      message: "Price must be a positive number",
    }),
  stock: z.coerce
    .number({
      message: "Stock must be a number",
      invalid_type_error: "Stock must be a number",
    })
    .min(0, {
      message: "Stock must be a positive number",
    }),
});

export type User = z.infer<typeof userSchema>;

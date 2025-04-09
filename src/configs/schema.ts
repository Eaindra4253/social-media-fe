import { z } from "zod";

export const createCouponSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  amount: z.number().min(1, { message: "Point Amount is required" }),
  thumbnail: z.string().min(1, { message: "Thumbnail URL is required" }),
  imageUrl: z.string().min(1, { message: "Image URL is required" }),
  logo: z.string().min(1, { message: "Logo is required" }),
  validDays: z.number().min(1, { message: "Valid Days is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  couponType: z.string().min(1, { message: "Coupon Type is required" }),
  outletType: z.string().min(1, { message: "Outlet Type is required" }),
});

export const createUserSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().refine((val) => val.length > 0, "Password is required"),
  email: z.string().email({ message: "Invalid email address" }),
  outletType: z
    .string()
    .nullable()
    .transform((val) => val ?? "")
    .refine((val) => val.length > 0, { message: "Outlet Type is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  isActive: z.boolean(),
});

export const updateUserSchema = z.object({
  username: z
    .string()
    .refine((value) => value.length, { message: "Username is required" }),
  email: z
    .string()
    .email()
    .refine((value) => value.length, { message: "Email is required" }),
  outletType: z
    .string()
    .nullable()
    .transform((val) => val ?? "")
    .refine((val) => val.length > 0, { message: "Outlet Type is required" }),
  role: z.enum(["SCANNER", "ADMIN"], { message: "Role is required" }),
});
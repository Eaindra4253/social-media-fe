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
  email: z.string(),
  outletType: z.any().nullable(),
  role: z.enum(["SCANNER", "ADMIN", "SUPER_ADMIN", "FINANCE"], {
    message: "Role is required",
  }),
  isActive: z.boolean(),
});

export const updateUserSchema = z.object({
  username: z
    .string()
    .refine((value) => value.length, { message: "Username is required" }),
  email: z.string(),
  outletType: z.any().nullable(),
  role: z
    .enum(["SCANNER", "ADMIN", "SUPER_ADMIN", "FINANCE"], {
      message: "Role is required",
    })
    .nullable(),
});

export const makePaymentSchema = z.object({
  remark: z.string().min(1, { message: "Remark is required" }),
});

export const userChangePasswordSchema = z
  .object({
    password: z
      .string()
      .refine((value) => value.length, { message: "New Password is required" }),
    confirmPassword: z.string().refine((value) => value.length, {
      message: "Confirm Password is required",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export const createPermissionSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  code: z.string().refine((val) => val.length > 0, "Code is required"),
  description: z.string().optional(),
});

export const updatePermissionSchema = z.object({
  name: z
    .string()
    .refine((value) => value.length, { message: "Name is required" }),
  code: z.string().refine((val) => val.length > 0, "Code is required"),
  description: z.string().optional(),
});

export const createRoleSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  permissions: z
    .array(z.string())
    .min(1, { message: "At least one permission is required" }),
});

export const updateRoleSchema = z.object({
  name: z
    .string()
    .refine((value) => value.length, { message: "Name is required" }),
  description: z.string().optional(),
  permissions: z
    .array(z.string())
    .min(1, { message: "At least one permission is required" }),
});

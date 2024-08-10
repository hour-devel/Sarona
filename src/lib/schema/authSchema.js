const { z } = require("zod");

export const authSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be more than 8 character" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First Name is required" })
      .min(3, { message: "Must be 3 or more characters long" }),
    lastName: z
      .string()
      .min(1, { message: "Last Name is required" })
      .min(3, { message: "Must be 3 or more characters long" }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password must be 8 or more characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be 8 or more characters long" }),
    // remember: z.boolean(),
  })
  .superRefine(({ password, confirmPassword, remember }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password don't match",
        path: ["confirmPassword"],
      });
    }
  });

export const forgetPasswordSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be 8 or more characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be 8 or more characters long" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password don't match",
        path: ["confirmPassword"],
      });
    }
  });

const { z } = require("zod");

export const announceSchema = z.object({
  title: z
    .string()
    .trim() // Remove leading/trailing whitespace
    .refine((value) => value !== "", {
      message: "Title is required",
    }),
  description: z
    .string()
    .trim() // Remove leading/trailing whitespace
    .refine((value) => value !== "", {
      message: "Description is required",
    }),
  classId: z
    .array(z.string().min(1, { message: "Class ID is required" }))
    .min(1, { message: "Class ID is required" }),
  // postDate: z.date().refine((value) => !isNaN(value.getTime()), {
  //   message: "Date is required",
  // }),
});

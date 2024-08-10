const { z } = require("zod");

export const classworkSchema = z.object({
  classworkTitle: z
    .string()
    .min(1, { message: "Classwork Title is required" })
    .min(3, { message: "Must be 3 or more characters long" }),
  startDate: z.string().min(1, { message: "Start Date is required" }),
  dueDate: z.string().min(1, { message: "Due Date is required" }),
});

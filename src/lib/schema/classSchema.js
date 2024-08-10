const { z } = require("zod");

export const classSchema = z.object({
  className: z.string().min(1, { message: "Class name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export const classCode = z.object({
  classCode: z.string().min(1,{message: "class code is required"})
})

export const joinClassSchema = z.object({ 
  classCode: z.string().min(1, { message: "Class code is required" }), 
});
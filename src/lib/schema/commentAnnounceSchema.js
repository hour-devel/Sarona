import { z } from "zod";

export const commentAnnounceSchema = z.object({
  content: z.string().min(1, { message: "Comment is required" }),
});

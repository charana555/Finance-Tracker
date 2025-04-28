import * as z from "zod";

export const transactionSchema = z.object({
  id: z.string(),
  amount: z.number().int().min(1, {
    message: "Amount can't be less than 1 rupee",
  }),
  createdAt: z.string().datetime().optional(),
  type: z.enum(["CREDIT", "DEBIT"]),
  description: z.string(),
  categoryId: z.string().nullable(),
});

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { transactionSchema } from "@/schemas/index.js";
import {
  addTransaction,
  getAllTransaction,
} from "@/services/transactionService.js";

const transactionRoutes = new Hono();

transactionRoutes.get("/", async (c) => {
  const transactions = await getAllTransaction();

  return c.json(
    {
      succcess: true,
      data: transactions,
      message: null,
    },
    200
  );
});

transactionRoutes.post(
  "/",
  zValidator("json", transactionSchema.omit({ id: true, createdAt: true })),
  async (c) => {
    const { amount, type, categoryId, description } = c.req.valid("json");

    const { message } = await addTransaction({
      amount,
      categoryId,
      type,
      description,
    });

    return c.json(
      {
        success: true,
        data: null,
        message,
      },
      201
    );
  }
);

export default transactionRoutes;

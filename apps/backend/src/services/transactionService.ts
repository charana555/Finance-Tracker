import { db } from "@/lib/prisma.js";
import type { Transaction } from "@prisma/client";

const addTransaction = async (data: Omit<Transaction, "id" | "createdAt">) => {
  await db.transaction.create({
    data,
  });

  return { message: "Transaction Added Successfully" };
};

const getAllTransaction = async (): Promise<Transaction[]> => {
  return await db.transaction.findMany();
};

export { addTransaction, getAllTransaction };

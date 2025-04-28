import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

import transactionRoutes from "./routes/transactionRoutes.js";

const app = new Hono();

app.use(logger());
app.use(
  "*",
  cors({
    origin: [`${process.env.CORS_ORIGIN}`],
    credentials: true,
  })
);

app.onError((err: any, c) => {
  console.error("🔥 Hono caught an unhandled error:", err);
  return c.json(
    { success: false, error: err.message || "Server Error" },
    err.status || 500
  );
});

app.get("/", (c) => {
  return c.text("Hello Finance-Tracker!");
});

app.route("/transaction", transactionRoutes);

export default app;

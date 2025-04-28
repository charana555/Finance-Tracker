import "dotenv/config";

import { serve } from "@hono/node-server";
import app from "./app.js";

const port = 3456;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

import type { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ZodError } from "zod";
import {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
} from "@/utils/customErrors.js";

// Global error handler
export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error: any) {
    console.log("Error Type:", error.constructor?.name); // Log the error type
    console.log("Full Error Object:", error); // Log full error details for debugging

    // Zod validation errors
    if (error instanceof ZodError) {
      return c.json(
        { success: false, error: "Validation failed", details: error.errors },
        400
      );
    }

    // Prisma Client errors (unique constraint violations, etc.)
    // if (error instanceof PrismaClientKnownRequestError) {
    //   if (error.code === "P2002") {
    //     // Duplicate entry detected
    //     return c.json(
    //       { success: false, error: "Duplicate entry detected." },
    //       400
    //     );
    //   }
    //   return c.json({ success: false, error: error.message }, 400);
    // }

    // Custom errors (Bad Request, Unauthorized, etc.)
    if (error instanceof BadRequestError) {
      return c.json({ success: false, error: error.message }, 400);
    }

    if (error instanceof UnauthorizedError) {
      return c.json({ success: false, error: error.message }, 401);
    }

    if (error instanceof NotFoundError) {
      return c.json({ success: false, error: error.message }, 404);
    }

    // HTTPException (for other HTTP-related errors)
    if (error instanceof HTTPException) {
      return c.json({ success: false, error: error.message }, error.status);
    }

    // General fallback for unexpected errors
    return c.json({ success: false, error: "Internal Server Error" }, 500);
  }
};

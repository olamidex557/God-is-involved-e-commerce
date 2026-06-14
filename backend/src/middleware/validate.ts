import {
  Request,
  Response,
  NextFunction,
} from "express";
import {
  ZodError,
  ZodType,
} from "zod";

const formatZodError = (
  error: ZodError
) =>
  error.issues.map(
    (issue) => ({
      field:
        issue.path.join(
          "."
        ) || "request",
      message:
        issue.message,
    })
  );

export const validateBody =
  <T>(schema: ZodType<T>) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result =
      schema.safeParse(
        req.body
      );

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message:
          "Validation failed",
        errors: formatZodError(
          result.error
        ),
      });
    }

    req.body = result.data;

    next();
  };

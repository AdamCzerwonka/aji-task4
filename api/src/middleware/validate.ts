import { NextFunction, Request, Response } from "express";
import { ProblemDocument } from "http-problem-details";
import { StatusCodes } from "http-status-codes";
import { AnyZodObject, z } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const problems: ProblemDocument[] = [];

        error.issues.forEach((issue) => {
          var msg: string = issue.message;

          if (
            issue.message.includes("String") ||
            issue.message.includes("Number")
          ) {
            msg =
              issue.path[1] + issue.message.substr(issue.message.indexOf(" "));
            msg = msg.charAt(0).toUpperCase() + msg.slice(1);
          }

          const detail = problems.push(
            new ProblemDocument({
              type: `https://example.com/${issue.code}`,
              title: `${issue.message}`,
              detail: msg,
              instance: "xyz",
              status: StatusCodes.BAD_REQUEST,
            })
          );
        });

        return res.status(StatusCodes.BAD_REQUEST).json(problems);
      }
      return res.status(StatusCodes.BAD_REQUEST).json("Error");
    }
  };

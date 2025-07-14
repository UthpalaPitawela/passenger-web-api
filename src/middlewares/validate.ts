import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

type ValidationTarget = 'body' | 'query' | 'params';

export const validate =
  (schema: ObjectSchema, target: ValidationTarget = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    const dataToValidate = req[target];

    const { error } = schema.validate(dataToValidate);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    next();
  };

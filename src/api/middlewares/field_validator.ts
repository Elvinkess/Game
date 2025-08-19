import {Request,Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export class Validator {
  signValidation = [
    body('username')
      .notEmpty()
      .withMessage('userame is required')
      .isLength({ min: 2 })
      .withMessage('userame must be at least 2 characters long'),
    ];

   validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array().map(error => error.msg) }); // Respond with error messages
      return;
    }
    next();
  };
  
}

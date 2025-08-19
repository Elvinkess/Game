"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const express_validator_1 = require("express-validator");
class Validator {
    constructor() {
        this.signValidation = [
            (0, express_validator_1.body)('username')
                .notEmpty()
                .withMessage('userame is required')
                .isLength({ min: 2 })
                .withMessage('userame must be at least 2 characters long'),
        ];
        this.validate = (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array().map(error => error.msg) }); // Respond with error messages
                return;
            }
            next();
        };
    }
}
exports.Validator = Validator;

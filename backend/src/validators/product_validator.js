import {body,validationResult} from 'express-validator';

const validateRequest = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            message:"Validation failed",
            errors:errors.array()
        });
    }
    next();
}

export const validateCreateProduct = [
    body('title').notEmpty().isString().withMessage("Title is required and must be a string"),
    body('description').notEmpty().isString().withMessage("Description is required and must be a string"),
    body('priceAmount').notEmpty().isFloat({gt:0}).withMessage("Price amount is required and must be a positive number"),
    body('priceCurrency').notEmpty().isString().withMessage("Price currency is required and must be a string"),
    validateRequest
];
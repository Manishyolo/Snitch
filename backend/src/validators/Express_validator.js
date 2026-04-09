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



export const validateRegisterUser = [
    body('email').isEmail().withMessage("Please provide a valid email"),
    body('contact').isMobilePhone('any').withMessage("Please provide a valid contact number"),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body('fullname').notEmpty().isString().withMessage("Full name is required"),
    validateRequest
]
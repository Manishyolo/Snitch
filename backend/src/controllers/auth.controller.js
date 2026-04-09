import userModel from '../models/user.model.js';



export async function RegisterController(req,res){
    try {
         
        const {email,contact,password,fullname} = req.body;
 
        const exitingUser = await userModel.findOne({
            $or:[
                {email},
                {contact}
            ]
        })

        if(exitingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists with this email or contact"
            })
        }


        const createUser = await userModel.create({
            email,
            contact,
            password,
            fullname
        })
            
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:createUser
        })

    } catch (error) {
        console.error("Error in RegisterController:", error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
     
}
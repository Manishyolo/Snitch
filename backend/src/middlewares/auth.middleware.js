import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import {config} from '../config/config.js';


export async function authenticateUser(req,res,next){
          
     const token = req.cookies.token;

     if(!token){   
        return res.status(401).json({message:"Unauthorized"})
      }
 
      try {
           const decoded = jwt.verify(token,config.JWT_SECRET);
           const user = await userModel.findById(decoded.id);

           if(!user){
            return res.status(401).json({message:"Unauthorized"})
           }

           if(user.role !== "seller"){
            return res.status(403).json({message:"Forbidden"})
           }

           req.user = user;
           next();
            
      } catch (error) {
        console.error("Error in authenticateUser middleware:", error);
        return res.status(401).json({message:"Unauthorized"})
      }

}
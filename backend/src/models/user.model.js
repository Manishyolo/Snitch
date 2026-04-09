import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
      
    email:{type:String,required:true,unique:true},
    contact:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    fullname:{type:String,required:true},
    role:{
        type:String,
        enum:["buyer","seller"],
        default:"buyer"
    }

})
userSchema.pre("save",async function(){
   if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10);
   }
   
})

userSchema.methods.comparePassword = async function(password){
     const isMatch = await bcrypt.compare(password,this.password);
        return isMatch;
}
const userModel = mongoose.model("Users",userSchema);
export default userModel;
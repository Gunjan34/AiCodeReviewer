const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Register User
const signup = async (req, res, next) => {
  try {
      console.log("=== SIGNUP FUNCTION CALLED ===");
     console.log("Request Body:", req.body);
    const { Name, Email, Password } = req.body;
  
    const user = await User.findOne({ Email }); 

    if (user) { 
      return res
        .status(401)
        .json({ success: false, message: "User already Exists" });
    }
    const hashPassword = await bcrypt.hash(Password, 10);
    const newUser = new User({
      Name,
      Email,
      Password: hashPassword,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "User Registerd Successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
return res.status(500).json({ success: false, message: "Error in Adding User", error: error.message });

  }
};

//Login User
const login = async(req,res,next)=>{
try {
  const {Email,Password} = req.body;
  const user = await User.findOne({Email});
  if(!user){
    return res.status(401).json({success:false,message:"User does not exist"});
  }

//Compare Password
  const checkPassword = await bcrypt.compare(Password,user.Password);
  if(!checkPassword){
    return res.status(401).json({success:false,message:"Wrong Credentials"});
  }

//Generate Token
const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:"5h"});
 return res.status(200).json({success:true,token,user,message:"User Login successfully"});
} catch (error) {
  return res.status(500).json({success:false,message:"Error in login user",error:error.message});
}
}



module.exports = { signup ,login};

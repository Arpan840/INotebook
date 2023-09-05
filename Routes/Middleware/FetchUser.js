const jwt=require("jsonwebtoken")
const secretKet = "ArpanIsA$ad$oy";
const fetchUser=async(req,res,next)=>{
    const token=req.header("auth-token")
   
    if(!token)
    {
       throw new Error("Please send a valid token")
    }
    try {
        const data = jwt.verify(token, secretKet);
        req.user = data.user;
        next();
      } catch (err) {
        console.error(err.message);
    return res.status(401).json({ msg: "Token is not valid" });
      }
    };
module.exports=fetchUser
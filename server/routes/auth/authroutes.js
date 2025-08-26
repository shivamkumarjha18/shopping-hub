const express =require('express')
const {registerUser,loginUser,logoutUser, authMiddleware}=require('../../controllers/auth/authcontroller.js')
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get('/check-auth',authMiddleware,(req,res)=>{
    res.json({
        success:true,
        message:"User is authenticated",
        user:req.user
    })
})
module.exports = router;

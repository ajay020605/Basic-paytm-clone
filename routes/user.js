const express = require("express");
const router = express.Router();
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifyToken = require("../middlewares/auth")

router.use(express.json());

const signUpSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
  username: zod.string(),
  
});

router.post('/signup', async (req, res) => {
  const result = signUpSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(409).json({
      errors: "wrong inputs",
    });
  }

  const { firstName, lastName, username, password  } = result.data;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        error: 'Username already taken',
      });
    }

    
    const newUser = new User({
      firstName,
      lastName,
      username,
      password,
       
    });

    await newUser.save();

    const token = jwt.sign(
      { username: newUser.username, id: newUser._id },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      message: "User registered successfully",
      token: `${token}`,
    });
  } catch (err) {
    console.log('signup error', err.message);
    res.status(500).json({
      error: "something went wrong",
    });
  }
});

const loginSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post('/login', async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  console.log(req.body , result );

  if (!result.success) {
    return res.status(409).json({
      error: "wrong inputs",
    });
  }

  const { username, password } = result.data;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        errors: "invalid username or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        errors: "wrong password",
      });
    }

    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      message: "login successful",
      token: `${token}`,
    });
  } catch (err) {
    console.log('login error', err.message);
    res.status(500).json({
      error: "something went wrong",
    });
  }
});

router.get('/allUser', verifyToken , async (req,res)=>{
    const searchQuery = req.query.search || "";
    console.log(req.query.search)
    try{
        const users = await User.find({ _id: { $ne: req.user.id }, // 👈 exclude current user
        $or:[
        { firstName: { $regex: searchQuery, $options: "i" } },
        { lastName: { $regex: searchQuery, $options: "i" } },
        { username: { $regex: searchQuery, $options: "i" } },
        ],}).select("-password");
        res.json({users})
        

    }
    
    catch(err){
        console.error("Error fetching users:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

const changePasswordSchema = zod.object({
  
  oldPassword: zod.string(),
  newPassword: zod.string(),
});


router.put('/profile',verifyToken , async (req,res)=>{

    const result = changePasswordSchema.safeParse(req.body);
    if (!result.success) {
    return res.status(400).json({ error: "Invalid inputs" });
    }

    const {  oldPassword, newPassword } = result.data;

    try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.json({
        errors: "invalid username or password",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.json({
        errors: "wrong password",
      });
    }

    user.password = newPassword;
    await user.save();
   

    res.status(200).json({
      message: "Password updated successfully",
      
    });
  } catch (err) {
    console.log('login error', err.message);
    res.status(500).json({
      error: "something went wrong",
    });
  }
})


module.exports = router;

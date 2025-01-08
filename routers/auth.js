import express from "express";
const router = express.Router();
import User from "../models/User.js";
import joi from "joi";
import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'


let signupSchema = joi.object({
  fullname: joi.string().alphanum().min(3).max(30).required(),
  firstname: joi.string().alphanum().min(3).max(30).required(),
  role: joi.string(),
  password: joi.string().min(3).max(30),

  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});
let loginSchema = joi.object({
 

  password: joi.string().min(3).max(30),

  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

router.post("/register", async function (req, res) {
  const { error, value } = signupSchema.validate(req.body);
  
  if (error) {
    return res.status(404).json({
        msg: error.message
    })
  }

  const existUser = await User.findOne({email : value.email})
 if (existUser) {
    return res.status(405).json({
        msg: "user already exist plz login "
    })
 }
  
const hashPassword = await  bcrypt.hash(value.password , 12)
console.log("hashPassword",hashPassword);


value.password = hashPassword

let newUser = new User({...value})

newUser = await newUser.save()

res.status(201).json({
    msg: "user add successFull",
    newUser: newUser
})



});

router.post("/login", async function (req, res) {
  const { error, value } = loginSchema.validate(req.body);
  
  if (error) {
    return res.status(404).json({
        msg: error.message
    })
  }

  const existUser = await User.findOne({email : value.email}).lean()
 if (!existUser) {
    return res.status(405).json({
        msg: "this email is not register"
    })
 }
  
const isValidPassword = await  bcrypt.compare(value.password , existUser.password)
console.log("isValidPassword",isValidPassword);
if (!isValidPassword) {
    return res.status(401).json({
      msg: "Invalid email or password"
    });
  }


var token = jwt.sign(existUser, process.env.JWT_SECRATE);
console.log('token',token);



res.status(201).json({
    msg: "user add successFull",
    token: token,
    User: existUser
   
})



});

export default router;

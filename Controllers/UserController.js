const express = require('express');
const bcrypt = require('bcryptjs')
const { hashPassword,} = require('../helper')
const UserModal = require('../Model/SignUpModel')

const router = express.Router();

router.post("/Signup", async (req, res) => {
    try {
      console.log(req.body)
      const existEmail = await UserModal.findOne({ UserEmail: req.body.uemail });

   
      if (existEmail) {
        return res.status(400).json("email already exists");
      }
      const hashPwd = await hashPassword(req.body.upass);
      console.log(hashPassword)
      const signUpData = await new UserModal({
        UserName:req.body.uname,
        UserEmail:req.body.uemail,
        UserPassword:hashPwd,
        UserType:req.body.utype,
      });
      const postUser = await signUpData.save();
      if (postUser) {
        return res.status(200).json("Registered successfully");
      }
    } catch (err) {
        // console.log(err)
        if(err.code===0){
            return res.status(400).json([err,"duplicate key found"]);
      }if(err.code===11000){
        return res.status(400).json(err);

      }
      return res.status(400).json(err);
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const validData = await UserModal.findOne({ email: req.body.email }).select('+password');
      if (!validData) {
        return res.status(400).json("Invalid email");
      }
    //   console.log(validData.password)
      const validPass = await validPassword(req.body.password, validData.password);

      if (validPass) {
        const userToken = await generateToken(validData);
        res.header(process.env.TOKEN_KEY, userToken).json(userToken);
      } else {
        return res.status(400).json("Invalid password");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router; 
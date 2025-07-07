const express= require('express');
const jwt= require('jsonwebtoken');
const userModel= require('../models/user');

const userRouter= express.Router();
jwtKey= "Kaizoku_ou_ni_ore_wa_naru";

userRouter.post('/signup', async(req, res)=>{
    const {fullName, email, password}= req.body; 
    // console.log(email);
    const errorUser= await userModel.findOne({email});
    if(errorUser) return res.json({error: "email already used"});
    else{
        const user=await userModel.create({fullName, email, password});
        
        const userPayload={
            fullName: user.fullName,
            email: user.email,
            _id: user._id
        }
        // console.log(userPayload);
        // return res.json(userPayload);

        jwt.sign({ userPayload }, jwtKey, { expiresIn: '2h' }, (err, token) => {
            if (err) res.send({ error: "Something went wrong" });
            else {
                return res.send({
                    userPayload,
                    auth: token
                });
            }
        })

        
    }
})

userRouter.post('/login', async(req, res)=>{
    const {email, password}= req.body;
    // console.log(email);
    const user=await userModel.findOne({email});
    // console.log(user);
    if(!user) res.json({error: 'user not found'});
    else{
        if(user.password!==password) return res.json({error: 'wrong password'});
        else {
            const userPayload= {
                fullName: user.fullName,
                email: user.email,
                _id: user._id
            }
            jwt.sign({userPayload}, jwtKey, {expiresIn: '2h'}, (err, token)=>{
                if(err) res.send({error: "Something went wrong"});
                else{
                    return res.send({
                        userPayload, 
                        auth: token
                    });
                }
            })
        }
    }
})




module.exports= userRouter;


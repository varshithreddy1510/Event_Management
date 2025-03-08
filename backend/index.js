const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/user');
const app = express();
const Product = require('./db/Event'); 

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

app.use(express.json());
app.use(cors());

app.post("/register", async (req,res)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err,token)=>{
        if(err){
            res.send({ result: "something went wrong" })
        }
        res.send({result, auth: token})
    })
})

app.post("/login",async (req,res)=>{
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err,token)=>{
                if(err){
                    res.send({ result: "something went wrong" })
                }
                res.send({user, auth: token})
            })
        }else{
            res.send({result:'No User Found'})
        }
    }else{
        res.send({result:'No User Found'})
    }
})

app.post("/add-event",verifyToken, async (req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get("/products",verifyToken,async (req,res)=>{
    let products = await Product.find();
    if(products.length>0){
        res.send(products);
    }else{
        res.send({result:'No Products Found'})
    }
})

app.delete("/product/:id",verifyToken, async (req,res)=>{
    // res.send(req.params.id)
    const result = await Product.deleteOne({_id:req.params.id});
    res.send(result);
})

app.get("/product/:id",verifyToken, async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }else{
        res.send({result:'No Product Found'})
    }
})

app.put("/product/:id",verifyToken, async (req,res)=>{
    let result = await Product.updateMany(
        {_id:req.params.id},
        {
            $set : req.body
        }
    )
    res.send(result)
})

app.get("/search/:key", verifyToken, async (req,res)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {location:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {guest:{$regex:req.params.key}}
        ]
    });
    res.send(result)
})

app.get("/profile/:id",verifyToken,async (req,res)=>{
    let result = await User.findOne({_id:req.params.id})
    res.send(result)
})

function verifyToken(req,res,next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        // console.log("Middleware called  ",token);
        Jwt.verify(token, jwtKey, (err, valid)=>{
            if(err){
                res.status(401).send({result: "Please provide valid token"})
            }else{
                next();
            }
        })
    }else{
        res.status(403).send({result: "Please add token with header"})
    }
    // console.log("Middleware called  ",token)
}

app.listen(5000)
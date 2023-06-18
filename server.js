const express = require('express');
const Razorpay = require('razorpay');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || '3000';
const path = require('path');
const ejs = require('ejs');

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'/views/css')));
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
	res.render('index.ejs');
})

app.get('/index.ejs',(req,res)=>{
	res.render('index.ejs');
})

app.get('/about.ejs',(req,res)=>{
	res.render('about.ejs');
})

app.get('/contact.ejs',(req,res)=>{
	res.render('contact.ejs');
})

app.post("/payment",async (req,res) =>{
    let {amount} = req.body;

    var instance = new Razorpay({
        key_id : "rzp_test_6rssfN0bqls1V2" ,
        key_secret:"RhnBWQeov6Dj8kgNhJxAKII5" ,
    });

    let order = await instance.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt#1",
    })
    res.status(201).json({
        success:true,
        order,
        amount
    })
});

app.listen(PORT,()=>{
    console.log("Server is running in port", PORT);
});

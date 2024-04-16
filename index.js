const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const port=process.env.PORT || 3000;
const path=require('path')
const passport = require('passport'); 
const session=require('express-session')
const passportLocal=require('./config/passportLocal');
const connectFlash=require('connect-flash')
const customFlash=require('./config/customFlash')

const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
}).then((res)=>{
    console.log('db is connected');
}).catch((error)=>{
    console.log(error);
})

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'))
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'assets')))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use(session({
    name:'RnW',
    secret:'abc',
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*100*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuth);

app.use(connectFlash());
app.use(customFlash.setFlash);

app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(err);
    }else{
        console.log(`server listening on ${port}`);
    }
})






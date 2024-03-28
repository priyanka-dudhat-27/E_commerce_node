const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const port=process.env.PORT || 3000;
const path=require('path')
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

app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(err);
    }else{
        console.log(`server listening on ${port}`);
    }
})






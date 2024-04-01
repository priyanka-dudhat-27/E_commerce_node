const passport=require('passport');
const localStretegy=require('passport-local').Strategy;
const Admin=require('../models/adminModel')

passport.use(new localStretegy({
    usernameField:"email",
},async function(email,password,done){
    let checkEmail=await Admin.findOne({email:email});
    if(checkEmail){
        if(checkEmail.password==password){
            return done(null,checkEmail)
        }
    }
    else{
        return done(null,false);
    }
}))

passport.serializeUser(function(user,done){
    console.log(user)
    return done(null,user.id);
})

passport.deserializeUser(async (id,done)=>{
    let adminData=await Admin.findById(id);
    if(adminData){
        return done(null,adminData);
    }
    else{
        return done(null,false);
    }
})

passport.setAuth=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.admin=req.user;
    }
    next();
}

passport.checkAuth=function(req,res,next){
    if(req.user){
        next();
    }else{
        return res.redirect('/admin')
    }
}
module.exports=passport;
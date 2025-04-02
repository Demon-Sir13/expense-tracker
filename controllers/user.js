const User = require("../models/user.js");

module.exports.renderSignupForm =  (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup = async(req,res)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registredUser=  await User.register(newUser, password);
        console.log(registredUser);
        req.login(registredUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to expense tracker");
            res.redirect("/expenses");
        })
    
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }

}

module.exports.renderLoginform =  (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async(req,res)=>{
        req.flash("success", "Welcome back to expense-tracker :). You are logged In");
        let redirectUrl = res.locals.redirectUrl || "/expenses";
        res.redirect(redirectUrl);
}
module.exports.logout =  (req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success", "you are logged out now");
        res.redirect("/expenses");
    })
}
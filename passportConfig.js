const LocalStrategy = require('passport-local').Strategy
const passport = require('passport');
const {User} = require('./database')
exports.initializingPassport = (passport)=>{
    passport.use(new LocalStrategy(async(username,password,done)=>{

    try{
        const user = await User.findone({username});

        if(!user) return done(null,false);
    
        if(user.password !== password) return done(null,false);
    
        return done(null,user)
    }
    catch(error){
        
        return done(error,false)
    }
    
    }))

    //user se id banata hai
    passport.serializeUser((user,done)=>{
      done(null,user.id);
    });

    //id se user dhundta hai
    passport.deserializeUser(async(id,done)=>{
        try{
            const user =  await User.findById(id);

            done(null , user)
        } catch(error){
            done(error,false)
        }
    })
};

exports.isAuthenticated = (req, res, next)=>{
    if(req.user) return next();

    res.redirect("/login")
}

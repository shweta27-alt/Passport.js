const mongoose = require("mongoose");
mongoose.set('strictQuery',false)

exports.connectMongoose = () =>{
    mongoose.connect("mongodb://127.0.0.1:27017/passport")
    .then(e=>console.log(`connected to mongodb:${e.connection.host}`))
    .catch(e=>console.log(e));
}

const userSchema =  new mongoose.Schema({
    name: String,

    username :{
        type:String,
        required:true,
        unique:true,
    },

    passowrd:String,
})

exports.User = mongoose.model("User", userSchema)
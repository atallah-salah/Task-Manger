const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const crypto = require('crypto');

const JwtSecret = "C&z_Xh!Nf*S?/ec$r)@zPYy*S?/ec$ret-XtS(_=%fkm+p0*S?/ec$r_Z9^C";

const UserSchema = new mongoose.Schema({
  email:{
    type:String,
    requireed:true,
    minlength:1,
    trim:true,
    unique:true
  },
  password:{
    type:String,
    requireed:true,
    minlength:8
  },
  sessions:[{
    token:{
      type:String,
      requireed:true
    },
    expiresAt:{
      type:Number,
      requireed:true
    }
  }]
})

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  return _.omit(userObject, ['password','sessions']);
}

UserSchema.methods.generateAccessAuthToken = function() {
  const user = this;
  return new Promise((resolve, reject) => {
    jwt.sign({_id:user._id.toHexString()},JwtSecret,{expiresIn:"15m"},(error,token)=>{
      if(!error){
        resolve(token);
      }else{
        reject();
      }
    })
  });
}

UserSchema.methods.generateRefreshAuthToken = function() {  
  return new Promise((resolve, reject) => {    
    crypto.randomBytes(64,(error,buf)=>{
      if(!error){
        let token = buf.toString('hex');
        return resolve(token);
      }
    })
  })
}

UserSchema.methods.createSession = function () {
  let user = this;
  return user.generateRefreshAuthToken().then(refreshToken=>{
    return saveSessionToDatabase(user,refreshToken);
  }).then(refreshToken=>{
    return refreshToken;
  }).catch(error=>{
    return Promise.reject('Failed to save session to database.\n'+error)
  })
}

UserSchema.statics.findByIdAndToken = function (_id,token) {
   const User = this;
   return User.findOne({
     _id,
     "sessions.token":token
   });
}

UserSchema.statics.findByCredentials = function (email,password) {
  let User = this;
  return User.findOne({email}).then(user =>{
    if(!user) return Promise.reject();

    return new Promise((resolve, reject) => {
      bcrypt.compare(password,user.password,(error,res)=>{
        if(res) resolve(user);
        else{
          reject();
        }
      })
    });
  })
}

UserSchema.statics.hasRefreshTokenExpired = (expiresAt)=>{
  let secondsSinceEpoch = Date.now() / 1000;
  if(expiresAt > secondsSinceEpoch){
    return false;
  }else{
    return true;
  }
}

UserSchema.pre("save",function(next) {
  let user = this;
  let costFactor = 10;
  
  if(user.isModified("password")){
    bcrypt.genSalt(costFactor,(error,salt)=>{
      bcrypt.hash(user.password,salt,(error,hash)=>{
        user.password = hash;
        next();
      })
    })
  }else{
    next();
  }
})

let saveSessionToDatabase = (user,refreshToken) =>{
  return new Promise((resolve, reject) => {
    let expiresAt = generateRefreshTokenExpiryTime();

    user.sessions.push({'token':refreshToken,expiresAt });

    user.save().then(()=>{
      return resolve(refreshToken);
    }).catch(error=>{
      reject(error);
    })
  })
}

let generateRefreshTokenExpiryTime = ()=>{
  let daysUntillExpire = "10";
  let secondsUntillExpire = ((daysUntillExpire * 24) * 60) *60;
  return ((Date.now() / 1000) + secondsUntillExpire);
}

const User = mongoose.model("User",UserSchema);


module.exports = {User}
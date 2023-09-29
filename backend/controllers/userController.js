const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/set-email");
const jwt = require("jsonwebtoken"); // authentication
const { expressjwt } = require("express-jwt"); // authorization

// to register user.
exports.postRegister = async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  // check for unique email:
  User.findOne({ email: user.email })
    .then(async (data) => {
      if (data) {
        return res.status(400).json({
          error: "email must be unique. Or Email is already registered.",
        });
      } else {
        user = await user.save();
        if (!user) {
          return res.status(400).json({ error: "something went wrong." });
        }
        // save token in the token model:
        let token = new Token({
          token: crypto.randomBytes(16).toString("hex"),
          userId: user._id,
        });
        token = await token.save();
        if (!token) {
          return res.status(400).json({ error: "failed to store token." });
        }

        const url= process.env.FRONTEND_URL + '\/email\/confirmation\/ ' + token.token



        // send email process:
        sendEmail({
          from: "no-reply@ecommerce.com",
          to: user.email,
          subject: "Email verification link",
          text: `Hello, \n\n 
                Please verify your emailby click in the below link:\n\n
                http:\/\/${req.headers.host}\/api\/confirmation\/${token.token}`,
                html: `<h1> Verify your email </h>
                <a href='${url}'>Click to verify </a>
                `
          // http://localhost:5000/api/confirmation/4ed22082a2edcb278
        });

        res.send(user);
      }
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
};

// confirming the email:
exports.postEmailConfirmation = (req, res) => {
  // at first, find the valid or matching token.
  Token.findOne({ token: req.params.token })
    .then((token) => {
      if (!token) {
        return res
          .status(400)
          .json({ error: "Invalid Token or Token may have expired." });
      }
      // if we find the valid token then find the valid user for this token.
      User.findOne({ _id: token.userId })
        .then((user) => {
          if (!user) {
            return res.status(400).json({
              error: "We are unable to find the valid user for this token.",
            });
          }
          // check if user is already verified or not.
          if (user.isVerified) {
            return res
              .status(400)
              .json({ error: "email is already verified, login to continue." });
          }

          // save the verified user
          user.isVerified = true;
          user
            .save()
            .then((user) => {
              if (!user) {
                return res
                  .status(400)
                  .json({ error: "Failed to verify your email." });
              }
              res.json({
                message:
                  "Congrats, Your email has been verified. login to continue.",
              });
            })
            .catch((err) => {
              return res.status(400).json({ error: err });
            });
        })
        .catch((err) => {
          return res.status(400).json({ error: err });
        });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
};

// sign in process


// sign in process

exports.signIn= async(req,res)=>{
  const {email,password}= req.body 
  // at first check email is registered in the database or not
  const user= await User.findOne({email})
  if(!user){
      return res.status(403).json({error:'Sorry,the email you provided is not found in our System.'})
  }

  // if email found then check password for that email
  if(!user.authenticate(password)){
      return res.status(400).json({error:'Email and password does not match'})
  }

  // check if user is verified or not
  if(!user.isVerified){
      return res.status(400).json({error:'verify your email first to continue'})
  }
  // now generate token with user id,role and jwt secret
const token=jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET)
// store token in the cookie
res.cookie('myCookie',token,{expire:Date.now()+99999})

// return user information to frontend 

const {_id,name,role}=user
return res.json({token,user:{name,email,role,_id}})


}
// forget password.
exports.forgetPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(400)
      .json({ error: "The email you provided is not found in our system." });
  }
  // save token in the token model:
  let token = new Token({
    token: crypto.randomBytes(16).toString("hex"),
    userId: user._id,
  });
  token = await token.save();
  if (!token) {
    return res.status(400).json({ error: "failed to store token." });
  }

  // send email process:
  sendEmail({
    from: "no-reply@ecommerce.com",
    to: user.email,
    subject: "Password reset link",
    text: `Hello, \n\n 
                Please reset your password by  click in the below link:\n\n
                http:\/\/${req.headers.host}\/api\/resetpassword\/${token.token}`,
    // http://localhost:5000/api/confirmation/4ed22082a2edcb278
  });

  res.json({ message: "Password reset link has been sent to your email." });
};

// reset password:
exports.resetPassword = async (req, res) => {
  // find the valid or matching token.
  let token = await Token.findOne({ token: req.params.token });
  if (!token) {
    return res
      .status(400)
      .json({ error: "Invalid token or token may have expired." });
  }
  // if token found then find the valid user for this token.
  let user = await User.findOne({ _id: token.userId });
  if (!user) {
    return res
      .status(400)
      .json({ error: "We are unable to find the valid user for this token." });
  }
  user.password = req.body.password;
  user = await user.save();
  if (!user) {
    return res.status(400).json({ error: "Failed to reset the password." });
  }
  res.json({ message: "Password has been reset successfully." });
};

// user list:
exports.userList = async (req, res) => {
  const user = await User.find().select("-hashed_password").select("-salt");
  if (!user) {
    return res.status(400).json({ error: "Something went wrong." });
  }
  res.send(user);
};

// user details:
exports.userDetails = async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-hashed_password")
    .select("-salt");
  if (!user) {
    return res.status(400).json({ error: "Something went wrong." });
  }
  res.send(user);
};

// require signin: sign xa ki xaina matrai herxa.
exports.requireSignin=
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    //algorithms: ['RS256']
  })

// admin middleware:
exports.requireAdmin=(req,res,next)=>{
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth' // auth bata role check garne.
    //algorithms: ['RS256']
  })(req,res,(err)=>{
    if(err){
      return res.status(401).json({error:"Unauthorized: You are not authorized admin."})
    }
    if(req.auth.role===1){
      next()
    } // admin ko role 1 rakheko.
    else{
      return res.status(403).json({error:"You are not authorized to access this page."})
    }
  })
}

// user middleware:
exports.requireUser=(req,res,next)=>{
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth' // auth bata role check garne.
    //algorithms: ['RS256']
  })(req,res,(err)=>{
    if(err){
      return res.status(401).json({error:"Unauthorized: You are not authorized user."})
    }
    if(req.auth.role==0){
      next()
    } // admin ko role 1 rakheko.
    else{
      return res.status(403).json({error:"You are not authorized to access this page."})
    }
  })
}

// signout
exports.signOut=(req,res)=>{
  res.clearCookie('myCookie')
  res.json({message:"Signout success."})
}


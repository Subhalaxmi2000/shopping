const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next)=>{
    const token = req.header( 'Authorization')
    if(!token){
        return res.status(401).json({error: "Access denied "});
    }
    try{
       const decode= jwt.verify(token,'test12345')
       req.user=decoded;
       next();
    }catch(err){
    res.status(400).json({error:'Invalid token'});
    }
}
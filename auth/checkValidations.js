const jwt = require("jsonwebtoken");
module.exports = {

    checkToken:(req, res, next)=>{
        //token
        let token = req.get("authorization");

        if(token){
            token = token.slice(7);
            jwt.verify(token, process.env.JWT_KEY, (err, decoded)=>{
                if(err){
                    return res.json({
                        status:false,
                        message:"invalid token"
                    })        
                }else{
                    req.decoded = decoded
                    next()
                }
            })


        }else{
            return res.json({
                status:false,
                message:"access denied"
            })
        }

    }
}
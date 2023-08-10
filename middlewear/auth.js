import jwt  from "jsonwebtoken"

export const checkauth = async(req,res,next)=>{



    try {
        let token = req.headers.authorization

        if(token){
            token = token.split(" ")[1]
            let user = await jwt.verify(token,"hdkhkjfhdkjfhkjh")
            req.userinfo = user.credential
            next()

        }else{
            res.status(401).json({
                message:"anauthorize request"
            })
        }
        
    } catch (error) {
        res.status(401).json({
            message:"anauthorize request"
        })
        
    }

   
    
    



}
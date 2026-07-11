import jwt from 'jsonwebtoken';
export const authMiddleware=(req:any, res:any)=>{
    try {    
        const token=req.cookies.token;
        if(!token){
            return {decoded:null,token:null};
        }
        const decoded=jwt.verify(
            token, 
            process.env.ACCESS_SECRET_KEY as any
        );    
        return {
            decoded,
            token
        }
    } catch (error) {       
        return {decoded:null, token:null};
    }
}

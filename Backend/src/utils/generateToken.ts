import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateAccessToken = (userData: any) => {
    const accessToken = jwt.sign(
        {
            id: userData.id,
            role: userData.role
        },
        process.env.ACCESS_SECRET_KEY as any,
        {
            expiresIn: '15m'
        }
    )
    return accessToken;
}

export const generateRefreshToken=(userData: any)=>{
    const refreshToken=jwt.sign(
        {
            id:userData.id,
            role:userData.role
        },
        process.env.REFRESH_SECRET_KEY as any,
        {
            expiresIn:'15d'
        }
    )
    return refreshToken;
}
import jwt from 'jsonwebtoken';
export const authMiddleware = (req: any, res: any) => {

    console.log("Cookies:", req.cookies);
    console.log("Headers auth:", req.headers.authorization);

    try {
        const token = req.cookies.token;
        console.log("Token found:", token);
        if (!token) {
            return { decoded: null, token: null };
        }
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_SECRET_KEY as any
        );
        return {
            decoded,
            token
        }
    } catch (error:any) {
        console.log("JWT ERROR NAME:", error.name);
        console.log("JWT ERROR MSG:", error.message);
        return { decoded: null, token: null };
    }
}

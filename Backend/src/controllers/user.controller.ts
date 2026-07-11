import { AppDataSource } from "../config/db.ts"
import { User } from "../models/user.ts";
import bcrypt from 'bcrypt';
import { validateUserData } from "../validators/userValidate.ts";
import { generateAccessToken } from "../utils/generateToken.ts";
import jwt from 'jsonwebtoken';

export const userResolver = {
    Query:{
        
        getUsers:async()=>{
            const userRepo = AppDataSource.getRepository(User);
            const users =  await userRepo.find();
            if(!users || users.length===0){
                return [];
            }
            return users
        },

        getMe:async(_:any, __:any, context:any)=>{
            try {
                if(!context.user){
                    throw null;
                }
                const userRepo = AppDataSource.getRepository(User);
                const user =  await userRepo.findOne({where:{id:context.user.id}});
                return user;
            } catch (error) {
                throw error;
            }
        }
    },

    Mutation: {
        signup: async (_: any, userData: any) => {
            const inputFields = ["firstName", "lastName", "email", "password", "confirmPassword", "role"];
            validateUserData(userData, inputFields);
            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({ where: { email: userData.email } });

            if (user)  throw new Error("You are already registered.");
            
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const newUser = userRepo.create(
                {
                    id: userData.id,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    password: hashedPassword,
                    role: userData.role
                }
            )
            await userRepo.save(newUser);
            return {
                message: "You have successfully registered",
                user: newUser
            }
        },

        signin: async (_: any, userData: any, context: any) => {
            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({ where: { email: userData.email } });
            const inputFields = ["email", "password"];
            validateUserData(userData, inputFields);

            if (!user){
                throw new Error("User does not exist.");
            }

            const validUser = await bcrypt.compare(userData.password, user.password);    
            if (!validUser){
                throw new Error("Invalid Credentials");
            }
            const token = generateAccessToken(user);
            context.res.cookie('token', token,
                {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax"
                }
            );
            return {
                message: 'You have successfully logged in.',
                token,
                user
            }
        },

        forget:async(_:any, userData:any)=>{
            const userRepo=AppDataSource.getRepository(User);
            const user=await userRepo.findOne({where:{email:userData.email}});
            const inputFields = ["email", "password", "confirmPassword"];
            validateUserData(userData, inputFields);

            if(!user) throw new Error("User does not exist.");
            
            const hashedPassword=await bcrypt.hash(userData.password, 10);
            user.email=userData.email;
            user.password=hashedPassword;
            await userRepo.save(user);

            return {
                user,
                message:"Password has been updated successfully."
            }
        }
    },
}
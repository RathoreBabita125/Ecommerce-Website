import { AppDataSource } from "../config/db.ts"
import { Address } from "../models/address.ts"
import { User } from "../models/user.ts";

/**
 * 
 */
export const addressResolver = {
    Query: {
        getAddress:async(_:any, addressData:any)=>{
            const addressRepo = AppDataSource.getRepository(Address);
            const allAddresses=await addressRepo.find({
                relations:{
                    user:true
                }
            });
            if(!allAddresses){
                throw new Error("No Address Found.");
            }
            return allAddresses;
        }
    },

    Mutation: {
        createAddress: async (_: any, addressData: any) => {
            try {
                const addressRepo = AppDataSource.getRepository(Address);
                const userRepo = AppDataSource.getRepository(User);
                const user = await userRepo.findOne({ where: { id: addressData.user } });
                const address = await addressRepo.findOne({
                    where: {
                        id: addressData.id
                    },
                    relations: {
                        user: true
                    }
                })
                if (!user) {
                    throw new Error("User does not exist.");
                }
                if (address) {
                    throw new Error("Address is already existed");
                }
                const newAddress = addressRepo.create({
                    id: addressData.id,
                    user: user,
                    phone: addressData.phone,
                    address_line1: addressData.address_line1,
                    address_line2: addressData.address_line2,
                    landmark: addressData.landmark,
                    city: addressData.city,
                    state: addressData.state,
                    pincode: addressData.pincode,
                    country: addressData.country,
                    type: addressData.type
                })
                await addressRepo.save(newAddress);
                return {
                    message: "you have successfuly created address",
                    address: newAddress
                }
            } catch (error) {
                throw new Error(`${error} Address creation is failed.`);
            }
        },

        updateAddress: async (_: any, addressData: any) => {
            try {
                const addressRepo = AppDataSource.getRepository(Address);
                const userRepo = AppDataSource.getRepository(User);
                const user = await userRepo.findOne({ where: { id: addressData.user } });
                const address = await addressRepo.findOne({
                    where: {
                        id: addressData.id
                    },
                    relations: {
                        user: true
                    }
                })
                if (!user) {
                    throw new Error("User does not exist.");
                }
                if (!address) {
                    throw new Error("Address does not exist.");
                }
                address.user = user,
                    address.phone = addressData.phone,
                    address.address_line1 = addressData.address_line1,
                    address.address_line2 = addressData.address_line2,
                    address.landmark = addressData.landmark,
                    address.city = addressData.city,
                    address.state = addressData.state,
                    address.pincode = addressData.pincode,
                    address.country = addressData.country,
                    address.type = addressData.type

                await addressRepo.save(address);
                return {
                    message: "you have successfuly updated address",
                    address: address
                }
            } catch (error) {
                throw new Error(`${error}, Address updation failed.`);
            }
        },

        deleteAddress: async (_: any, addressData: any) => {
            try {        
                const addressRepo = AppDataSource.getRepository(Address);
                const address = await addressRepo.findOne({
                    where: {
                        id: addressData.id
                    }
                })
                if(!address){
                    throw new Error("Address does not exist.");
                }
                await addressRepo.remove(address);
                return{
                    message:"Address is deleted successfully."
                }
            } catch (error) {
                  throw new Error(`${error}, Address deletion failed.`);
            }
        }
    }
}
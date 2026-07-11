import { AppDataSource } from "../config/db.ts"
import { Coupon } from "../models/coupon.ts"
import { User } from "../models/user.ts";

function generateCouponCode(): string {
    const randomNum = Math.floor(100 + Math.random() * 900); 
    return `SHOPL${randomNum}`;
}

export const couponResolver = {
    Query: {
        getCoupons: async (_: any, couponData: any) => {
            const couponRepo = AppDataSource.getRepository(Coupon);
            const allCoupons = await couponRepo.find();
            if (!allCoupons) {
                throw new Error("Coupon does not exist.");
            }
            return allCoupons;
        }
    },

    Mutation: {
        createCoupon: async (_: any, couponData : any) => {
            const couponRepo = AppDataSource.getRepository(Coupon);
            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({ where: { id: couponData.user } });
            const couponCode = await generateCouponCode();

            if (!user) {
                throw new Error("User not found");
            }

            const newCoupon = couponRepo.create({
                couponCode,
                discount: couponData.discount,
                minOrderValue: couponData.minOrderValue,
                expiryDate: couponData.expiryDate,
                isActive: couponData.isActive,
                user: user,
            });

            await couponRepo.save(newCoupon);

            return {
                message: "You have successfully created coupon.",
                coupon: newCoupon,
            };
        },

        updateCoupon: async (_: any, couponData: any) => {
            const couponRepo = AppDataSource.getRepository(Coupon);
            const coupon = await couponRepo.findOne({ where: { id: couponData.id } });
            
            if (!coupon) {
                throw new Error("Coupon does not exist.");
            }
                coupon.couponCode = couponData.couponCode,
                coupon.discount = couponData.discount,
                coupon.minOrderValue = couponData.minOrderValue,
                coupon.expiryDate = couponData.expiryDate,
                coupon.isActive = couponData.isActive

            await couponRepo.save(coupon);

            return {
                message: "Coupon has been updated successfully.",
                coupon
            }
        },

        deleteCoupon: async (_: any, couponData: any) => {
            const couponRepo = AppDataSource.getRepository(Coupon);
            const coupon = await couponRepo.findOne({ where: { id: couponData.id } });
            if (!coupon) {
                throw new Error("Coupon does not exist.");
            }
            await couponRepo.remove(coupon);
            return {
                message: "Coupon has been deleted successfully."
            }
        }
    }
}
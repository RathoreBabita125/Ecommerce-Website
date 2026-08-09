import { AppDataSource } from "../config/db.ts"
import { Wishlist } from "../models/wishlist.ts"
import { Product } from "../models/product.ts";
import { User } from "../models/user.ts";

export const wishlistResolver = {

    Query: {
        getWishlistItem: async () => {
            const wishlistRepo = AppDataSource.getRepository(Wishlist);
            const allItems = await wishlistRepo.find({
                relations: {
                    product: true,
                    user: true
                }
            })
            return allItems;
        },

        getMyWishlist:async(_:any, __:any, context:any)=>{
            const wishlistRepo = AppDataSource.getRepository(Wishlist);
            const allMyWishlistProduct = await wishlistRepo.find({
                where:{
                    user:{
                        id:context.user.id
                    }
                },
                relations: {
                    product: true,
                    user: true
                }
            })
            return allMyWishlistProduct;
        }
    },

    Mutation: {
        addToWishlist: async (_: any, wishlistData: any, context: any) => {

            if (!context.user) {
                throw new Error("Please login first to add item in wishlist");
            }

            const wishlistRepo = AppDataSource.getRepository(Wishlist);
            const productRepo = AppDataSource.getRepository(Product);

            const product = await productRepo.findOneBy({ id: wishlistData.product });

            if (!product) {
                throw new Error("Product not found");
            }

            const isExistingProduct = await wishlistRepo.findOne({
                relations: {
                    product: true,
                    user: true
                },
                where: {
                    product: {
                        id: wishlistData.product
                    },
                    user: {
                        id: context.user.id
                    }
                }
            });

            if (isExistingProduct) {
                throw new Error("This product is already in wishlist.");
            }

            const newItem = wishlistRepo.create({
                product,
                user: {
                    id: context.user.id
                },
                isWishlisted:true
            });

            const savedItem = await wishlistRepo.save(newItem);

            return {
                message: "Item has been added to wishlist.",
                wishlist: savedItem
            }
        },

        removeFromWishlist: async (_: any, wishlistData: any, context: any) => {
            const wishlistRepo = AppDataSource.getRepository(Wishlist);
           
            try {

                if (!context.user) {
                    throw new Error("You are not logged in. First login");
                }

                const wishlist = await wishlistRepo.findOne({
                    where: {
                        id: wishlistData.id
                    },
                    relations:{
                        user:true
                    }
                });

                if (!wishlist) {
                    throw new Error("Wishlist product not found.");
                }

                console.log("wishlist user name: ", wishlist.user.firstName);
                console.log("current user name: ", context?.user);
                
                if (wishlist.user.id !== context.user.id) {
                    throw new Error("You are not authorized to remove this item.");
                }

                await wishlistRepo.remove(wishlist);

                return {
                    message: "Product has been removed from wishlist",
                }

            } catch (error) {
                throw new Error((error as Error).message);
            }
        }
    }
}
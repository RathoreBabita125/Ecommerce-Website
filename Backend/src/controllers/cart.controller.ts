import { AppDataSource } from "../config/db.ts";
import { Cart } from "../models/cart.ts";
import { CartItem } from "../models/cart_item.ts";
import { Product } from "../models/product.ts";

export const cartResolvers = {
    Query: {
        getCart: async (_: any, __: any, context: any) => {
            const cartRepo = AppDataSource.getRepository(Cart);
            const cart = await cartRepo.findOne({
                where: {
                    user: {
                        id: context.user.id
                    }
                },
                relations: {
                    items: {
                        product: true
                    },
                }
            });
            return cart;
        },
    },

    Mutation: {

        addToCart: async (_: any, cartData: any, context: any) => {

            const cartRepo = AppDataSource.getRepository(Cart);
            const cartItemRepo = AppDataSource.getRepository(CartItem);
            const productRepo = AppDataSource.getRepository(Product);

            const product = await productRepo.findOneBy({ id: cartData.product });
            if (!product) throw new Error("Product not found");

            let cart = await cartRepo.findOne({
                where: {
                    user: {
                        id: context.user.id
                    }
                }
            });

            const existingProduct = await cartItemRepo.findOne({
                where: {
                    product: {
                        id: cartData.product
                    }
                }
            })

            if (existingProduct) {
                throw new Error("Product is already present in cart list. You can increase quantity.")
            }

            if (!cart) {
                cart = cartRepo.create({
                    user: {
                        id: context.user.id
                    }
                });
                await cartRepo.save(cart);
            }

            const cartItem = cartItemRepo.create({
                cart,
                product: product,
                quantity: cartData.quantity,
                price: product.price,
            });

            return await cartItemRepo.save(cartItem);
        },

        removeFromCart: async (_: any, cartData: any) => {
            const cartItemRepo = AppDataSource.getRepository(CartItem);
            await cartItemRepo.delete(cartData.id);
            return true;
        },

        inceaseQuantity: async (_: any, cartData: any, context: any) => {
            try {
                const cartItemRepo = AppDataSource.getRepository(CartItem);

                if (!context.user) {
                    throw new Error("You are not logged in. First login.")
                }

                const cartItem = await cartItemRepo.findOne({
                    where: {
                        id: cartData.id
                    }
                });

                if (!cartItem) {
                    throw new Error("Cart item not found.");
                }

                cartItem.quantity = cartItem.quantity + 1;

                await cartItemRepo.save(cartItem);

                return {
                    message: "The quantity has been increased successfully."
                }

            } catch (error) {
                throw new Error(`${(error as Error).message}`)
            }
        },

        decreaseQuantity: async (_: any, cartData: any, context: any) => {
            try {
                const cartItemRepo = AppDataSource.getRepository(CartItem);

                if (!context.user) {
                    throw new Error("You are not logged in. First login.")
                }

                const cartItem = await cartItemRepo.findOne({
                    where: {
                        id: cartData.id
                    }
                });

                if (!cartItem) {
                    throw new Error("Cart item not found.");
                }

                cartItem.quantity = cartItem.quantity - 1;

                await cartItemRepo.save(cartItem);

                return {
                    message: "The quantity has been decreased successfully."
                }

            } catch (error) {
                throw new Error(`${(error as Error).message}`)
            }
        },
    },
};
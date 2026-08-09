import { DataSource } from "typeorm";
import { Address } from "../models/address.ts";
import { Cart } from "../models/cart.ts";
import { Category } from "../models/category.ts";
import { Coupon } from "../models/coupon.ts";
import { Order } from "../models/order.ts";
import { OrderItems } from "../models/orderItem.ts";
import { Product } from "../models/product.ts";
import { Review } from "../models/review.ts";
import { User } from "../models/user.ts";
import { Wishlist } from "../models/wishlist.ts";
import { CartItem } from "../models/cart_item.ts";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Cel%Bd@2026',
    database: 'Ecommerce Website',
    // logging: true,
    synchronize: true,
    entities:[Address, Cart, Category, Coupon, Order, OrderItems, Product, Review, User, Wishlist, CartItem]
});




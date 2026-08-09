import { addressResolver } from "./address.controller.ts";
import { cartResolvers } from "./cart.controller.ts";
import { categoryResolver } from "./category.controller.ts";
import { couponResolver } from "./coupon.controller.ts";
import { productResolver } from "./product.controller.ts";
import { userResolver } from "./user.controller.ts";
import { wishlistResolver } from "./wishlist.controller.ts";

export const resolvers={
    Query:{
        ...userResolver.Query,
        ...productResolver.Query,
        ...categoryResolver.Query,
        ...addressResolver.Query,
        ...couponResolver.Query,
        ...cartResolvers.Query,
        ...wishlistResolver.Query
    },
    
    Mutation:{
        ...userResolver.Mutation,
        ...productResolver.Mutation,
        ...categoryResolver.Mutation,
        ...addressResolver.Mutation,
        ...couponResolver.Mutation,
        ...cartResolvers.Mutation,
        ...wishlistResolver.Mutation
    },
      
} 
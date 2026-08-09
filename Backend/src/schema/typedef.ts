import {gql} from "graphql-tag";
import { userSchema } from "./userSchema.ts";
import { productSchema } from "./productSchema.ts";
import { categorySchema } from "./categorySchema.ts";
import { addressSchema } from "./addressSchema.ts";
import { couponSchema } from "./couponSchema.ts";
import { cartSchema } from "./cartSchema.ts";
import { wishlistSchema } from "./wishlistSchema.ts";

export const typeDefs = gql`
    scalar Date
    ${userSchema}
    ${productSchema}
    ${categorySchema}
    ${addressSchema}
    ${couponSchema}
    ${cartSchema}
    ${wishlistSchema}
`


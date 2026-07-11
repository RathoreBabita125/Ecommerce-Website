import {gql} from 'graphql-tag';

export const couponSchema=gql`
    type Coupon{
        id:ID!
        couponCode:String
        discount:Int
        minOrderValue:Int
        expiryDate:Date
        isActive:Boolean
        user:User
    }
    
    type CouponResponse{
        message:String
        coupon:Coupon
    }

    type Query{
        getCoupons:[Coupon]
    }

    type Mutation{

        createCoupon(
            discount:Int
            minOrderValue:Int
            expiryDate:Date
            isActive:Boolean
            user:ID
            
        ):CouponResponse

        updateCoupon(
            id:ID!
            discount:Int
            minOrderValue:Int
            expiryDate:Date
            isActive:Boolean
            user:ID
        ):CouponResponse

        deleteCoupon(
            id:ID!
        ):CouponResponse
    }
`
import { gql } from "@apollo/client";

export const GETCOUPONS = gql`
    query GetCoupons {
        getCoupons {
            id
            couponCode
            discount
            minOrderValue
            expiryDate
            isActive
            user {
                id
                firstName
                lastName
                email
            }
        }
    }
`;

export const CREATECOUPON = gql`
    mutation CreateCoupon(
        $discount: Int
        $minOrderValue: Int
        $expiryDate: Date
        $isActive: Boolean
        $user: ID
    ) {
        createCoupon(
            discount: $discount
            minOrderValue: $minOrderValue
            expiryDate: $expiryDate
            isActive: $isActive
            user: $user
        ) {
            message
            coupon {
                id
                couponCode
                discount
                minOrderValue
                expiryDate
                isActive
            }
        }
    }
`;

export const UPDATECOUPON = gql`
    mutation UpdateCoupon(
        $id: ID!
        $discount: Int
        $minOrderValue: Int
        $expiryDate: Date
        $isActive: Boolean
        $user: ID
    ) {
        updateCoupon(
            id: $id
            discount: $discount
            minOrderValue: $minOrderValue
            expiryDate: $expiryDate
            isActive: $isActive
            user: $user
        ) {
            message
            coupon {
                id
                couponCode
                discount
                minOrderValue
                expiryDate
                isActive
            }
        }
    }
`;

export const DELETECOUPON = gql`
    mutation DeleteCoupon($id: ID!) {
        deleteCoupon(id: $id) {
            message
        }
    }
`;
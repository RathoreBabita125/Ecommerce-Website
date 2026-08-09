import { gql } from '@apollo/client';

export const GETMYWISHLISTPRODUCT = gql`
    query GetMyWishlist{
        getMyWishlist{
            id
            isWishlisted
            product{
                id
                productName
                productImage
                slug
                price
                description
                brand
                color
                size
                discountPrice
                stockQty
                status
            }
        }
    }
`;

export const GETWISHLISTITEMS = gql`
    query GetWishlistItem{
        getWishlistItem{
            id
            product{
                id
                productName
                productImage
                slug
                price
                description
                brand
                color
                size
                discountPrice
                stockQty
                status
            }
        }
    }
`;

export const ADDTOWISHLIST = gql`
    mutation AddToWishlist(
        $product:ID
    ){
        addToWishlist(
            product:$product
        ){
            message
            wishlist{
                id
                product{
                    id
                    productName
                    productImage
                    slug
                    price
                    description
                    brand
                    color
                    size
                    discountPrice
                    stockQty
                    status
                }
            }
        }
    }
`;

export const REMOVEFROMWISHLIST=gql`
    mutation RemoveFromWishlist(
        $id:ID!
    ){
        removeFromWishlist(
            id:$id
        ){
            message
        }
    }
`;
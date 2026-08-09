import {gql} from 'graphql-tag';

export const wishlistSchema=gql`
    type Wishlist{
        id:ID!
        user:User!
        product:Product!
        isWishlisted:Boolean!
    }
    
    type WishlistResponse{
        message:String
        wishlist:Wishlist
    }

    type Query{
        getWishlistItem:[Wishlist]
        getMyWishlist:[Wishlist]
    }

    type Mutation{
        addToWishlist(
            product:ID
        ):WishlistResponse

        removeFromWishlist(
            id: ID!
        ): WishlistResponse
    }
`
import { gql } from 'graphql-tag';

export const cartSchema = gql`

  type CartItem {
    id: ID!
    quantity: Int!
    price: Float!
    product: Product!
  }

  type Cart {
    id: ID!
    items: [CartItem!]!
  }

  type CartResponse{
    message:String
    items: [CartItem]
  }

  type Query {
    getCart: Cart
  }

  type Mutation {

    addToCart(
      quantity: Int!
      product: ID!, 
    ): CartItem

    updateCartItem(
      quantity: Int!
      product: ID!,  
    ): CartItem

    removeFromCart(
      id: ID!
    ): Boolean

    inceaseQuantity(
      id:ID!
      quantity:Int!
    ): CartResponse

    decreaseQuantity(
      id:ID!
      quantity:Int!
    ): CartResponse

  }
`;
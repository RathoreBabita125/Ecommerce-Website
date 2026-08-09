import { gql } from '@apollo/client';

export const GETCART = gql`
  query GetCart {
    getCart {
      id
      items {
        id
        quantity
        price
        product {
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

export const ADDTOCART = gql`
    mutation AddToCart(
      $quantity: Int!
      $product: ID!, 
    ) {
    addToCart(
        product: $product, 
        quantity: $quantity
    ) {
      id
      quantity
      price
      product{
        id
        productName
        productImage
        slug
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

export const UPDATECARTQUANTITY = gql`
  mutation UpdateCartQuantity(
    $cartItem: ID!, 
    $quantity: Int!
  ) {
    updateCartQuantity(
      cartItem: $cartItem, 
      quantity: $quantity
    ) {
      id
      quantity
      price
      product{
        id
        productName
        productImage
        slug
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

export const REMOVEFROMCART = gql`
  mutation RemoveFromCart(
    $id: ID!
  ) {
    removeFromCart(
      id: $id
    )
  }
`;

export const  INCREASE_QUANTITY= gql`
  mutation InceaseQuantity(
    $id: ID!
    $quantity:Int!
  ) {
    inceaseQuantity(
      id: $id
      quantity:$quantity
    ){
      message
    }
  }
`;

export const  DECREASE_QUANTITY= gql`
  mutation DecreaseQuantity(
    $id: ID!
    $quantity:Int!
  ) {
    decreaseQuantity(
      id: $id
      quantity:$quantity
    ){
      message
    }
  }
`;
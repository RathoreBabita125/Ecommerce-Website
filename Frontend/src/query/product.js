import {gql} from '@apollo/client';

export const GETPRODUCTS = gql`
  query getProducts(
    $productName: String
    $brand: String
    $color: String
    $status: String
    $category: String
  ) {
    getProducts(
      productName: $productName
      brand: $brand
      color: $color
      status: $status
      category: $category
    ) {
      id
      productName
      brand
      color
      size
      price
      stockQty
      status
      productImage
      description
      slug
      category {
        id
        categoryName
      }
    }
  }
`;

export const GETCATEGORIES = gql`
  query getCategories {
    categories {
      id
      categoryName
    }
  }
`;

export const ADDPRODUCT=gql`
    mutation AddProduct(        
        $productName: String!
        $productImage: String!
        $slug: String!
        $description: String!
        $category: ID!
        $price: Int!
        $discountPrice: Int!
        $stockQty: Int!
        $color:String!
        $size:String!
        $brand:String
        $status:String
        
    ) {
    addProduct(  
        productName: $productName
        productImage: $productImage
        slug: $slug
        description: $description
        category: $category
        price: $price
        discountPrice: $discountPrice
        stockQty: $stockQty
        color:$color
        size:$size
        brand:$brand
        status:$status
    ) {
        message
        product {
            productName
            productImage
            slug
            description
            price
            discountPrice
            stockQty
            color
            size
            brand
            status
            category {
                id
                categoryName
            }
        }
    }
}
`;

export const EDITPRODUCT = gql`
  mutation editProduct(
    $id:ID!
    $productName: String!
    $productImage: String!
    $slug: String!
    $description: String!
    $brand: String!
    $category: ID!
    $color: String!
    $size: String!
    $price: Int!
    $discountPrice: Int!
    $stockQty: Int!
    $status: String!
  ) {
    editProduct(
      id: $id
      productName: $productName
      productImage: $productImage
      slug: $slug
      description: $description
      brand: $brand
      category: $category
      color: $color
      size: $size
      price: $price
      discountPrice: $discountPrice
      stockQty: $stockQty
      status: $status
    ) {
      message
      product {
        id
        productName
      }
    }
  }
`;

export const DELETEPRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      message
    }
  }
`;
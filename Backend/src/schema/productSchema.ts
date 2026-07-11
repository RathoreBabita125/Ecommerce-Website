import { gql } from 'graphql-tag'

export const productSchema = gql`
    type Product{
        id:ID!
        productImage:String!
        productName:String!
        slug:String!
        description:String!
        category:Category!
        price:Int!
        discountPrice:Int
        stockQty:Int!
        color:String
        size:String
        status:String
        brand:String
        createdAt:Date
        updatedAt:Date
    }

    type ProductResponse{
        product:Product
        message:String
    }
    
    type Query{
        getProducts(
            productName: String
            brand: String
            color: String
            status: String
            category: String
        ):[Product]
    }

    type Mutation{
        addProduct(
            productName:String!
            productImage:String!
            slug:String!
            description:String!
            category:ID!
            price:Int!
            discountPrice:Int!
            stockQty:Int!
            color:String
            size:String
            status:String
            brand:String
        ):ProductResponse

        deleteProduct(
            id:ID!
        ):ProductResponse

        editProduct(
            id:ID!
            productImage:String!    
            productName:String!
            slug:String!
            description:String!
            category:ID!
            price:Int!
            discountPrice:Int!
            stockQty:Int!
            status:String!
            size:String!
            color:String!
            brand:String!
        ):ProductResponse

        deleteProduct(
            id:ID!
        ):ProductResponse
    }
`
import {gql} from 'graphql-tag'

export const categorySchema=gql`

    type Category{
        id:ID
        categoryName:String
        description:String
        slug:String
        categoryImage:String
        isActive:Boolean
        createdAt:Date
        product:[Product]
    }
    
    type categoryResponse{
        message:String
        category:Category
    }

    type Query{
        getCategories(
            categoryName: String, 
            slug: String, 
            description: String, 
            isActive: Boolean
        ):[Category]
    }

    type Mutation{
        addCategory(
            categoryName:String
            description:String
            slug:String
            categoryImage:String
            isActive:Boolean
        ):categoryResponse

        editCategory(
            id:ID
            categoryName:String
            description:String
            slug:String
            categoryImage:String
            isActive:Boolean
        ):categoryResponse

        updateCategoryStatus(
            id:ID!
        ):categoryResponse

        deleteCategory(
            id:ID!
        ):categoryResponse
    }
`
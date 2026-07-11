import {gql} from 'graphql-tag'

export const userSchema=gql`
    type User{
        id:ID!
        firstName:String!
        lastName:String!
        email:String!
        password:String!
        confirmPassword:String!
        role:String!
        createdAt:String!
        updatedAt:String!
    }

    type AuthResponse{
        token:String
        user:User
        message:String
    }

    type Query{
        getUsers:[User]
        getMe:User
    }

    type Mutation{
        signup(
            firstName:String!
            lastName:String!
            email:String!
            password:String!
            confirmPassword:String!
            role:String!
        ):AuthResponse

        signin(
            email:String!
            password:String!
        ):AuthResponse

        forget(
            email:String!
            password:String!
            confirmPassword:String!
        ):AuthResponse
    }
`
import {gql} from 'graphql-tag';

export const addressSchema=gql`

    type Address{
        id:ID!
        user:User!
        phone:String!
        address_line1:String!
        address_line2:String!
        landmark:String!
        city:String!
        state:String!
        pincode:String!
        country:String!
        type:String!
    }

    type AddressResponse{
        address:Address
        message:String
    }

    type Query{
        getAddress:[Address]
    }

    type Mutation{
        createAddress(
            user:ID!
            phone:String!
            address_line1:String!
            address_line2:String!
            landmark:String!
            city:String!
            state:String!
            pincode:String!
            country:String!
            type:String
        ):AddressResponse

        updateAddress(
            id:ID!
            user:ID!
            phone:String!
            address_line1:String!
            address_line2:String!
            landmark:String!
            city:String!
            state:String!
            pincode:String!
            country:String!
            type:String
        ):AddressResponse

        deleteAddress(
            id:ID!
        ):AddressResponse
    }
`
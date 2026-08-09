import { gql } from "@apollo/client";

export const GETADDRESS = gql`
    query GetAddress {
        getAddress {
            id
            phone
            address_line1
            address_line2
            landmark
            city
            state
            pincode
            country
            type
            user{
                firstName
                lastName
                email
                role
            }
        }
    }
`;

export const CREATEADDRESS = gql`
    mutation CreateAddress(
        $user: ID!
        $phone: String!
        $address_line1: String!
        $address_line2: String!
        $landmark: String!
        $city: String!
        $state: String!
        $pincode: String!
        $country: String!
        $type: String!
    ) {
        createAddress(
            user: $user
            phone: $phone
            address_line1: $address_line1
            address_line2: $address_line2
            landmark: $landmark
            city: $city
            state: $state
            pincode: $pincode
            country: $country
            type: $type
        ) {
            message
        }
    }
`;

export const UPDATEADDRESS = gql`
    mutation UpdateAddress(
        $id: ID!
        $user: ID!
        $phone: String!
        $address_line1: String!
        $address_line2: String!
        $landmark: String!
        $city: String!
        $state: String!
        $pincode: String!
        $country: String!
        $type: String!
    ) {
        updateAddress(
            id: $id
            user: $user
            phone: $phone
            address_line1: $address_line1
            address_line2: $address_line2
            landmark: $landmark
            city: $city
            state: $state
            pincode: $pincode
            country: $country
            type: $type
        ) {
            message
        }
    }
`;

export const DELETEADDRESS = gql`
    mutation DeleteAddress(
        $id: ID!
    ) {
        deleteAddress(
            id: $id
        ) {
            message
        }
    }
`;
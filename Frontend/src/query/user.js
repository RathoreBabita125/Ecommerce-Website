import { gql } from '@apollo/client'

export const GETUSERS = gql`
    query getUsers(
        $firstName:String
        $email:String
    ){
        getUsers(
            firstName:$firstName
            email:$email
        ){
            id
            firstName
            lastName
            email
            role
            status
            createdAt
        }
    }
`;

export const GETME=gql`
    query getMe{
        getMe{
            id
            firstName
            email
            role
        }
    }
`;

export const SIGNUP = gql`
    mutation signup(
        $firstName:String!
        $lastName:String!
        $email:String!
        $password:String!
        $confirmPassword:String!
        $role:String!
    ){
        signup(
            firstName:$firstName,
            lastName:$lastName,
            email:$email,
            password:$password
            confirmPassword:$confirmPassword
            role:$role

        ){
            user{
                firstName
            }
        }
    }
`;

export const SIGNIN = gql`
    mutation signin(
        $email:String!
        $password:String!
    ){
        signin(
            email:$email,
            password:$password
        ){
            user{
                firstName
                email
                role
            }
        }
    }
`;

export const FORGET = gql`
    mutation forget(
        $email:String!
        $password:String!
        $confirmPassword:String!
    ){
        forget(
            email:$email,
            password:$password
            confirmPassword:$confirmPassword
        ){
            user{
                password
                email
            }
        }
    }
`;

export const LOGOUT = gql`
    mutation Logout{
        logout{
            message
        }
    }
`

export const BLOCKUSER=gql`
    mutation BlockUser($id:ID!){
        blockUser(
            id:$id
        ){
            message
        }
    }
`

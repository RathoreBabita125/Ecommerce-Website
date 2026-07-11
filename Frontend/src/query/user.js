import { gql } from '@apollo/client'

export const GETUSERS = gql`
    query getUsers{
        getUsers{
            firstName
            lastName
            email
            role
        }
    }
`;

export const GETME=gql`
    query getMe{
        getMe{
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

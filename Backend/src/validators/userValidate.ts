import { emailField, nameField, passwordField } from "../constants/const.ts";

 export const validateUserData=(userData:any, inputField:string[])=>{

    // first name validate
    if(inputField.includes('firstName')){
        if(userData?.firstName==="" || userData?.firstName?.trim()===""){
            throw new Error("First Name is required.");
        }
        if(!nameField.test(userData?.firstName)){
            throw new Error("Only letters and spaces are allowed.")
        }
        if(userData?.firstName.length<3){
            throw new Error("First name length should be greater or equal to 3.")
        }
    }

     // last name validate
    if(inputField.includes('lastName')){
        if(userData?.lastName==="" || userData?.lastName?.trim()===""){
            throw new Error("LastName Name is required.");
        }
        if(!nameField.test(userData?.lastName)){
            throw new Error("Only letters and spaces are allowed.")
        }
        if(userData?.lastName.length<3){
            throw new Error("Last name length should be greater or equal to 3.")
        }
    }

    //email validate
    if(inputField.includes('email')){
        if(userData?.email==="" || userData?.email?.trim()===""){
            throw new Error("Email is required.")
        }
        if(!emailField.test(userData.email)){
            throw new Error("Enter valid email address.")
        }
    }

    // password validate
    if(inputField.includes('password')){
        if(userData?.password==="" || userData?.password.trim()===""){
            throw new Error("Password is required.")
        }
        if(!passwordField.test(userData.password)){
            throw new Error("Password should contain at least one lowercase, one uppercase, one number and one symbol. Minimum length should be 8.");
        }
    }

    //confirm password validate
    if(inputField.includes('confirmPassword')){
        if(userData?.confirmPassword==="" || userData?.confirmPassword.trim()===""){
            throw new Error("Confirm password is required.")
        }
        if(userData.password!==userData.confirmPassword){
            throw new Error("Password does not match.")
        }
    }

    // role validate
    if(inputField.includes('role')){
        if(!userData.role){
            throw new Error("Role is required.")
        }
    }
}
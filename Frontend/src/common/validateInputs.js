import { validateField } from "./validateForm";

export const checkValidInput = (inputFields, setError, user) => {
    const newError = {};
    let isValidInput = true;

    inputFields.forEach(field => {
        const errorMessage = validateField(field, user[field], user);
        newError[field] = errorMessage;
        if (errorMessage) isValidInput = false;
    });
    setError(newError);
    return isValidInput;
}
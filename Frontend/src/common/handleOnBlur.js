import { validateField } from "./validateForm";

export const onBlurHandler = (event, user, setError) => {
    const name = event.target.name;
    const value = event.target.value;
    const newUser = { ...user, [name]: value };
    const errorMessage = validateField(name, value, newUser);
    setError((preData) => ({ ...preData, [name]: errorMessage }));
}
import { validateField } from "./validateForm";

export const handleInputChange = (event, user, setUser, error, setError) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        const newUser = { ...user, [name]: value };
        setUser(newUser);

        if (error[name] !== '') {
            const errorMessage = validateField(name, value, user);
            setError((preData) => ({ ...preData, [name]: errorMessage }));
        }
    }
import { phoneInputCheck } from "../constants/const";

export const validateAddress = (form, setErrors) => {

    const newError = {};

    if (!phoneInputCheck.test(form.phone.trim())) {
        newError.phone = "Enter a valid phone number";
    }
    if (!form.address_line1.trim()) {
        newError.address_line1 = "Enter house no., building, street";
    }
    if (!form.address_line2.trim()) {
        newError.address_line2 = "Enter area, colony, sector";
    }
    if (!form.landmark.trim()) {
        newError.landmark = "Enter landmark";
    }
    if (!form.city.trim()) {
        newError.city = "Enter city";
    }
    if (!form.state.trim()) {
        newError.state = "Enter state";
    }
    if (!/^[0-9]{6}$/.test(form.pincode.trim())) {
        newError.pincode = "Enter a valid 6-digit pincode";
    }
    if (!form.country.trim()) {
        newError.country = "Enter country";
    }
    if (!form.type.trim()) {
        newError.type = "Select address type";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0;
};
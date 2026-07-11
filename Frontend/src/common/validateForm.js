import { emailInputCheck, nameInputCheck, passwordInputCheck, phoneInputCheck } from "../constants/const.js";
export const validateField = (name, value, user) => {
    switch (name) {
        case 'firstName':
            if (!value?.trim()) return 'First name is required';
            if (value?.trim()?.length < 3) return 'Full name must be at least 3 characters';
            if (!nameInputCheck.test(value)) return 'Only letters and spaces allowed';
            return '';

        case 'lastName':
            if (!value?.trim()) return 'Last name is required';
            if (value?.trim()?.length < 3) return 'Last name must be at least 3 characters';
            if (!nameInputCheck.test(value)) return 'Only letters and spaces allowed';
            return '';

        case 'email':
            if (!value?.trim()) return 'Email is required';
            if (!emailInputCheck.test(value)) return 'Enter a valid email';
            return '';

        case 'role':
            if (!value?.trim()) return 'Please select a role';
            return '';

        case 'password':
            if (!value?.trim()) return 'Password is required';
            if (!passwordInputCheck.test(value))
                return 'Min 8 chars, include uppercase, lowercase, number & special character';
            return '';

        case 'confirmPassword':
            if (!value) return 'Please confirm your password';
            if (value !== user.password) return 'Passwords do not match';
            return '';

        case 'phone':
            if (!value?.trim()) return 'Phone number is required';
            if (!phoneInputCheck.test(value)) return 'Enter a valid 10-digit Indian mobile number';
            return '';

        default:
            return '';
    }
};
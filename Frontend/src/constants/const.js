export const nameInputCheck=/^[A-Za-z ]+$/;
export const emailInputCheck=/^[^\s@]+@[^\s@]+.[^\s@]+$/;
export const passwordInputCheck=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
export const phoneInputCheck=/^[6-9]\d{9}$/;

export const BRAND_COLOR = "#1842BB";

export const colors = ["Black", "White", "Blue", "Red", "Green", "Silver", "Purple"];
export const sizes = ["S", "M", "L", "XL", "-"];
export const statuses = ["Active", "Inactive", "Out of stock"];

// product columns
export const productColumns = [
    { key: "image", label: "Image", width: "7%" },
    { key: "id", label: "Product ID", width: "10%" },
    { key: "name", label: "Product Name", width: "16%" },
    { key: "brand", label: "Brand", width: "10%" },
    { key: "category", label: "Category", width: "11%" },
    { key: "color", label: "Color", width: "9%" },
    { key: "size", label: "Size", width: "8%" },
    { key: "price", label: "Price", width: "9%" },
    { key: "stock", label: "Stock", width: "8%" },
    { key: "status", label: "Status", width: "8%" },
    { key: "action", label: "Action", width: "6%" },
];

// product column and input value
export const statusOptions = ["Active", "Inactive", "Out of stock"];
export const productFilterFields = ["productName", "brand", "color", "status", "category"];
export const colorOptions = ["Red", "Blue", "Green", "Black", "White", "Yellow", "Grey", "Pink"];
export const productColumnOptions = [
    { value: "productName", label: "Product Name" },
    { value: "brand", label: "Brand" },
    { value: "color", label: "Color" },
    { value: "status", label: "Status" },
    { value: "category", label: "Category" },
];

//category column and input value
export const categoryColumnOptions = [
    { label: "Category Name", value: "categoryName" },
    { label: "Slug", value: "slug" },
    { label: "Description", value: "description" },
    { label: "Status", value: "isActive" },
];
export const categoryFilterFields = ["categoryName", "slug", "description", "isActive"];

//users column
export const userColumns = [
    { key: "name", label: "Customer", align: "left", width: "24%" },
    { key: "email", label: "Email", align: "left", width: "20%" },
    { key: "phone", label: "Phone", align: "left", width: "15%" },
    { key: "city", label: "City", align: "center", width: "6%" },       
    { key: "orders", label: "Orders", align: "center", width: "9%" }, 
    { key: "joinedAt", label: "Joined On", align: "left", width: "13%" },
    { key: "status", label: "Status", align: "center", width: "8%" },
    { key: "action", label: "Action", align: "center", width: "5%" },
];

export const SHIPPING_CHARGE = 49;
export const GST_PERCENT = 5;


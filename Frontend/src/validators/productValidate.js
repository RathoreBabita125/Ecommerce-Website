export const validateProducts=(product, setError, newError)=>{
    if (!product.productName || product.productName.trim() === "") {
        newError.productName = "Product name field is required.";
    }
    if (!product.description || product.description.trim() === "") {
        newError.description = "Description field is required.";
    }
    if (!product.brand || product.brand.trim() === "") {
        newError.brand = "Brand field is required.";
    }
    if (!product.category || product.category.trim() === "") {
        newError.category = "Category field is required.";
    }
    if (!product.price) {
        newError.price = "Price field is required.";
    }
    if (!product.stockQty) {
        newError.stockQty = "Stock quantity field is required.";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
}


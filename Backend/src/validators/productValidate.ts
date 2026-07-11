export const validateProducts=(productData:any)=>{
    if(productData?.productName==="" || productData?.productName.trim()===""){
        throw new Error("Product name is required.");
    } 
    if(productData?.productImage==="" || productData?.productImage?.trim()===""){
        throw new Error("Product image is required");
    }
    if(productData?.slug==="" || productData?.slug?.trim()===""){
        throw new Error("Product slug is required");
    }
    if(productData?.description==="" || productData?.description?.trim()===""){
        throw new Error("Product description is required");
    }
    if(productData?.stockQty==="" ){
        throw new Error(" Stock quantity is required");
    }
    if(productData?.category==="" || productData?.category?.trim()===""){
        throw new Error(" Product category is required");
    }
}
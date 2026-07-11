export const validateCategory=(categoryData:any)=>{
    if(categoryData?.categoryName==="" || categoryData?.categoryName.trim()===""){
        throw new Error("Category name is required.");
    } 
    if(categoryData?.categoryImage==="" || categoryData?.categoryImage?.trim()===""){
        throw new Error("Category image is required");
    }
    if(categoryData?.slug==="" || categoryData?.slug?.trim()===""){
        throw new Error("Category slug is required");
    }
    if(categoryData?.description==="" || categoryData?.description?.trim()===""){
        throw new Error("Category description is required");
    }
}
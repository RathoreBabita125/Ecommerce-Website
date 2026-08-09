import { useMutation } from "@apollo/client/react";
import { createContext } from "react";
import { toast } from 'react-toastify';
import { ADDTOWISHLIST, GETMYWISHLISTPRODUCT, REMOVEFROMWISHLIST } from "../query/wishlist";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

    const [removeFromWishlist] = useMutation(REMOVEFROMWISHLIST, {
        refetchQueries: [GETMYWISHLISTPRODUCT]
    });

    const [addToWishlist]=useMutation(ADDTOWISHLIST, {
        refetchQueries:[GETMYWISHLISTPRODUCT]
    });

    const handleRemoveFromWishlist = async (wishlistId) => {
        try {
            const response = await removeFromWishlist({
                variables: {
                    id: wishlistId
                }
            });
            if (response) {
                toast.success("You have successfully removed product from wishlist.");
            }
            else {
                throw ("Something went wrong");
            }
        } catch (error) {
            toast.error("Remove item from wishlist failed: ", error);
        }
    }

    const handleAddToWishlist=async(wishlistProduct)=>{
        try {
            const response= await addToWishlist({
                variables:{
                    product:wishlistProduct.id
                }
            });
            if(response){
                toast.success("Product has been added in the wishlist.");
            }
        } catch (error) {
            toast.error(`Add to wishlist failed: ${error.message}`);
        }
    }

    return (
        <WishlistContext.Provider value={{handleRemoveFromWishlist, handleAddToWishlist}}>
            {children}
        </WishlistContext.Provider>
    );
};
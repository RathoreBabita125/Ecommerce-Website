import { useMutation } from "@apollo/client/react";
import { createContext } from "react";
import { ADDTOCART, GETCART, REMOVEFROMCART } from "../query/cart";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const navigate = useNavigate();

    const [addToCart] = useMutation(ADDTOCART, {
        refetchQueries: [GETCART]
    });

     const[removeFromCart] = useMutation(REMOVEFROMCART,{
        refetchQueries:[GETCART]
    });

    const handleAddProductToCart = async (product, quantity) => {
        try {
            const response = await addToCart({
                variables: {
                    product:product.id,
                    quantity: quantity
                }
            });
            if (response) {
                toast.success("Product is addded to cart successfully.");
                navigate('/cart');
            }
            else {
                throw ("Something went wrong");
            }
        } catch (error) {
            toast.error(`${error}`);
            navigate('/cart');
        }
    }

    const handleDeleteCartItem = async(cartItem) => {
        try {
            const response=await removeFromCart({
                variables:{
                    id:Number(cartItem.id)
                }
            })
            console.log(response);
            toast.success("Item has been removed from cart.");
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <CartContext.Provider value={{handleAddProductToCart, handleDeleteCartItem, navigate}}>
            {children}
        </CartContext.Provider>
    );
};
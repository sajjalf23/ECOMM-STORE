import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
export const ShopContext = createContext();
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setsearch] = useState("");
    const [showsearch, setshowsearch] = useState(false);
    const [cart, setcart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : {};
    });
    const navigate = useNavigate();

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addtocart = async (itemId, size) => {
        if (size) {
            let cartData = structuredClone(cart);
            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1;
                }
                else {
                    cartData[itemId][size] = 1;
                }
            }
            else {
                cartData[itemId] = {};
                cartData[itemId][size] = 1;
            }
            setcart(cartData);
            toast.success("Item added to cart!");
        }
        else {
            toast.error("Please Select Product Size ")
        }
    }

    const getcartcount = () => {
        let total = 0;
        for (const items in cart) {
            for (const item in cart[items]) {
                try {
                    if (cart[items][item] > 0) {
                        total += cart[items][item];
                    }
                } catch (error) {
                    console.error("Error calculating cart count:", error);
                }
            }
        }
        return total;
    }

    const updatequantity = async (itemId, size, quantity) => {
        let cartdata = structuredClone(cart);
        
        if (quantity === 0) {
            if (cartdata[itemId] && cartdata[itemId][size]) {
                delete cartdata[itemId][size];
                
                if (Object.keys(cartdata[itemId]).length === 0) {
                    delete cartdata[itemId];
                }
                
                toast.success("Item removed from cart!");
            }
        } else {
            cartdata[itemId][size] = quantity;
            toast.success("Quantity updated!");
        }
        
        setcart(cartdata);
    }

    const getcartamount = () => {
        let total = 0;
        for (const items in cart) {
            let iteminfo = products.find((product) => product._id === items);
            for (const item in cart[items]) {
                if (cart[items][item] > 0) {
                    total += iteminfo.price * cart[items][item];
                }
            }
        }
        return total;
    }

    const getcarttotal = () => {
        const subtotal = getcartamount();
        return subtotal + delivery_fee;
    }

    // Clear the entire cart
    const clearCart = () => {
        setcart({});
        // toast.info("Cart cleared!");
    }

    // Place order and clear cart
    const placeOrder = (shippingInfo = null) => {
        if (getcartcount() === 0) {
            toast.error("Cart is empty!");
            return false;
        }

        // Generate order ID
        const orderId = `ORD-${Date.now()}`;
        
        // Clear cart after placing order
        clearCart();

        toast.success("Order placed successfully!");
        return orderId;
    }

    // Remove item from cart
    const removeFromCart = (itemId, size) => {
        updatequantity(itemId, size, 0);
    }

    const value = {
        navigate,
        getcartamount,
        updatequantity,
        removeFromCart,
        cart,
        addtocart,
        getcartcount,
        products,
        currency,
        delivery_fee,
        search,
        setsearch,
        showsearch,
        setshowsearch,
        clearCart,
        placeOrder,
        getcarttotal
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
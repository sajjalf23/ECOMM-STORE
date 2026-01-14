import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Title';
import { assets } from '../assets/frontend_assets/assets';
import Carttotal from '../Components/Carttotal';

const Cart = () => {
  const { 
    products, 
    cart, 
    currency, 
    updatequantity, 
    navigate,
    getcartcount
  } = useContext(ShopContext);
  
  const [cartdata, setcartdata] = useState([]);

  useEffect(() => {
    const tempdata = [];
    for (const productId in cart) {
      for (const size in cart[productId]) {
        if (cart[productId][size] > 0) {
          tempdata.push({
            _id: productId,
            size: size,
            quantity: cart[productId][size],
          });
        }
      }
    }
    setcartdata(tempdata);
  }, [cart]);

  const handleCheckout = () => {
    if (getcartcount() === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    navigate('/placeorder');
  };

  return (
    <div className='border-t pt-14 min-h-screen'>
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>
      
      {cartdata.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-black text-white px-6 py-2 rounded-sm hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="">
            {cartdata.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              if (!productData) return null;

              return (
                <div 
                  className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4" 
                  key={`${item._id}-${item.size}`}
                >
                  <div className="flex items-start gap-6">
                    <img src={productData.image[0]} alt={productData.name} className='w-16 sm:w-20 object-cover' />
                    <div className="">
                      <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>{currency}{productData.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <input 
                    onChange={(e) => {
                      if (e.target.value === "") { 
                        return null; 
                      }
                      updatequantity(item._id, item.size, Number(e.target.value))
                    }} 
                    type="number" 
                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center' 
                    min={1} 
                    value={item.quantity}
                  />
                  <img 
                    src={assets.bin_icon} 
                    className='w-4 sm:w-5 cursor-pointer hover:opacity-80 transition' 
                    onClick={() => updatequantity(item._id, item.size, 0)} 
                    alt="Remove item" 
                    title="Remove item"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <Carttotal />
              <div className="w-full text-end">
                <button 
                  onClick={handleCheckout}
                  className='text-white text-sm bg-black my-8 py-3 px-8 hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
                  disabled={cartdata.length === 0}
                >
                  PROCEED TO CHECK OUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
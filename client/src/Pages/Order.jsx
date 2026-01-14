import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Title';

const Order = () => {
  const { products, currency, cart, getcartamount, getcarttotal } = useContext(ShopContext);
  const [orderItems, setOrderItems] = useState([]);
  const [orderData] = useState({
    orderId: `ORD-${Date.now()}`,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: 'Confirmed',
    deliveryFee: 10,
  });

  useEffect(() => {
    // Get cart items for display
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
    setOrderItems(tempdata);
  }, [cart]);

  // Calculate totals based on current cart
  const subtotal = getcartamount();
  const total = getcarttotal();

  if (orderItems.length === 0) {
    return (
      <div className="border-t pt-16 min-h-screen">
        <div className="text-2xl mb-6">
          <Title text1="ORDER" text2="CONFIRMATION" />
        </div>
        <div className="text-center py-20">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Thank you for your order!</h3>
            <p className="text-gray-600 mb-4">Your order has been successfully placed.</p>
          </div>
          <div className="space-y-4">
            <p className="text-gray-500">Order ID: <span className="font-medium">{orderData.orderId}</span></p>
            <p className="text-gray-500">Date: <span className="font-medium">{orderData.date}</span></p>
            <p className="text-gray-500">Status: <span className="font-medium text-green-600">{orderData.status}</span></p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-8 bg-black text-white px-6 py-3 rounded-sm hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16 min-h-screen">
      <div className="text-2xl mb-6">
        <Title text1="ORDER" text2="CONFIRMATION" />
      </div>

      {/* Order Summary Card */}
      <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Order #{orderData.orderId}</h2>
            <div className="space-y-1">
              <p className="text-gray-600">Date: {orderData.date}</p>
              <div className="flex items-center gap-2">
                <span className="min-w-2 h-2 rounded-full bg-green-500"></span>
                <p className="font-medium text-green-600">{orderData.status}</p>
              </div>
            </div>
          </div>
          <div className="text-lg font-bold">
            Total: {currency}
            {total.toFixed(2)}
          </div>
        </div>

        {/* Order Items */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-lg mb-4">Order Items</h3>
          <div className="space-y-4">
            {orderItems.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              if (!productData) return null;

              return (
                <div
                  key={`${item._id}-${item.size}-${index}`}
                  className="py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center gap-6"
                >
                  <img 
                    src={productData.image[0]} 
                    alt={productData.name} 
                    className="w-20 h-20 object-cover rounded" 
                  />
                  <div className="flex-1">
                    <p className="font-medium text-lg">{productData.name}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <p className="text-gray-600">
                        Price: <span className="font-medium">{currency}{productData.price}</span>
                      </p>
                      <p className="text-gray-600">
                        Quantity: <span className="font-medium">{item.quantity}</span>
                      </p>
                      <p className="px-3 py-1 border bg-slate-50 rounded text-sm">
                        Size: {item.size}
                      </p>
                      <p className="text-gray-600 ml-auto">
                        Item Total: <span className="font-medium">
                          {currency}{(productData.price * item.quantity).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Totals */}
        <div className="border-t pt-6 mt-6">
          <div className="flex justify-end">
            <div className="w-full md:w-1/3 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{currency}{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee:</span>
                <span className="font-medium">{currency}{orderData.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-3 border-t">
                <span>Total:</span>
                <span>{currency}{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t">
          <button 
            onClick={() => window.location.href = '/'}
            className="border border-black text-black px-6 py-3 rounded-sm hover:bg-gray-50 transition"
          >
            Continue Shopping
          </button>
          <div className="flex gap-4">
            <button className="border border-black text-black px-6 py-3 rounded-sm hover:bg-gray-50 transition">
              Download Invoice
            </button>
            <button className="bg-black text-white px-6 py-3 rounded-sm hover:bg-gray-800 transition">
              Track Order
            </button>
          </div>
        </div>

        {/* Order Note */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-700 text-sm">
            <strong>Note:</strong> You will receive an email confirmation shortly. 
            Your items will be processed and shipped within 2-3 business days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
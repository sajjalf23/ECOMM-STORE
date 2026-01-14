
import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';

const Carttotal = () => {
  const { getcartamount, getcarttotal, currency, delivery_fee } = useContext(ShopContext);
  
  return (
    <div className="border p-6">
      <h3 className="text-lg font-bold mb-4">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{currency}{getcartamount().toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee:</span>
          <span>{currency}{delivery_fee.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>{currency}{getcarttotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Carttotal;
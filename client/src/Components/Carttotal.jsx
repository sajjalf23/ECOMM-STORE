// import React, { useContext } from 'react';
// import { ShopContext } from '../Context/ShopContext';
// import Title from '../Components/Title';

// const Carttotal = () => {
//   const { getcartamount, currency, delivery_fee } = useContext(ShopContext);

//   const subtotal = Number(getcartamount());
//   const total = subtotal + delivery_fee;

//   return (
//     <div className='w-full'>
//       <div className="text-2xl">
//         <Title text1="CART" text2="TOTAL" />
//         <div className="flex flex-col gap-2 mt-2 text-sm">
//           <div className="flex justify-between">
//             <p>Subtotal</p>
//             <p>{currency}{subtotal.toFixed(2)}</p>
//           </div>
//           <hr />
//           <div className="flex justify-between">
//             <p>Shipping Fee</p>
//             <p>{currency}{delivery_fee.toFixed(2)}</p>
//           </div>
//           <hr />
//           <div className="flex justify-between">
//             <b>Total</b>
//             <b>{currency}{total.toFixed(2)}</b>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Carttotal;
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
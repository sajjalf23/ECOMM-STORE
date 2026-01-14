import React, {useState, useContext} from 'react'
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Title';
import { assets } from '../assets/frontend_assets/assets';
import Carttotal from "../Components/Carttotal";
import { toast } from "react-toastify";

const Placeorder = () => {
  const [method, setmethod] = useState("cod");
  const { navigate, placeOrder, getcartcount } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [isTouched, setIsTouched] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const zipRegex = /^[0-9]{5,10}$/;

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number (10-15 digits)';
    }

    setErrors(newErrors);
    setIsTouched(true);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (getcartcount() === 0) {
      toast.error("Your cart is empty!");
      navigate('/cart');
      return;
    }

    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsProcessing(true);
    
    try {
      const orderId = placeOrder(formData);
      
      if (orderId) {
        toast.success(`Order #${orderId} placed successfully!`);
        
        setTimeout(() => {
          navigate('/order');
        }, 1500);
      }
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.street.trim() &&
      formData.city.trim() &&
      formData.state.trim() &&
      formData.zipCode.trim() &&
      formData.country.trim() &&
      formData.phoneNumber.trim()
    );
  };

  const showError = (fieldName) => {
    return errors[fieldName] && isTouched;
  };

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 border-t min-h-[80vh]'>
      {/* left - Form Section */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={"INFORMATION"}></Title>
        </div>
        
        <div className="flex gap-3">
          <div className="w-full">
            <input 
              type="text" 
              name="firstName"
              placeholder='First Name' 
              className={`border rounded py-2.5 px-4 w-full ${showError('firstName') ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {showError('firstName') && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div className="w-full">
            <input 
              type="text" 
              name="lastName"
              placeholder='Last Name' 
              className={`border rounded py-2.5 px-4 w-full ${showError('lastName') ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {showError('lastName') && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>
        
        <div>
          <input 
            type="email" 
            name="email"
            placeholder='Email' 
            className={`border rounded py-2.5 px-4 w-full ${showError('email') ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.email}
            onChange={handleInputChange}
          />
          {showError('email') && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <input 
            type="text" 
            name="street"
            placeholder='Street' 
            className={`border rounded py-2.5 px-4 w-full ${showError('street') ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.street}
            onChange={handleInputChange}
          />
          {showError('street') && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
        </div>
        
        <div className="flex gap-3">
          <div className="w-full">
            <input 
              type="text" 
              name="city"
              placeholder='City' 
              className={`border rounded py-2.5 px-4 w-full ${showError('city') ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.city}
              onChange={handleInputChange}
            />
            {showError('city') && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
          <div className="w-full">
            <input 
              type="text" 
              name="state"
              placeholder='State' 
              className={`border rounded py-2.5 px-4 w-full ${showError('state') ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.state}
              onChange={handleInputChange}
            />
            {showError('state') && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="w-full">
            <input 
              type="text" 
              name="zipCode"
              placeholder='ZIP Code' 
              className={`border rounded py-2.5 px-4 w-full ${showError('zipCode') ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.zipCode}
              onChange={handleInputChange}
            />
            {showError('zipCode') && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
          </div>
          <div className="w-full">
            <input 
              type="text" 
              name="country"
              placeholder='Country' 
              className={`border rounded py-2.5 px-4 w-full ${showError('country') ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.country}
              onChange={handleInputChange}
            />
            {showError('country') && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>
        </div>
        
        <div>
          <input 
            type="tel" 
            name="phoneNumber"
            placeholder='Phone Number' 
            className={`border rounded py-2.5 px-4 w-full ${showError('phoneNumber') ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {showError('phoneNumber') && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>
      </div>

      {/* right - Cart & Payment Section */}
      <div className="w-full sm:w-auto">
        <div className="sticky top-24">
          <div className="mt-8 min-w-80">
            <Carttotal></Carttotal>
          </div>
          <div className="mt-12">
            <Title text1={'PAYMENT'} text2={"METHOD"}></Title>
            <div className="flex gap-3 flex-col lg:flex-row">
              <div 
                className="flex items-center gap-3 border p-3 px-4 cursor-pointer hover:border-gray-400 transition"
                onClick={() => setmethod("stripe")}
              >
                <div className={`min-w-4 h-4 border rounded-full ${method === "stripe" ? "bg-green-500 border-green-500" : "border-gray-300"}`}></div>
                <img src={assets.stripe_logo} alt="Stripe" className='h-6 mx-4' />
              </div>
              <div 
                className="flex items-center gap-3 border p-3 px-4 cursor-pointer hover:border-gray-400 transition"
                onClick={() => setmethod("razorpay")}
              >
                <div className={`min-w-4 h-4 border rounded-full ${method === "razorpay" ? "bg-green-500 border-green-500" : "border-gray-300"}`}></div>
                <img src={assets.razorpay_logo} alt="Razorpay" className='h-6 mx-4' />
              </div>
              <div 
                className="flex items-center gap-3 border p-3 px-4 cursor-pointer hover:border-gray-400 transition"
                onClick={() => setmethod("cod")}
              >
                <div className={`min-w-4 h-4 border rounded-full ${method === "cod" ? "bg-green-500 border-green-500" : "border-gray-300"}`}></div>
                <p className='text-gray-700 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 font-medium mb-2">Selected: {method.toUpperCase()}</p>
              {method === "cod" && (
                <p className="text-gray-600 text-sm">Pay when your order arrives</p>
              )}
              {(method === "stripe" || method === "razorpay") && (
                <p className="text-gray-600 text-sm">You'll be redirected to secure payment page</p>
              )}
            </div>

            {isTouched && Object.keys(errors).length > 0 && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 font-medium mb-2">Please fix the following errors:</p>
                <ul className="list-disc list-inside text-red-500 text-sm">
                  {Object.values(errors).map((error, index) => (
                    error && <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="w-full text-end mt-8">
              <button 
                className={`px-8 py-3 my-8 text-center w-full ${isFormValid() && !isProcessing 
                  ? 'bg-black text-white cursor-pointer hover:bg-gray-800 transition' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                onClick={handlePlaceOrder}
                disabled={!isFormValid() || isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'PLACE ORDER'
                )}
              </button>
              {!isFormValid() && !isTouched && (
                <p className="text-sm text-gray-500 -mt-6 text-center">
                  Please fill all required fields to place order
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Placeorder;
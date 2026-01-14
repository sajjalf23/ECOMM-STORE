import React from 'react'
import { assets } from "../assets/admin_assets/assets"
const Navbar = ({settoken}) => {
  return (
    <div className='flex items-center px-[4%] py-2 justify-between'>
      <img src={assets.logo} className="w-[max(10%,80px)]"  alt="" />
      <button onClick={()=>settoken("")} className='bg-gray-950 text-white px-8 py-3 rounded-full text-xs sm:text-sm '> Log Out </button>
    </div>
  )
}

export default Navbar

import React from 'react'
import { assets } from '../assets/admin_assets/assets'

const Add = () => {
  return (
    <div>
      <form action="flex flex-col w-full items-start gap-3">
        <div >
          <p className="mb-2"> Upload Image </p>
          <p className='flex gap-2'>
            <label htmlFor="image1">
              <img className="w-20" src={assets.upload_area} alt="" />
              <input type="file" name="" id="image1" hidden />
            </label>
            <label htmlFor="image1">
              <img className="w-20" src={assets.upload_area} alt="" />
              <input type="file" name="" id="image2" hidden />
            </label>
            <label htmlFor="image1">
              <img className="w-20" src={assets.upload_area} alt="" />
              <input type="file" name="" id="image3" hidden />
            </label>
            <label htmlFor="image1">
              <img className="w-20" src={assets.upload_area} alt="" />
              <input type="file" name="" id="image4" hidden />
            </label>
          </p>
        </div>
        <div className="w-full">
          <p className='mb-2'> Product Name </p>
          <input type="text" placeholder='Type Here' className='w-full max-w-[500px] px-3 py-2' required />
        </div>
        <div className="w-full">
          <p className='mb-2'> Product Description </p>
          <textarea className='w-full max-w-[500px] px-3 py-2'  name="" id=""  placeholder='Write Content Here'></textarea>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div className="w-full px-3 py-2">
          <p className='mb-2'> Product Category </p>
          <select name="" id="">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="w-full px-3 py-2">
          <p className='mb-2'> Sub Category </p>
          <select name="" id="">
            <option value="Topwear">Top Wear</option>
            <option value="Bottomwear">Bottom Wear</option>
            <option value="Winterwear">Winter Wear</option>
          </select>
        </div>
        <div className="">
          <p className='mb-2'> Product Price </p>
          <input type="number" placeholder='25' className='w-full px-3 py-2 sm:w-[120px]' />
        </div>
        </div>
        <div className="">
          <p className='mb-2'>Product Sizes</p>
          <div className="flex gap-3 ">
            <div className="">
              <p className="bg-slate-200 px-5 py-1 cursor-pointer" >S</p>
            </div>
            <div >
              <p className="bg-slate-200 px-5 py-1 cursor-pointer" >M</p>
            </div>
            <div className="">
              <p className="bg-slate-200 px-5 py-1 cursor-pointer" >L</p>
            </div>
            <div className="">
              <p className="bg-slate-200 px-5 py-1 cursor-pointer" >XL</p>
            </div>
            <div className="">
              <p className="bg-slate-200 px-5 py-1 cursor-pointer" >XXL</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <input type="checkbox" id='BestSeller' /> 
          <label className="cursor-pointer" htmlFor="Bestseller">Add to Bestseller</label>
        </div>
        <button className='w-28 py-3 mt-4 bg-black text-white'> Add </button>
      </form>
    </div>
  )
}

export default Add

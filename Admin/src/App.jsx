import React , {useEffect, useState} from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import { Routes , Route } from "react-router-dom"
import Add from "./Pages/Add"
import List from "./Pages/List"
import Orders from "./Pages/Orders"
import Login from './Components/Login'
import { ToastContainer } from 'react-toastify';
  
export const BACKENDURL = import.meta.env.VITE_BACKEND_URL;
const App = () => {

  const [token , settoken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"");

  useEffect(()=>{localStorage.setItem('token',token)},[token])
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer></ToastContainer>
            {token === "" ? <Login settoken={settoken}></Login> :
      <>
      <Navbar settoken={settoken} ></Navbar>
      <hr />
      <div className="flex w-full">
          <Sidebar></Sidebar>
          <div className="w-[70%] text-gray-600 text-base mx-auto ml-[max(5vw,25px)] my-8 ">
            <Routes>
              <Route path='/add' element={ <Add token={token}></Add>} ></Route>
              <Route path='/list' element={ <List token={token}></List> } ></Route>
              <Route path='/orders' element={ <Orders token={token}></Orders> } ></Route>
            </Routes>
          </div>
      </div>
      </>
      }
    </div>
  )
}

export default App

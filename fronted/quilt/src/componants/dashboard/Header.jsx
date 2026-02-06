import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate  = useNavigate();
     const [user,setuser] = useState(null)
      const [isauth,setisauth] = useState(false)
       const [ishamopen,setishamopen] = useState(true)
  return (
    <div className="w-100%  m-0 p-0 ">
          <div className="nav h-[60px] flex  bg-gray-800 text-white  justify-between px-2 w-100%">
            <div className="logo  w-auto m-1  bg-gray-700 h-auto border-2 border-rounded rounded flex items-center">mahadev</div>
            <div className="nav-link  text- flex items-center justify-between">
               <ul className='hidden md:flex  relative items-center gap-8 text-white m-auto w-100% font-semibold text-[18px] right- flex justify-between'>
                 <li className='cursor-pointer hover:text-blue-300'>Home</li>
                 <li className='cursor-pointer hover:text-blue-300'>category</li>
                 <li className='cursor-pointer hover:text-blue-300'>cart</li>
                 <li className='cursor-pointer hover:text-blue-300'>history </li>
                 <li className='cursor-pointer hover:text-blue-300  flex items-center text-black rounded-lg px-1 bg-white'>{isauth  ? user.username:'sign in'}<img className='h-10 ml-2'  src='https://cdn-icons-png.flaticon.com/512/8345/8345328.png'/></li>
               </ul>
              <div className="md:hidden hamburger absolute top-3 flex right-3">{ishamopen ? 
                <i onClick={()=>{setishamopen(!ishamopen)}} className="fa-solid fa-bars " style={{color: '#f0eeee'}}></i>
              :  <i onClick={()=>{setishamopen(!ishamopen)}} className="fas fa-times"></i> 
              }
                </div>
                 <div  className={`hamlist transition-all duration-300 ease-in-out fixed top-[60px] right-0 ${ishamopen ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'} `}>
                 {/* <div className={`hamlist  transition-all duration-7000 ease-in-out  relative mt-[60px]  right-[-179px]  ${ishamopen ? 'hidden' :'flex'}`}> */}
                   <ul className={`w-[200px] cursor-pointer justify-center flex bg-[#37393E] items-center text-white p-3  flex-col  gap-8 m-auto w-100% font-semibold text-[18px] `}>
                 <li className='hover:text-gray-300'>Home</li>
                 <li  className='hover:text-gray-300'>category</li>
                 <li onClick={()=>{navigate('/cart')}} className='hover:text-gray-300'>cart</li>
                 <li className='hover:text-gray-300'>history </li>
                 <li className='hover:text-gray-300'>{isauth  ? user.username:'sign in'}</li>
               </ul>
                </div>
          </div>
          </div>
      </div>
  )
}

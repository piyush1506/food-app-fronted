import React, { useEffect, useState } from 'react'
import Dash from '../dashboard/Dash'
import { useNavigate } from 'react-router-dom'
import API from '../../utils/axiosInstance'
import '../../App.css'

export default function Cart() {
    const [cart,setcart] = useState([])
      const token = localStorage.getItem('token')
    // const user = localStorage.getItem('user')
  
 
   useEffect(()=>{
    const Allcart = async()=>{
      try {
        
         const res = await API.get('/api/v1/order/cartdetails') 
      const resdata = res.data
      // const res = await fetch('https://food-app-6vp4.onrender.com/api/v1/order/cartdetails',{
      //   method:'GET',
      //   headers:{
      //     'Content-Type':'application/json',
      //     'Authorization':`Bearer ${token}`
      //   }
      //            })
      //      const resdata  = await res.json();
      console.log(resdata)
      setcart(resdata.usercart || [])
      }
       catch (error) {
        console.log(error)
      }
     
    }
   Allcart()
    
  }
,[])


 


  const navigate = useNavigate();

  return (
    <div>
      <div className=" bg-[#F7FCFF] h-screen w-[100%]">
         <div className="flex items-center  mb-9  w-[100%] z-index-999 bg-white shadow ">
          <span onClick={()=>navigate('/dash')} className='mx-3'><i className="fa-solid pr-1 fa-arrow-left" style={{color: "#242629"}}></i></span>
          <span className='font-semibold '><h1 className='carttitle text-2xl p-2'>your history</h1></span>
         </div>
         <div className="cartbody z-index-9 pt-[10px] items-center flex-col flex relative">
          {cart.map((order)=>(
  <div className="cartbody  bg-white rounded-[20px] justify-between px-2 text-[20px] flex text-[24px] m-2 shadow w-[70%]" key={order._id}>
    <div className="">
      <p className='status'>{order.status}</p>
      <h1 className=' text-black'>product </h1>
            {order.cart.map((product)=>(
          <div className="cartbody text-[25px] " key={product._id}>
          <h1 className='m-1 cartbody  text-blue-800'>{product.title} </h1>
          </div>
        ))
       }
    </div>
       
           <div className="">
            <h1 className=' text-black mt-9'>price</h1>
            <h2 className='text-yellow-600'>{order.payments}$</h2>
            <h2 className='oddate'>{order.createdAt}</h2>
           </div>
          </div>
            ))
          }
         
          
         </div>
      </div>
    </div>
  )
}

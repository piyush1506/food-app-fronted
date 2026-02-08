import React from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
import API from '../../utils/axiosInstance'
import Dash from './Dash'
import '../../App.css'
export default function Dish() {
  const navigate = useNavigate();
    const [searchparams]  = useSearchParams();
    const dishname = searchparams.get("name");
  const [loading, setLoading] = useState(false)

    const [resturants,setResturants] = useState([]); 
    // const [cart,setcart] = useState([])
    const [cartopen,setcartopen] = useState(false)
    // const [Checkout,setCheckout] = useState()

    const [cart,setcart] = useState([])
    const [success,setsuccess] = useState(false)


 
    let total = cart.reduce((acc,item)=>acc + Number(item.price),0);
    
    useEffect(()=>{

      const fetchDish = async()=>{
         if (!dishname) return;
         try {
             const res =  await API.get(`/api/v1/food/find?dish=${dishname}`)
             setResturants(res.data.results);
         } catch (error) {
          console.log(error)
         }

      }
       
        // axios.get(`https://food-app-6vp4.onrender.com/api/v1/food/find?dish=${dishname}`)
        // .then(res=>setResturants(res.data.results))
     

        fetchDish()
    },[dishname]);
    const AddtoCart=(item)=>{
       setcart(prev =>{
        const found = prev.find(i =>i._id===item._id );
       
        if (found) {
          return prev.filter(i=>i._id !==item._id);
          
        }
        else{
          return [...prev,item];
        }
       
       });
       
    }
cart.forEach(item => {
  console.log("PRICE:", item.price, "TYPE:", typeof item.price);
});

    const Opencartpage =()=>{
      setcartopen(true)
       
    }
     const CloseCart =()=>{
      setcartopen(false)
       
    }
   
     
   
    const bookfood = async()=>{
      try {
        if (loading) return 
          setLoading(true)
         const token = localStorage.getItem('token')
         console.log("TOKEN:", token);
 console.log(total)
          const detail = {  payments:total,cart:cart.map(i=>i._id)}
          console.log(detail)
      const res =await fetch('https://food-app-6vp4.onrender.com/api/v1/order/createorder',{
        method:'POST',
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(detail)
      })
      const resdata = await res.json();
      console.log(resdata)
       if (resdata.success===true) {
         setsuccess(true)
         setcartopen(false)
         setcart([])
        
           setTimeout(()=>{
        setsuccess(false)
         navigate('/dash')
       },3000)
       }
    

       }
     
       catch (error) {
         console.log('error',error)
      }
finally {
setLoading(false)
}
      } 

    

  return (
    <div className='w-full h-screen  flex justify-center' >
      {success && (
  <div className="fixed top-5 z-[9999] right-5 z-[9999] ">
    <div className="flex items-center gap-3 bg-green-100 text-green-800 px-5 py-3 rounded-lg shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
      </svg>
      <span className="font-semibold">Order placed successfully!</span>
    </div>
  </div>
)}

     {cartopen && (
      
  <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">

    <div className="w-[75%] h-[80%] bg-white rounded-xl shadow-2xl flex relative overflow-hidden">

      {/* LEFT CART SECTION */}
      <div className="w-1/2 p-5 overflow-y-auto">

        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {cart.length === 0 && (
          <div className="text-gray-500 text-center mt-10">
            Cart is empty 🛒
          </div>
        )}

        {cart.map(item => (
          <div key={item._id} className="flex justify-between items-center border-b py-3">

            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500">
                {item.resturant?.title}
              </p>
              <p className="text-xs text-gray-400">
                {item.resturant?.location}
              </p>
            </div>

            <div className="text-lg font-semibold">
              ₹{item.price}
            </div>
          </div>
        ))}

        {/* TOTAL */}
        {cart.length > 0 && (
          <div className="mt-6 border-t pt-4 flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        )}

      </div>

      {/* RIGHT CHECKOUT SECTION */}
      <div className="w-1/2 bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex flex-col justify-center items-center">

        <h1 className="text-3xl font-bold mb-4">Checkout</h1>

        <p className="mb-6 text-center px-6">
          Secure payment • Fast delivery • Fresh food
        </p>

       <button 
  onClick={bookfood}
  disabled={loading}
  className={`bg-white text-purple-700 font-semibold px-8 py-3 rounded-lg transition
  ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'}`}
>
          Proceed to Pay ₹{total}
        </button>

      </div>

      {/* CLOSE BUTTON */}
      <button
        onClick={CloseCart}
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-lg hover:bg-red-600"
      >
        ✕
      </button>

    </div>
  </div>
)}


      <div className=" w-[80%] z-1 mt-9">
 <div className="text-3xl mb-8 z-0 resttitle">
  <h2>Restaurants serving: {dishname}</h2>
      </div>
      <div className=" text-white z-1 ">
        {resturants.map(item =>(
        <div key={item._id} className='my-2 flex shadow-lg hover:-translate-y-3 transition hover:scale-103 shadow-2xl justify-between rounded-lg  p-2'>
          <div className="ml-4 mt-3 details">
            <span>  <h2 className='mb-2 text-2xl text-purple-700 font-bold p- bg-white'>{item.resturant?.title}</h2></span>
            <h1 className='text-[25px] text-yellow-300 '>{item.title}</h1>
            <h2 className='text-orange-300 text-[20px]'>{item.resturant?.location}</h2>
             <p className='text--300 text-[20px]'>₹{item.price}</p>
             <p className='text-blue-300 text-[18px]'>Rating  : {item.rating}/5 </p><p>{item.resturant?.ratingcount} person</p>

          </div>
         
            <div className="flex z-1 items-center flex-col justify-center">
              <span className='flex m-0'> <img className=' m-0 h-[200px]   max-w-[300px] ' src={`${item.imageUrl}`}/></span>
              <span onClick={()=>{ AddtoCart(item)}} className={`${cart.find(i => i._id === item._id) ? ' bg-blue-700 ':''} mt-[-20px]  w-auto flex`}><button className='bg-white text-black w-auto p-1 ' type="button"> {cart.find(i=>i._id===item._id) ?  <i className="fa-solid fa-square-check"></i> : <i className="fa-solid fa-plus"></i>}{!cart.find(i=>i._id===item._id) ? 'Add': 'cancel'}</button></span>
            </div>
        </div>
      ))}
    </div>
  
      </div>
      { cart.length > 0 && (
  <div className="fixed bottom-0 left-0 w-full bg-blue-600 text-white flex justify-between items-center px-6 py-3 z-40">

    <div>
      <h1 className="text-lg font-semibold">
        {cart.length} items in cart
      </h1>
      <p className="text-sm">₹{total} total</p>
    </div>

    <button
      onClick={Opencartpage}
      className="bg-white text-blue-600 font-bold px-6 py-2 rounded-lg"
    >
      View Cart
    </button>

  </div>
)}

      </div>
     


      
  )
}

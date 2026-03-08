import React from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
import API from '../../utils/axiosInstance'
import Dash from './Dash'
import '../../App.css'
import FreeLocationPicker from '../map/map';
export default function Dish() {
  const navigate = useNavigate();
    const [searchparams]  = useSearchParams();
    const dishname = searchparams.get("name");
  const [loading, setLoading] = useState(false);
  const [name, setname] = useState('');
    const [phone, setphone] = useState(null);
  const [position,setposition] = useState({
          lat:25.3471,
          lng:74.6408
      })

    const [resturants,setResturants] = useState([]); 
    // const [cart,setcart] = useState([])
    const [cartopen,setcartopen] = useState(false)
    // const [Checkout,setCheckout] = useState()

    const [cart,setcart] = useState([])
    const [success,setsuccess] = useState(false)
    const [addressData,setaddressData] = useState({
      street:'',
      city:'',
      pincode:'',
      finalAddress:''
    })


 
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
    console.log(cart)
cart.forEach(item => {
  console.log("PRICE:", item.price, "TYPE:", typeof item.price,item.title);
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
          const detail = { 
             payments:total,
            cart:cart.map(i=>i._id),
            deliveryAddress:{
              name :name || '',
              phone :phone || '',
              street:addressData.street || '',
              city:addressData.city || '',
              pincode:addressData.pincode || '',
              fullAddress:addressData.finalAddress || '',
            },
            location:{
              type:'Point',
              coordinates:[position.lng,position.lat]
            }
          }
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

{
  cartopen && (
    <div className="h-screen insert flex flex-col flex-wrap fixed z-50 bg-white  w-full">
      <div className="overflow-y-auto">
         <div className="basis-full h-[50%x] bg-[#FEE7F9]">
      <h2 className='text-2xl p-1'>your Cart</h2>
      <div className=" max-h-[400px] overflow-x-auto">
        {
          cart.map((item,index)=>(
             
                <div key={index} className="flex bg-white m-2 rounded-lg mt-2 flex-col px-5">
                 
                   <span className='text-xl font-bold'>{item.title}</span>
      <span className='text-gray-700'>{item.resturant?.title || 'Restaurant not available'}</span>
      <span className='flex text-gray-700 justify-between items-center'><h2>price</h2>
      <h2>{item.price}</h2></span>
                  {/* </div> */}
            
                </div>
                
     
        
          ))
        }
         
       
      </div>
      <div className="border-t flex justify-between px-4 border-gray-400">
          <h2 className=' border-gray-400 mt-3 p-2 text-xl'>total  </h2>
          <h2 className=' border-gray-400 mt-3 p-2 text-xl'> {total} </h2>
        </div>
      
      
      </div>
      <div className="basis-full min-h-[50%] bg-gradient-to-br">
         <span><h2 className='p-2 text-xl bg-blue-400 text-white font-semibold'>ENTER YOUR ADDRESS</h2></span>
         <div className="min-h-[200px] ">
           <div className="overflow-y-auto">
          
          <FreeLocationPicker 
           position={position}
           setposition={setposition}
           addressData={addressData}
           setaddressData={setaddressData}
          />
         </div>
         <div className="">
          <input
  type='text'
  onChange={(e) => { setname(e.target.value) }}
  className='w-full border-b-2 p-2'
  placeholder='Enter your name'
/>
          <input type='tel' onChange={(e)=>{setphone(e.target.value)}} className='w-full  border-b-2 p-2' placeholder='enter your number'/>
           <button onClick={bookfood} className='bg-blue-500 mx-12  p-2 mt-3 text-white font-semibold'>checkout</button>
        
         </div>
         </div>
         
        
  <button
        onClick={CloseCart}
        className="absolute top-4 right-4  bg-red-500 text-white px-3 py-1 rounded-lg text-lg hover:bg-red-600"
      >
        ✕
      </button>
      </div>
      </div>
      
    </div>
  )
}

     {/* {cartopen && (
      
  <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">

    <div className="w-[75%] h-[80%] bg-white rounded-xl shadow-2xl flex relative overflow-hidden">

     
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

       
        {cart.length > 0 && (
          <div className="mt-6 border-t pt-4 flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        )}

      </div>

    
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

      <button
        onClick={CloseCart}
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-lg hover:bg-red-600"
      >
        ✕
      </button>

    </div>
  </div>
)} */}


      <div className=" w-[80%] z-1 mt-9">
 <div className="text-3xl mb-8 z-0 resttitle">
  <h2>Restaurants serving: {dishname}</h2>
      </div>
      <div className=" text-white z-1 ">
        {resturants.map(item =>(
        <div key={item._id} className='my-2 flex shadow-lg hover:-translate-y-3 transition hover:scale-103 shadow-2xl justify-between rounded-lg  p-2'>
          <div className="ml-4 mt-3 details">
            <span>  <h2 className='mb-2 text-2xl text-purple-700 md:text-[40px] font-bold md:text-[30px] bg-white'>{item.resturant?.title}</h2></span>
            <h1 className='text-[25px] text-yellow-700 md:text-[30px]'>{item.title}</h1>
            <h2 className='text-orange-700 text-[20px] md:text-[30px]'>{item.resturant?.location}</h2>
             <p className='text-gray-800 text-[20px] md:text-[30px]'>₹{item.price}</p>
             <p className='text-blue-900 md:text-[30px] text-[18px]'>Rating  : {item.rating}/5 </p>
             <p className='text-green-900 md:text-[30px]'>{item.resturant?.ratingcount} person</p>

          </div>
         
            <div className="flex z-1 items-center flex-col justify-center">
              <span className='flex m-0'> <img className=' m-0  h-[200px] md:h-[350px]  max-w-[500px] ' src={`${item.imageUrl}`}/></span>
              <span onClick={()=>{ AddtoCart(item)}} className={`${cart.find(i => i._id === item._id) ? ' bg-blue-700 ':''} md:p-4 p-2 md:text-[30px] text-[20px] mt-[-20px]  w-auto flex`}><button className='bg-white text-black w-auto p-1 ' type="button"> {cart.find(i=>i._id===item._id) ?  <i className="fa-solid fa-square-check"></i> : <i className="fa-solid fa-plus"></i>}{!cart.find(i=>i._id===item._id) ? 'Add': 'cancel'}</button></span>
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

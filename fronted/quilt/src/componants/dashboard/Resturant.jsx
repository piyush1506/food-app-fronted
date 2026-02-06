import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Resturant() {
   const [Resturant,setResturant] = useState('')
   const [Food,setFood] = useState([])
   const [detail,setdetail] = useState([])
   const [cartopen,setcartopen] = useState(false)
    const [cart,setcart] = useState([])
    const [loading,setloading] = useState(false)

    const [success,setsuccess] = useState(false)
   const [token,settoken] = useState('')

  const {id} = useParams();
 
  const isInCart = (id) => {
  return cart.some(item => item._id === id);
};

const Opencartpage =()=>{
      setcartopen(true)
       
    }
     const CloseCart =()=>{
      setcartopen(false)
       
    }
  
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

  useEffect(()=>{
   const t =  localStorage.getItem('token',token)
   settoken(t)
  },[])
 const bookfood = async()=>{
   try{
     setloading(true);
     const data ={payments:total,cart:cart.map(i=>i._id)}
       const res = await fetch('https://food-app-6vp4.onrender.com/api/v1/food/createorder',{
    method:"POST",
    headers:{
  "Content-Type":"application/json",
  "Authorization":`Bearer ${token}`
},
body:JSON.stringify(data)

  })
  const resdata = await res.json();
  if (resdata.success) {
     setsuccess(true)
  }

  console.log(resdata)
  setTimeout(()=>{
    setsuccess(false)
    setcartopen(false)
    setcart([])
  },1000)
   }
   catch(err){
    console.log(err)
   }
   finally{
    setloading(false)
   }
  
 }

  
  useEffect(()=>{
    const Getdatail =async()=>{
     

        const Res= await fetch(`https://food-app-6vp4.onrender.com/api/v1/resturant/get/${id}`)
          const data = await Res.json();
          console.log(data)
          setResturant(data.resturant)
          setFood(data.resturant.foods)
    } 
   if(id)Getdatail();
  },[id])

    
   let total = cart.reduce((acc,item)=>acc +Number(item.price),0)

  const Openfoodpage = async(i)=>{
    axios.get(`https://food-app-6vp4.onrender.com/api/v1/food/find?dish=${i.title}`).
    then(res=>setdetail(res.data.result))
    .catch((err)=>{console.log(err)})
    console.log(detail)
  }

  return (
    <>
    <div className="w-full h-screen flex justify-center p-3 ">
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

      <div className="h-[80%] w-[80%] flex flex-col">
        <div className="flex flex-col justify-start  m-auto">
          <span>
            <img className='' src={`${Resturant.imageUrl}`} />
            </span>
           
              </div>
        <div className="flex flex-col rounded-lg  p-3">
          

             <span className='fontst  items-center flex '>
            <h1 className='mt-3 text-3xl  p-1  font-semibold'>{Resturant.title}</h1>
              </span>
           <span className=''><h1 className='text-orange-700 font-bold'> Address: {Resturant.location}</h1></span>
           <span className=''> <h2 className='text-blue-700 font-semibold'>time: {Resturant.time}</h2></span>
           <span className=''> <h2 className='text-green-900 font-bold'>Delivery :  {Resturant.delivery ? 'available':'notavailable'} </h2></span>
           <span className=''> <p className=''>Rating :{Resturant.rating} given by {Resturant.ratingcount}</p></span> 
                 </div>    

             <div className="">
                 <h1 className='mt-5 text-2xl border-b-2 border-blue-900'>foods</h1>
            {Food.length > 0 &&
                  Food.map((i,index)=>(
                    <div className='flex justify-around border-2 mt-4'>
                 <div className="flex flex-col mt-2">
                    <span className='font-semibold text-gray-800 text-xl'>name : {i.title}</span>  
                    <span className='font-semibold text-orange-600'>price : {i.price}</span> 
                    <span className='font-semibold text-'> availability : {i.isavailable ? 'available' : 'notavailable'}</span>
                      <span className='text-purple-900 font-semibold'>rating : {i.rating} people {i.ratingCount}</span>



                 </div>
                  <div className="text-xl mt-2" onClick={()=>{AddtoCart(i)} } key={index || ''}> 
                    <span><img className='  w-[100px] p-1 rounded-lg' src={`${i.imageUrl}`}/> </span>
                    <span className=''>{isInCart(i._id) ? <i className="fa-solid fa-minu"></i>: <i className="fa-solid fa-plus"></i>}{isInCart(i._id) ? 'cancel' : 'ADD'}</span>            
                 </div>
                    </div>
              
                  ))
                 }  
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
     

 
    </>
  )
}

import React, { useEffect, useState } from 'react'
import API from '../../utils/axiosInstance'
export default function Resdashboard() {

     const [isresopen,setisresopen] = useState(false)
     const [iscatopen,setiscatopen] = useState(false)
     const [isfoodopen,setisfoodopen] = useState(false)
     const [pickup,setispickup] = useState(false)
     const [imageUrl,setimageUrl] = useState('')
    //  const [foods,setfoods] = useState('')
     const [title,settitle] = useState('')
     const [time,settime] = useState('')
     const [address,setaddress] =useState('')

     const [allrest,setallrest] = useState([])
    const [cat,setcat]= useState([])
     //category 
     const [category,setcategory] = useState(null)
     const [catimageUrl,setcatimageUrl] = useState('')
     const [cattitle,setcattitle] = useState('')
     const [rating,setrating] = useState()
     const [isopencat,setisopencat] = useState(false)
     const [price,setprice] = useState(null)

     //resturant 
         const [isopenresdrop,setisopenresdrop] = useState(false)
         const [resturant,setresturant]= useState([])
         const [rest,setrest] = useState(null)
          const [resselect,setresselect] = useState(null)
           const [description,setdescription] = useState('')
           const [foodresid,setfoodresid] =useState(null)
           const [ratingc,setratingc] = useState(null)

     const [foodcat,setfoodcat] = useState(null)
     const [select,setselect] = useState(null)
  
    const token = localStorage.getItem('token')
    const CreateRest = async(e)=>{
        try {
             e.preventDefault();
             
         const payload ={title,
            imageUrl,
            location:address,
            foods:[],time,pickup}
            console.log(payload)
         const res = await fetch('https://food-app-6vp4.onrender.com/api/v1/resturant/create',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${token}`
            },

              body:JSON.stringify(payload)
         })
         const data =await res.json()
         console.log(data)
        } catch (error) {
            console.log(error)
        }
         

    }
     const food = async(e)=>{
        try {
             e.preventDefault();
             
         const payload ={title,
            imageUrl,
             description,
            rating,resturant,
             category,
             price,
             ratingCount:ratingc
            }
            console.log(payload)
         const res = await fetch('https://food-app-6vp4.onrender.com/api/v1/food/create-food',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${token}`
            },

              body:JSON.stringify(payload)
         })
         const data =await res.json()
         console.log(data)
         setisopenresdrop(!isopenresdrop)
        } catch (error) {
            console.log(error)
        }
         

    }
    const Createcat = async(e)=>{
          try {
             e.preventDefault();
             
         const payload ={title, imageUrl}
            console.log(payload)
         const res = await fetch('https://food-app-6vp4.onrender.com/api/v1/category/create',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${token}`
            },

              body:JSON.stringify(payload)
         })
         const data =await res.json()
         console.log(data)
        } catch (error) {
            console.log(error)
        }
         
        
    }
    const Createfood = async()=>{
        
    }
    

     useEffect(()=>{
        const allfood = async()=>{
            const res = await API.get('/api/v1/category/get-cat')
            const data = res.data
            
            setcat(data.categories)
            console.log(data.categories)
        }
        allfood();
     },[])

     
       useEffect(()=>{
    const Allrest= async()=>{
         const res = await API.get('/api/v1/resturant/getall')
      const data = res.data
         setallrest(data.resturants)
         console.log('all rest',data.resturants)
    }
    Allrest();
  },[])


console.log(resselect,isopenresdrop,category)




  return (
    <div className='h-screen bg-[#FEEBE7]'>
        {
            isresopen && (
                <div className="fixed inset-0 flex h-screen  w-full ">
                    <form onSubmit={CreateRest} >
                     <div className="bg-white p-6 min-h-[500px] rounded-xl shadow-xl min-w-[450px]">
                        <div className="flex justify-between">
                        <h2 className='text-xl font-semibold mb-4'>Create Restaurant</h2>
                         <span onClick={()=>setisresopen(false)} className=''><i className="fa-solid fa-x"></i></span>
                       
                        </div>
                          <input onChange={(e)=>{settitle(e.target.value)}} value={title} className='border w-full p-2 mb-3' placeholder='resturant title'/>
                        <input onChange={(e)=>{setimageUrl(e.target.value)}} value={imageUrl} className='border w-full p-2 mb-3' placeholder='resturant imgurl'/>
                        <input onChange={(e)=>{settime(e.target.value)}} value={time} className='border w-full p-2 mb-3' placeholder='resturant time '/>
                        <input onChange={(e)=>{setaddress(e.target.value)}} value={address} className='border w-full p-2 mb-3' placeholder='resturant address'/>
                        <div className="flex items-center   gap-9 mb-4">
                         <div className="mb-4 text-xl font-semibold text-blue-500"><h1 className=''>Pickup :</h1></div>
                        <div className="flex items-center gap-2 mb-4">
                            <input    type="radio"    name="pickup" onChange={()=>setispickup(true)}    className="w-4 h-4"  />
                            <span>Available</span>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                            <input type="radio" name="pickup" onChange={()=>setispickup(false)} className="w-4 h-4"  />
                            <span>UnAvailable</span>
                            </div>
                        </div>
                       
                        
                        <button onClick={()=>{setiscatopen(false)}} className='bg-red-400  px-4 py-2 rounded text-white'>submit </button>
                    </div>
                    </form>
                </div>
            )
        }
         {
            iscatopen && (
                <div className="fixed inset-0 flex h-screen  justify-center  w-full ">
                    <form onSubmit={Createcat} >
                     <div className="bg-white p-6 min-h-[500px] rounded-xl shadow-xl min-w-[450px]">
                        <div className="flex justify-between">
                        <h2 className='text-xl font-semibold mb-4'>Create Category</h2>
                         <span onClick={()=>setiscatopen(false)} className=''><i className="fa-solid fa-x"></i></span>
                       
                        </div>
                          <input onChange={(e)=>{settitle(e.target.value)}} value={title} className='border w-full p-2 mb-3' placeholder='resturant title'/>
                        <input onChange={(e)=>{setimageUrl(e.target.value)}} value={imageUrl} className='border w-full p-2 mb-3' placeholder='resturant imgurl'/>
                       
                        
                       
                        
                        <button className='bg-red-400  px-4 py-2 rounded text-white'>submit </button>
                    </div>
                    </form>
                </div>
            )
        }
          {
            isfoodopen && (
                <div className="fixed inset-0 max-h-[80%] flex   w-full ">
                    <form onSubmit={food} >
                     <div className="bg-white p-6 min-h-[500px] rounded-xl shadow-xl min-w-[450px]">
                        <div className="flex justify-between">
                        <h2 className='text-xl font-semibold mb-4'>Create food</h2>
                         <span onClick={()=>setisfoodopen(false)} className=''><i className="fa-solid fa-x"></i></span>
                       
                        </div>
                          <input onChange={(e)=>{settitle(e.target.value)}} value={title} className='border w-full p-2 mb-3' placeholder='food title'/>
                        <input onChange={(e)=>{setimageUrl(e.target.value)}} value={imageUrl} className='border w-full p-2 mb-3' placeholder='food imgurl'/>
                        <input onChange={(e)=>{setprice(e.target.value)}} value={price} className='border w-full p-2 mb-3' placeholder='price'/>
                        <input onChange={(e)=>{setratingc(e.target.value)}} value={ratingc} className='border w-full p-2 mb-3' placeholder='people give rating'/>
                        <div className="max-h-[200px] w-full mb-3 overflow-y-auto ">
                             {/* <div onClick={()=>} className="border flex items-center h-9"> */}
                                <h2 onClick={()=>setisopencat(!isopencat)} className='text-gray-600 border p-2'>{foodcat ? select :'select category'}</h2>
                            
                        
                        {
                            cat.map(item=>(
                                <div key={item._id} className={`${isopencat ? '':'hidden'}`}>
                                        <div className="overflow-y-auto">
                                         <span  onClick={()=>{setcategory(item._id),setselect(item.title),setisopencat(!isopencat)}} className={`block p-2 mb-1 border-b rounded `}>{item.title}</span>
                                         </div>
                                </div>
                            ))
                        }
                        </div>
                           <div className=" max-h-[200px] w-full overflow-y-auto ">
                             {/* <div onClick={()=>} className="border flex items-center h-9"> */}
                                <h2 onClick={()=>setisopenresdrop(!isopenresdrop)} className='text-gray-600 border p-2'>{resselect ? resselect :'select resturant'}</h2>
                            
                        
                        {
                            allrest.map(i=>(
                                <div key={i._id} className={`${isopenresdrop ? '':'hidden'}`}>
                                        <div className="overflow-y-auto">
                                         <span value={resturant} onClick={()=>{setresturant(i._id),setresselect(i.title),setisopenresdrop(!isopenresdrop)}} className={`block p-2 mb-1 border-b rounded `}>{i.title}</span>
                                         </div>
                                      </div>
                            ))
                        }
                        </div>
                        <input value={description} className='h-12 border-2 my-2 p-2 w-full' onChange={(e)=>setdescription(e.target.value)} placeholder='food description'/>
                         <input value={rating} className='h-12 border-2 my-2 p-2 w-full' onChange={(e)=>setrating(e.target.value)} placeholder='rating'/>
                        <button onClick={()=>{setiscatopen(false)}} className='bg-red-400  px-4 py-2 rounded text-white'>submit </button>
                    </div>
                    </form>
                </div>
            )
        }
            <div className="">
               <div className="flex w-full bg-blue-300 font-semibold  shadow justify-center shadow"><h1 className='text-[30px] text-gray-600 '>Resturant Dashboard </h1>
               </div>    
                <div className="grid sm:grid-cols-2 gap-6 md:grid-cols-3 mt-9">
                    <div onClick={()=>setisresopen(true)}  className='h-[100px] w-[250px]  bg-[#F3E] rounded-[20px] shadow-xl b'>
                        <div className="flex justify-center mt-3"><h1 className='text-2xl text-[#260146]'> Restaurant</h1></div>
                        <div className="">
                            <p className='text-[19px] text-yellow-700'>create resturant  </p>
                        </div>
                    </div>
                    <div onClick={()=>setiscatopen(true)} className='h-[100px] w-[250px] rounded-[20px] shadow-xl bg-[#F3EE]'>
                        <div className="flex justify-center mt-3">
                            <h1 className='text-2xl text-white'> Category</h1>
                        </div>
                        <div className="">
                            <p className='text-[19px] text-purple-200'>create category  </p>
                        </div>
                    </div>
                    <div onClick={()=>setisfoodopen(true)} className='h-[100px] w-[250px] rounded-[20px] shadow-xl bg-[#F3EE]'>
                        <div className="flex justify-center mt-3">
                            <h1 className='text-2xl text-[#260146]'>food</h1>
                        </div>
                        <div className="">
                            <p className='text-[19px] text-yellow-700'>create food</p>
                        </div>
                    </div>
                    <div className='h-[100px] w-[250px] rounded-[20px] shadow-xl bg-[#F3EE]'></div>
                </div>
            </div>
    </div>
  )
}

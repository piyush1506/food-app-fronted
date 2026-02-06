import React, { useEffect, useState} from 'react'
import '../../App.css'
import {useNavigate,Navigate} from 'react-router-dom'
import Resturant from './Resturant'
import Header from './Header'


const Dash = () => {
  const navigate = useNavigate();

  const [isauth,setisauth] = useState(false)

  const [user,setuser] = useState(null)
  const [allfood,setallfood] = useState([])
  const [rest,setrest] = useState([])
  // const [foodlist,setfoodlist] = useState([])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    const data = localStorage.getItem('user')

    if(token && data){
      setisauth(true)
      setuser(JSON.parse(data))
    }
  },[])

  useEffect(()=>{
    const Allrest= async()=>{
      const res = await fetch('https://food-app-6vp4.onrender.com/api/v1/resturant/getall',{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
         });
         const data = await res.json();
         console.log('all rest',data)
         setrest(data)
    }
    Allrest();
  },[])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    const Allcategory = async()=>{
      try {
          const res = await fetch('https://food-app-6vp4.onrender.com/api/v1/food/home',{
      method:'GET',
         headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
                 })
           const resdata  = await res.json();
           console.log(resdata)
           setallfood(resdata.foods)
    }
     catch (error) {
        console.error('api error ',error)
      }
    };
  
    Allcategory()  
  },[])

  // const Openpage = async(i)=>{
  //   const fooddetail = await fetch(`http://localhost:8000/api/v1/food/${i.foods}`)
  // }

 

     
            
  const Opendetailpage =async(foodname)=>{

 navigate(`/dish?name=${encodeURIComponent(foodname)}`)
    }
 
    
  
  return (
    <>
      <div className="w-100%  h-screen m-0 p-0 ">
        <div className=" ">
         <Header/>
          <div className="body">
            <div className="title shadow mt-3 bg- p-2 m-auto mx-3 text-3xl flex items-center justify-center"><h1 className='text-orange-500'>What You want to eat today {isauth ? user.username : ''}</h1></div>
              <div className="body-category ">
                <div className="cat1 ">
                  <div className="head"><h2 className='text-[23px] mt-5  '>fast food</h2></div>
                  <div className="cards flex gap-4 overflow-x-auto py-8 scroll-smooth overflow-y-visible scrollbar-hide">
                    {allfood.map((i,index)=>(
            <div  key={i._id || index} onClick={()=>{Opendetailpage(i.title)}} className="box   rounded-lg z-index-3 p-1 shadow-lg min-w-[150px] border transition-all duration-500 ease-in-out hover:-translate-y-3 hover:scale-105 hover:shadow-2xl">
                    <span className="img overflow-hidden "><img className='h-[140px]  w-auto overflow-hidden' src={`${i.imageUrl}`} /></span>
                     <span className='text-xl text-blue-700  font-semibold'>{i?.title}</span>
                       <div className="des">
                   {i?.description}
                    </div>
                    </div>
                    ))}


                  </div>
                </div>
                 <div className="cat1 ">
                  <div className="head"><h2 className='text-[23px] mt-5  '>fast food</h2></div>
                  <div className="cards flex gap-4 overflow-x-auto py-8 scroll-smooth overflow-y-visible scrollbar-hide">
                    {rest.resturants?.map((i,index)=>(
            <div  key={i._id || index} onClick={()=>{navigate(`/resturant/${i._id}`)}} className="box   rounded-lg z-index-3 p-1 shadow-lg min-w-[200px] border transition-all duration-500 ease-in-out hover:-translate-y-3 hover:scale-105 hover:shadow-2xl">
                    <span className="img overflow-hidden "><img className='h-[140px]  w-full' src={`${i.imageUrl}`} /></span>
                     <span className='text-xl text-yellow-700  font-semibold'>{i?.title}</span>
                       <div className="des">
                   {i?.description}
                    </div>
                    </div>
                    ))}


                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Dash
 //piyush12@gmail.com
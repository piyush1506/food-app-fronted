import React,{useState,useEffect} from 'react'
import AdminGraph from './AdminGraph'
import PieChart from './PieChart'

export default function adminDashboard() {


  const [users,setusers] = useState(0)
  const [rev,setrev] = useState(0)
  useEffect(()=>{
    const fetchDash = async()=>{
      try {
         const res = await fetch('http://localhost:8000/api/v1/admin/stats',{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
            }
         })  
         const resdata = await res.json();
         setusers(resdata.totalUsers)
        
         setrev(resdata.totalRevenue)
          console.log(rev)
      } catch (error) {
         console.log(error)
      
      }
    }
    fetchDash()
  },[])



  return (
           
          <div className="h-screen w-full bg-[#FEF5E7] ">
            <div className="">
                 <div className="bg-white flex my-2">
                  <h1 className='text-[26px]  text-[30px] text-[#432C04] '>Admin Dashboard </h1>
                 </div>
                 <div className="flex w-[100%] justify-around">
                  <div className="p-2 flex h-12 rounded-lg shadow ml-3  bg-white flex items-center justify-around text-[20px] text-gray-800 max-w-[200px] gap-3">
                    <span>Total User</span>
                    <span className=''>{users}</span>
                  </div>
                    <div className="p-2 flex h-12 rounded-lg shadow ml-3  bg-white flex items-center justify-around text-[20px] text-gray-800 max-w-[250px] gap-3">
                    <span>Total Revenue</span>
                    <span className=''>{rev}</span>
                  </div>
      
                  
                 </div>
                 <div className="flex mt-9 items-center justify-between dash">
                   <AdminGraph/>
                     <PieChart/>
                 </div>
              
            </div>
          </div>
          //  </>
   
  )
}

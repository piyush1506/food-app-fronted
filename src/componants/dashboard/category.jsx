import React, { useEffect, useState } from 'react'
import API from '../../utils/axiosInstance'

export default function Category() {
    const [cat,setcat] = useState([])
    useEffect(()=>{
        const Getallcat =async ()=>{
            const res = await API.get('/api/v1/category/get-cat');
            const data = res.data
            console.log(data)
            setcat(data.categories)
        }
        Getallcat()
    },[])
  return (
    <>
        <div className="h-screen w-[100%]  bg-[#FEEBE7]">
            <div className=" text-[30px] flex justify-center  ">
                <h1 className='text-purple-900 border  border-gray-800 p-1 rounded-lg'>Available Category</h1>
            </div>
            <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2  items-center">
                {
                    cat.map((list)=>(
                        <div className=' m-3 flex flex-col items-center rounded-[30px] cursor-pointer bg-white'>
                              <div className="rounded-lg " >
                                <img  style={{ width: "250px", radius:"20px",  height: "200px",   objectFit: "cover" }} className='h-[200px]' src={list.imageUrl} />
                            </div>
                            <div className="">
                             <h1 className='text-[30px]'>{list.title}</h1>
                            </div>
                          
                        

                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}
 
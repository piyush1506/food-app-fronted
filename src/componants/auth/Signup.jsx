// import {React, useState } from 'react'
import React, { useEffect, useState } from 'react'

import { Navigate, useNavigate } from 'react-router-dom'
import Login from './Login';
import API from '../../utils/axiosInstance';

export default function Signup() {
 const navigate  = useNavigate();
 const [Isloading,setIsloading] = useState(true)
 const [username,setusername] =useState('');
  const [email,setemail] =useState('');
   const [password,setpassword] =useState('')
   const [address,setaddress] =useState('')
   const [phone,setphone] =useState('')
     const [isloggedin,setisloggedin] =useState(false)
    const [answer,setanswer] =useState('')
   const handlesubmit=async(e)=>{
      e.preventDefault();
 
  
  const data = {
    username,email,password,address,phone,answer
  }
       try {
  //     const Response = await fetch('https://food-app-6vp4.onrender.com/api/v1/auth/register',{
  //       method:'POST',
  //       headers:{
  //         "Content-Type":"application/json"        
  //       },
  //       body:JSON.stringify(data)
  //     })
  //  const resdata = await Response.json();

  const response = await API.post('/api/v1/auth/register',data);
  const resdata =  response.data
     
     console.log(resdata)
     if (resdata.success) {
      localStorage.setItem('token',resdata.token)
      localStorage.setItem('user',JSON.stringify(resdata.user))
      console.log('user registered successfully')
          navigate('/dash')    
    }
     else{
      alert('registeration failed')
     }
    
  } catch (error) {
    return error
  }
      setusername('')
      setemail('')
      setaddress('')
      setphone('')
      setpassword('')
      setanswer('')
     }
 

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    navigate('/dash');
  }
  else{
 setIsloading(false)
  }  
}, []);

 if (Isloading){

 return(<div className='flex justify-center items-center'><h1>Loading</h1></div>)
}

 return (
    
    <div>
      <form onSubmit={handlesubmit}>
        <div className=" flex justify-center w-full h-screen items-center fixed">
          <div className="shadow-xl fixed border-rounded rounded-lg p-2 ">
           <div className="title flex items-center justify-around  text-[25px] font-semibold">
            <div className={`p-2 ${!isloggedin? 'bg-gray-200 ':'p-2'}`} onClick={()=>navigate('/')}>Signup</div>
             <div className={`p-2 ${isloggedin? 'bg-gray-200':''}`} onClick={()=>{navigate('/login'), setisloggedin(!isloggedin)}} >Login</div>
           </div>
           <div className="body flex flex-col">
            <input value={username}  className='outline-none  border-b border-gray-200  placeholder:text-gray-800  placeholder:text-xl   my-2 h-10 w-full min-w-[300px] ' onChange={(e)=>{setusername(e.target.value)}} type='text'placeholder='  name' required/>
            <input value={email} className='outline-none  border-b border-gray-200  placeholder:text-gray-800  placeholder:text-xl   my-2 h-10 w-full min-w-[300px] ' onChange={(e)=>{setemail(e.target.value)}} type='email'placeholder=' email' required/>
            <input value={password} className='outline-none  border-b border-gray-200  placeholder:text-gray-800  placeholder:text-xl   my-2 h-10 w-full min-w-[300px] ' onChange={(e)=>{setpassword(e.target.value)}} type='password'placeholder=' password' required/>
            <input value={phone} className='outline-none  border-b border-gray-200  placeholder:text-gray-800  placeholder:text-xl   my-2 h-10 w-full min-w-[300px] ' onChange={(e)=>{setphone(e.target.value)}} type='tel'  placeholder=' phone' />
            <input value={address} className='outline-none  border-b border-gray-200  placeholder:text-gray-800  placeholder:text-xl   my-2 h-10 w-full min-w-[300px] ' onChange={(e)=>{setaddress(e.target.value)}} type='text'   placeholder=' address' />
            <input value={answer} className='outline-none  border-b border-gray-200  placeholder:text-gray-800  placeholder:text-xl   my-2 h-10 w-full min-w-[300px] ' onChange={(e)=>{setanswer(e.target.value)}} type='text'placeholder='answer pass' required/>
           </div>
           <div className="btn items-center flex justify-center">
            <button className='bg-gray-500 w-full h-8 rounded-lg font-semibold  text-white' type='submit'>Register</button>
           </div>

          </div>
        </div>
        </form>
    </div>
  )
}

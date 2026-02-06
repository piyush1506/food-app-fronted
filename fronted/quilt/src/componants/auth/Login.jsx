import React,{useState,useEffect} from 'react'
import { Navigate,useNavigate } from 'react-router-dom';

export default function Login() {

    const [Isloading,setIsloading] = useState(true)
    const navigate  = useNavigate();
      const [email,setemail] =useState('');
       const [password,setpassword] =useState('')
         const [isloggedin,setisloggedin] =useState(true)
       const handlesubmit=async(e)=>{
          e.preventDefault();
      
      
      const data = {
        email,password}
           try {
          const Response = await fetch('https://food-app-6vp4.onrender.com/api/v1/auth/login',{
            method:'POST',
            headers:{
              "Content-Type":"application/json"        
            },
            body:JSON.stringify(data)
          })
       const resdata = await Response.json();
         console.log(resdata)
         
         if (resdata.success === true) {
           localStorage.setItem('token',resdata.token)
      localStorage.setItem('user',JSON.stringify(resdata.user))
           console.log(resdata.token)
          console.log('user registered successfully')
              navigate('/dash')    
        }
         else{
          alert('registeration failed')
         }
        
      } catch (error) {
      console.log('error is',  error)
      }
          setemail('') 
          setpassword('')

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
      <div>
        <form onSubmit={handlesubmit}>
        <div        className=" flex justify-center w-full h-screen items-center fixed">
          <div      className="shadow-xl mt-[-240px] fixed border-rounded rounded-lg p-2 ">
           <div     className="title flex items-center justify-around  text-[25px] font-semibold">
            <div    className={`p-2 ${!isloggedin? 'bg-gray-200 ':'p-2'}`} onClick={()=>navigate('/')}>Signup</div>
             <div    className={`p-2 ${isloggedin? 'bg-gray-200':''}`} onClick={()=>{navigate('/login'), setisloggedin(!isloggedin)}} >Login</div>
           </div>
           <div className="body flex flex-col">
          
            <input  onChange={(e)=>{setemail(e.target.value)}} value={email} className='outline-none  border-b border-gray-200  placeholder:text-gray-800  placeholder:text-xl   my-2 h-10 w-full min-w-[300px] ' type='email'placeholder=' email' required/>
            <input  onChange={(e)=>{setpassword(e.target.value)}} value={password} className='outline-none  border-b border-gray-200  placeholder:text-gray-800  placeholder:text-xl   my-2 h-10 w-full min-w-[300px] ' type='password'placeholder=' password' required/>
           </div>
           <div className="btn items-center flex justify-center">
            <button className='bg-gray-500 w-full h-8 rounded-lg font-semibold  text-white' type='submit'>Login</button>
           </div>

          </div>
        </div>
        </form>
    </div></div>
  )
}

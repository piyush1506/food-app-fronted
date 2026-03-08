import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dauth() {
  const navigate = useNavigate();

  // form states
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showotp, setshowotp] = useState(false);
  const [password, setPassword] = useState('');
  const [otp, setotp] = useState('');

//   auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('deliverytoken');
    if (token) {
      navigate('/profile', { replace: true });
    }
  }, []);

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
  try{    
     const response =  await fetch(`http://localhost:8000/api/otp/send-otp`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({phone})
        })
        setshowotp(true)
        alert('otp send successfully')
      
      // if(!response.success){
      //   alert(response.message || 'registeration failed')
      // }
     



       
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  ;

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { phone, password };

    try {
      const response = await fetch(
        'http://localhost:8000/api/v1/dboy/loginboy',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
      );

      const resdata = await response.json();
      console.log(resdata)

      if (resdata.success) {
        localStorage.setItem('deliverytoken', resdata.token);
        localStorage.setItem(
          'delivery',
          JSON.stringify(resdata.deliveryboy)
        );
        navigate('/profile', { replace: true });
      } else {
        alert(resdata.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Server error');
    }
  }

  const handleverifyotp = async(e)=>{
    e.preventDefault()
    try {
       const res = await fetch(`http://localhost:8000/api/otp/verify-otp`,{
         method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({phone,otp})
       })
       const resdata  = await res.json()
        console.log(resdata)
       
       if(resdata.success){ 
        const data = {
      name: username,
      email,
      phone,
      password
    };
      const response = await fetch(
        'http://localhost:8000/api/v1/dboy/createboy',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
      );

      const responsedata = await response.json();
       console.log(responsedata)
       if (responsedata.success) {
      localStorage.setItem('deliverytoken', responsedata.token);
      localStorage.setItem('delivery', JSON.stringify(responsedata.deliveryboy));
      navigate('/profile', { replace: true });
    }
  }
      
      // else {
      //   alert(responsedata.message || 'Login failed');
      // }
      
       }
     catch (error) {
      alert(error.message);
    }
  }
  
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={showotp ? handleverifyotp : isLogin ? handleLogin :handleRegister}
        className="shadow-xl rounded-lg p-6 w-[350px]"
      >
        {/* Tabs */}
        <div className="flex justify-around text-lg font-semibold mb-4">
          <span
            className={`cursor-pointer p-2 ${
              !isLogin ? 'bg-gray-200 rounded' : ''
            }`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </span>
          <span
            className={`cursor-pointer p-2 ${
              isLogin ? 'bg-gray-200 rounded' : ''
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </span>
        </div>

        {/* Signup fields */}
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-b my-2 outline-none"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b my-2 outline-none"
              required
            />
          </>
        )}

        {/* Common fields */}
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border-b my-2 outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-b my-2 outline-none"
          required
        />
        {
          showotp && (
             <input
          type="text"
          placeholder="enter otp"
          value={otp}
          onChange={(e) => setotp(e.target.value)}
          className="w-full border-b my-2 outline-none"
          required
        />
          )
        }

        <button
          type="submit"
          className="bg-gray-600 text-white w-full py-2 rounded-lg mt-4"
        >
          {showotp ? 'verifyotp' : isLogin ? 'login':'register'}
        </button>
      </form>
    </div>
  );
}

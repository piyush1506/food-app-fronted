import React from 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
// import { useNavigate} from 'react-router-dom'
import Login from './componants/auth/Login.jsx'
import Protectedroute from './protectedroute.jsx'
import Signup from './componants/auth/Signup.jsx'
import  Dash  from './componants/dashboard/Dash.jsx'
import './App.css'
import Dauth from './componants/auth/Dauth.jsx'
import AdminRoute from './adminRoute.jsx'
import Dish from './componants/dashboard/Dish.jsx'
import Resturant from './componants/dashboard/Resturant.jsx'
import Cart from './componants/dashboard/Cart.jsx'
import Category from './componants/dashboard/category.jsx'
// import Delivery from './deliveryprotectedRoute.jsx'
import AdminDashboard from './componants/dashboard/adminDashboard.jsx'
import Resdashboard from './componants/dashboard/resdashboard.jsx'
import Dhome from './componants/dashboard/Dhome.jsx'
import DeliveryProtectedRoute from './deliveryprotectedRoute.jsx'
import FreeLocationPicker from './componants/map/map.jsx'


function App() {


  return (
  
       <>
    <div className="app">
      <Routes>
 <Route path='/' element={<Signup/>}/>
  <Route path='/category' element={<Category/>}/>
 <Route path='/dish' element={<Dish/>}/>
  <Route path='/dauth' element={<Dauth/>}/>
  <Route path='/profile' element={<Dhome/>}/>
 <Route path="/resturant/:id" element={<Resturant/>} />
 <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dash'
      element={
      <Protectedroute>
      <Dash/>
      </Protectedroute>
      }/>

       <Route path='/profile'
      element={
      <DeliveryProtectedRoute>
      <Dhome/>
      </DeliveryProtectedRoute>
      }/>
      

    <Route path='/admin' element={
      <AdminRoute>
          <AdminDashboard/>
      </AdminRoute>}/>
      <Route path='/resadmin' element={
      <AdminRoute>
          <Resdashboard/>
      </AdminRoute>}/>
  <Route path='/map' element={<FreeLocationPicker/>}/>
      </Routes>
    
    </div>
    </>
   
   
  )
}

export default App

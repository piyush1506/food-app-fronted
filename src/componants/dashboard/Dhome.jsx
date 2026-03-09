

import React,{useEffect,useRef,useState} from "react";
import { io } from 'socket.io-client'

export default function Dhome() {

const socketRef = useRef(null)
const notificationAudioRef = useRef(null)
const token = localStorage.getItem('deliverytoken')
 const [morder,setmorder] = useState([])
const [deliveryBoy,setDeliveryBoy] = useState(null)
const [orders,setOrders] = useState([])
const [notification, setNotification] = useState(null)
const [acceptingOrders,setAcceptingOrders] = useState({})
const [rejectingOrders,setRejectingOrders] = useState({})
const [currentOrder,setCurrentOrder] = useState('')
const [stats,setStats] = useState({
  total:0,accepted:0,income:0})
  const playNotificationSound = ()=>{
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode  = audioContext.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    gainNode.gain.setValueAtTime(0.3,audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01,audioContext.currentTime + 0.5)
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }
  const showBrowserNotification = (title,options={})=>{
    if('Notification' in window && Notification.permission ==='granted'){
      new Notification(title,{
        icon: '/favicon.ico',
        ...options
      })
    }
  }

  const showNotification = (message,type = 'info')=>{
    setNotification({message,type})
    setTimeout(()=>setNotification(null),3000)
  }

useEffect(()=>{
  if (!token)return

  if (socketRef.current?.connected)return
  console.log("→ Starting socket connection...");

  socketRef.current = io('https://food-app-p2kr.onrender.com',{
    auth:{token},
    transports:['websocket'],
    reconnectionAttempts:5,
    // reconnection:true,
    // reconnectionDelay:15
  })

  socketRef.current.on('new-order',(data)=>{
    console.log('Delivery boy connected:', socketRef.current.id)
  

  const formatted = {
    orderId:data.orderId,
    itemCount:data.itemsCount,
    totalPrice:data.totalPrice || 0,
    buyerName:data.buyerName || 'customer',
    deliveryAddress:data.deliveryAddress || 'address pending'
  }
  setOrders((prev)=>{
     const exists = prev.find(o=>o.orderId == formatted.orderId)
     if (exists)return  prev
     return [...prev,formatted]
  })

playNotificationSound()
showNotification(`new order! ${formatted.itemCount} items`,'success')
 showBrowserNotification('new Order Received',{
  body:`${formatted.itemCount} items • ₹${formatted.totalPrice}`,
  tag:formatted.orderId,
})
setStats(prev=>({...prev,total:prev.total+1}))
  })
  socketRef.current.on('connect',()=>{
    console.log('connection connected',socketRef.current.id)
  })
socketRef.current.on('order-accepted',({orderId})=>{
  setOrders(prev =>prev.filter(o=>o.orderId !==orderId))
})

socketRef.current.on('error',(error)=>{
  showNotification(error.message || 'Socket error ','error')
})

return ()=>{
  if(socketRef.current)socketRef.current.disconnect()
}
},[token])


useEffect(()=>{
  if (!token) return

  const fetchPendingOrders = async()=>{
    try {
      const res = await fetch('https://food-app-p2kr.onrender.com/api/v1/order/pending-orders',{
        headers:{
          'Authorization':`Bearer ${token}`,
          'Cache-Control':'no-cache'
        }  })
      const data  = await res.json()
      console.log(data)
      if (data.success) {
        const formatted  = data.orders.map(o=>({
          orderId:o._id.toString(),
          itemCount:o.cart.length,
          totalPrice:o.cart.reduce((sum,item)=>sum +(item.price ||0),0),
          buyerName:o.buyer?.name || 'customer',
          deliveryAddress:`${o.deliveryAddress?.street}, ${o.deliveryAddress?.city}` || 'address pending',
        }))
        setOrders(formatted)
        setStats(prev=>({...prev,total:formatted.length}))      
      }

    } catch (error) {
      showNotification('falied','error')
      console.error(error)
    }
  }
 fetchPendingOrders()
},[])

 const [curr_order,setcurr_order] = useState([])




      useEffect(() => {
  const fetchProfile = async () => {
    if(!token) return
    const res = await fetch('https://food-app-p2kr.onrender.com/api/v1/dboy/stats', {
      headers: {
          'Content-Type':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('deliverytoken')}`
      }
    })

    const data = await res.json()
    console.log('stats',data)
    setmorder(data.stats.orders)
    setCurrentOrder(data.stats.currentOrder)
    console.log(data.stats.currentOrder)
    console.log(data.stats.orders)
    // setcurr_order(data.stats.orders)

    // setStats(data.stats)
     setStats({
          accepted:data.stats?.stats?.acceptOrder,
          total:data.delivery?.stats?.totalOrders,
          income:data.stats?.stats.income || '52023'
        })
    // setOrders(Array.isArray(data.orders) ? data.orders : [])
    // setCurrentOrder(data.currentOrder)

  //   const formatted = (data.orders || []).map(o=>({
  //     orderId:o._id?.toString(),
  //     itemCount:o.cart?.length,
  //     totalPrice:o.cart.reduce((sum,item)=>sum + (item.price || 0),0),
  //     buyerName:o.buyer?.name || 'customer',
  //     deliveryAddress:o.payments?.address || 'address pending',

  //   }))
  //   setOrders(formatted)
  }

  fetchProfile()
}, [])






useEffect(()=>{
  const delivery =  JSON.parse(localStorage.getItem('delivery'))
    setDeliveryBoy(delivery)
},[])


const acceptOrder = async(orderId)=>{
  setAcceptingOrders(prev=>({...prev,[orderId]:true}))
try {
       const res = await fetch(`https://food-app-p2kr.onrender.com/api/v1/order/accept/${orderId}`,{
        method:'PUT',
        headers:{
          'Authorization':`Bearer ${token}`,
          'Content-Type':'application/json'
        }
       })
       const data  = await res.json()
       console.log('data',data)
     
       if (data.success) {
        setOrders(prev=>prev.filter(o=>o.orderId !== orderId))
        
        setStats(prev=>({...prev,accepted:prev.accepted+1}))

        

        // setStats({
        //   accepted:data.stats?.stats?.acceptOrder,
        //   total:data.delivery?.stats?.totalOrders,
        //   income:data.stats?.stats.income || '52023'
        // })

       }else{
        showNotification(data.message || 'failed to accept order',)
       }
      }
        catch(error){
          showNotification(error)
           showNotification(error.message || 'Error accepting order', 'error')
       }
       finally{
        setAcceptingOrders(prev=>({...prev,[orderId]:false}))
       }

}


const RejectOrder = async(orderId)=>{
  setRejectingOrders(prev=>({...prev,[orderId]:true}))
  try {
       const res  = await fetch(`https://food-app-p2kr.onrender.com/api/v1/order/reject/${orderId}`,{
        method:'PUT',
                headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json'
          }
      
       })
       const data = await res.json()
       if (data.success) {
        setOrders(prev=>prev.filter(o=>o.orderId !==orderId))
        showBrowserNotification('order rejected','info')
       }else{
         showBrowserNotification(data.message  || 'failed to reject order','error')
       }
  } catch (error) {
     showBrowserNotification(error.message || 'Error rejecting order','error')
     console.log(error)
  }
  finally{
    setRejectingOrders(prev=>({...prev,[orderId]:false}))
  }
}
const [activeTab,setactiveTab] = useState(1)
  return (
    <div className="min-h-screen bg-[#FAE9BD] bg-gradint-to-br from-slate-50 to-slate-100 p-6">
        {
          notification && (
            <div className={`fixed top-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white font-semibold animate-slide-in z-50 ${
              notification.type ==='success' ? 'bg-green-500':
              notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            }`}>{notification.message}
              </div>
          )
        }
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="">
                <h1 className="text-3xl font-bold text-slate-900">Welcome {deliveryBoy?.name || 'Delivery Boy'}</h1>
                <p className="text-slate-600 mt-1">Real time order notification</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-blue-600">{orders.length || 0}</div>
                <div className="text-sm text-slate-600 ">Pending orders</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg- rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="text-slate-600 text-sm font-semibold">Today s Orders</div>
              <div className="text-3xl font-bold text-slate-900 mt-2">{stats.total || 0}</div>
            </div>
             <div className=" shadow p-6 border-l-4 border-purple-600 rounded-lg">
              <div className="text-slate-600 text-sm font-semibold ">Earnings</div>
              <div className="text-3xl font-bold text-slate-900 mt-2">{stats.income || 0}</div>
             </div>
             <div className=" shadow p-6 border-l-4 border-yellow-600 rounded-lg">
              <div className="text-slate-600 text-sm font-semibold ">Accepted</div>
              <div className="text-3xl font-bold text-slate-900 mt-2">{stats.accepted || 0}</div>
            </div>
          </div>
          <div className="min-h-12 bg-white m-2 mb-3 items-center p-2 flex flex-col justify-between px-3 text-xl ">
            <span className="bg-purple-500 w-full p-2  text-white ">current order</span>
            <div className="w-full flex flex-col">
<span className="w-full font-bold  text-2xl"> {morder.find(order=>order._id === currentOrder)?.deliveryAddress?.name}</span>
           <span className="w-full  "> {morder.find(order=>order._id === currentOrder)?.deliveryAddress?.street} {morder.find(order=>order._id === currentOrder)?.deliveryAddress?.city}</span>
          
            </div>
           </div>

          <div className="">
            <div className="flex justify-around  bg-white mb-4 p-2 items-center ">
              <span onClick={()=>setactiveTab(1)} className={`${activeTab ==1 ? 'bg-slate-700 text-white':''} transition-all ease  p-1 mb-2  rounded flex mx-2 items-center  basis-1/2`}><h2 className="text-2xl  p-y-2 m-auto">Available Orders</h2></span>
              <span onClick={()=>setactiveTab(2)} className={`${activeTab ==2 ? 'bg-slate-700 text-white':''} p-1 mb-2  rounded flex mx-2 items-center  basis-1/2`}><h2 className="text-2xl m-auto ">My orders</h2></span>
            </div>
             
            { activeTab == 1 &&(
             orders.length === 0 ?(
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                      <div className="text-6xl mb-4"></div>
                      <p className="text-xl text-slate-600 font-semibold ">No Orders</p>
                      <p className="text-slate-500 mt-2">Check back soon </p>
                      </div>
              ):(<div className="grid gap-4">
                          {orders.map(order=>(
                            <div key={order.orderId} className="bg-white rounded-xl shadow-sm p-6 border-2 border-transparent hover:border-blue-200 transition-all duration-200 hover:shadow-md">
                                  <div className="flex items-start justify-between  mb-4">
                                    <div className="">
                                      <h3 className="textlg font-bold text-slate-900">
                                        Order #{order.orderId.slice(-8).toUpperCase()}
                                      </h3>
                                      <p className="text-slate-600 textsm mt-1">{order?.buyerName}</p>
                                       <p className="text-slate-600 textsm mt-1">{order.deliveryAddress}</p>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-2xl font-bold text-slate-900">{order.totalPrice}</div>
                                      <div className="text-sm text-slate-600 mt-1">
                                        {order.itemCount}{order.itemCount === 1 ? 'item': 'items'}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-3 mt-4">
                                  
                    <button
                      onClick={() => acceptOrder(order.orderId)}
                      disabled={acceptingOrders[order.orderId]}
                      className="flex-1 bg-gray-800 hover:bg-gray-600 disabled:bg-green-300 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {acceptingOrders[order.orderId] ? (
                        <>
                          <span className="animate-spin">⏳</span> Processing...
                        </>
                      ) : (
                        <> Accept Order</>
                      )}
                    </button>
                                    <button onClick={()=>RejectOrder(order.orderId)} disabled={rejectingOrders[order.orderId]} className="flex-1 bg-orange-500 
                                     disabled:bg-orange-300 text-white font-semibold py-3 rounded-lg transition-all 
                                     duration-200 flex items-center justify-center gap-2">{rejectingOrders[order.orderId] ? (
                                      <>
                                        <span className="animate-spin">⏳</span> processing...
                                      </>
                                     ) :(
                                       <> Reject</>
                                     ) }</button>
                                  </div>
                                </div>
                          ))}
                      </div>
              ))}


              {
                activeTab == 2 && morder.map((ord)=>(
                
                  <div className="bg-gradient-to-b mt-2   min-h-[80px] rounded-md">
                    <div className="flex justify-between mx-3 items-center ">
                      <div className=" p-2">
                        <h2 className="text-2xl">{ord.deliveryAddress?.name}</h2>
                        <p className="">{ord.deliveryAddress?.street} {ord.deliveryAddress?.city}</p>
                      </div>
                      <div className="text-xl font-semibold ">{ord.payments}</div>

                    </div>
                  </div>
                )
                )
              }
          </div>
        </div>
         <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>

    </div>
    
  )
}
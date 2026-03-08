// import React from "react";
// import { Navigate } from "react-router-dom"; 
// export default function Delivery({children}){
//     const token = localStorage.getItem('deliverytoken')
//   const delivery = localStorage.getItem('delivery')
//     console.log(token,delivery)
//    if (!token || !delivery) {
//         return  <Navigate to='/delivery' replace/>
//     }


//     let deliveryData
//     try {
//      deliveryData  = JSON.parse(delivery)
    

// }catch(error){
//    console.log(error)
//      localStorage.removeItem("delivery");
//     localStorage.removeItem("deliverytoken");
// }
//     if(deliveryData.userType !== 'delivery'){
//           return  <Navigate to='/delivery' replace/>
//     }
//     return children;
// }
import { Navigate } from "react-router-dom";
import React from "react";

export default function DeliveryProtectedRoute({ children }) {
  const token = localStorage.getItem("deliverytoken");
  const delivery = localStorage.getItem("delivery");

  // basic check
  if (!token || !delivery) {
    return <Navigate to="/dauth" replace />;
  }

  try {
    const deliveryData = JSON.parse(delivery);

    // 🔐 ROLE CHECK (IMPORTANT)
    if (deliveryData.userType !== "delivery") {
      return <Navigate to="/dauth" replace />;
    }

    return children;

  } catch (error) {
    console.error("Invalid delivery data", error);
    localStorage.removeItem("deliverytoken");
    localStorage.removeItem("delivery");
    return <Navigate to="/dauth" replace />;
  }
}

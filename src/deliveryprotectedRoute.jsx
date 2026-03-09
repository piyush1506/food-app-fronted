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

// import {LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid} from 'recharts';
// import React,{ useEffect,useState } from 'react';
// import API from '../../utils/axiosInstance';

// export default function AdminGraph() {
 
//     const [data,setdata]  = useState([]);
//     useEffect(()=>{
//         const fetchData = async()=>{
//             try {
//           //  const res = await API.get('/api/v1/admin/stats');
//           //       setdata(res.data.stats)
//           //        console.log(res.data.stats);

//           const res  = await fetch('http://localhost:8000/api/v1/admin/stats',{
//             method:'GET',

//           })
//           const resdata = await res.json();
//           setdata(resdata.stats)
//           console.log(resdata.stats)

//             } catch (error) {
//                     console.log(error)
//             }
//         }
//         fetchData();

//         const interval = setInterval(fetchData,5000);

//         return ()=>clearInterval(interval)
//     },[])

//   return (
//     <div className=''>
//       <h2>User Growth graph</h2>
//       <LineChart width={600} height={300} data={data}>
//         <CartesianGrid strokeDasharray='3 3'/>
//         <XAxis dataKey='date'/>
//         <YAxis/>
//         <Tooltip/>
//         <Line type='monotone' dataKey='users'/>
        
//       </LineChart>
//     </div>
//   )
// }
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

import React, { useEffect, useState } from 'react';

export default function AdminGraph() {

  const [data, setdata] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/admin/stats');
        const resdata = await res.json();
        setdata(resdata.stats);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <h2>User Growth graph</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line stroke="#3b82f6" type="monotone" dataKey="users" />
           <Line   stroke="#ef4444" type="monotone" dataKey="orders" />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

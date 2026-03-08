import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import {Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import API from '../../utils/axiosInstance'

ChartJS.register(ArcElement,Tooltip,Legend);

export default function PieChart() {

    const [data,setdata] = useState(null);

    useEffect(()=>{
        const getData = async()=>{
            const res = await fetch('http://localhost:8000/api/v1/admin/stats',
                { method:'GET',
                headers:{
                    'Content-Type':'application/json',
                },
         })
         const data = await res.json()
         const Stats = data.stats
         setdata({
            labels:Stats.map(i=>i.date),
            datasets:[
                {
                    label:'Users',
                    data:Stats.map(i => i.users),
                    backgroundColor:[
                         "#ff6384",
              "#36a2eb",
              "#ffce56",
              "#4bc0c0",
              "#9966ff"
                    ]
                }
            ]
         })
        }
        getData();
    },[])
 
  return (
    <div className='piech flex  mt-[23px] justify-center'>
        
       {data && <Pie data={data}/>}
    </div>
  )
}

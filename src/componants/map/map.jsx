import React,{useEffect, useState}  from 'react'
import "leaflet/dist/leaflet.css"
import {MapContainer,TileLayer,Marker,useMapEvents} from 'react-leaflet'
import L from 'leaflet'



delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
       iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

function LocationMarker ({position,setposition}){
    useMapEvents({
        click(e){
            setposition(e.latlng)
        }
    })
    return (
        <Marker 
        position={position}
        draggable
        eventHandlers={{
            dragend:(e)=>{
                setposition(e.target.getLatLng())
            }
        }}/>
    )
}

export default function FreeLocationPicker({position,setposition,addressData,setaddressData}) {
  
    // const [address, setAddress] = useState("")
    // const [house, sethouse] = useState("")
    // const [finalAddress, setfinalAddress] = useState("")
    
    
    const getAddressFromLating = async(lat,lng)=>{
        try {
             const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
             const data = await res.json()
            //  setAddress(data.display_name || 'address not found')
             const a = data.address || {}
             const street = a.road|| a.neighbourhood || a.suburb || a.residental || ''
            
             const city = a.city || a.town || a.village||''
             const pincode = a.postcode ||''
             const mapaddress = `${street},${city}${pincode ? '-'+ pincode:''}`
 
            //  const finalAddress  = `${house} ${mapaddress}`
            //  setfinalAddress(finalAddress)
            setaddressData(prev =>({
                ...prev,
                street,
                city,
                pincode,
                finalAddress: `${prev.house || ''} ${mapaddress}`
            }))
             console.log(mapaddress)

        } catch (err) {
           console.error('address error',err)  
        }
    }
    useEffect(()=>{
        const timer = setTimeout(() => {
              if (position.lat && position.lng) {
            getAddressFromLating(position.lat,position.lng)
        }
        }, 500);
        return ()=>clearTimeout(timer)      
    },[position])
    

    const livelocation =()=>{
        const watchId = navigator.geolocation.getCurrentPosition((pos)=>{
            setposition({
                lat:pos.coords.latitude,
                lng:pos.coords.longitude
            })
        },
    (err)=>console.error(err),
    {enableHighAccuracy:true}
        )
        return ()=>navigator.geolocation.clearWatch(watchId)
    }





  
  return (
    <div className="p-2 min-h-screen">
        <div className="p-3">
             <MapContainer 
        center={position}
        zoom={18}
        // style={{height:'400px',width:'100%'}}
        className='h-[400px] w-full px-3'
        >
            <TileLayer 
            attribution='© OpenStreetMap'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <LocationMarker position={position} setposition={setposition}/>
        </MapContainer>
        </div>
           

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2  items-center  justify-around ">
            <div className=" p-[10px] mb-[3px]">
                 <h2 className='text-2xl text-blue-500'>select your city from map</h2>
           
                {/* <input type='text'
                value={address}
                className='w-full border-none outline-none shadow h-12 '
                placeholder='Delivery Area' readOnly /> */}

                
            </div>
            <div className="">
                 <h2 className='text-2xl text-orange-500'>enter  your house or street</h2>
           
                <input type='text'
                onChange={(e)=>setaddressData(prev=>({
                    ...prev,
                    house:e.target.value,
                    finalAddress:`${e.target.value} ${prev.street || ''},${prev.pincode ? '-' +prev.pincode :''}`
                  }  ))}
                value={addressData.house}
                className='w-full p-2 shadow border-none outline-none h-12 '
                placeholder='house no or street name' required/>
            </div>
           
        </div>
         <div className="">
                <h2 className='text-2xl'>your delivery address </h2>
                 <input type='text'
                value={addressData.finalAddress || ''}
                className='w-full mt-3 shadow border-none outline-none h-12'
                placeholder='Delivery Area' readOnly />
            </div>
    </div>
        
)
}

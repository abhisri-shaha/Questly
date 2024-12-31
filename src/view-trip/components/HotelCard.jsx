import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaLocationDot } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';

function HotelCard({hotel}) {

    const [photoURL, setPhotoURL] = useState();
    
      useEffect(() => {
        hotel && GetPlacePhoto();
      }, [hotel])
    
      const GetPlacePhoto = async() => {
        const data = {
          textQuery : hotel?.hotelName + ", " + hotel?.hotelAddress
        }
        const result = await GetPlaceDetails(data).then(resp => {
          console.log(resp.data.places[0].photos[3].name);
          const picURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
          setPhotoURL(picURL);
        })
      }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + ", " + hotel?.hotelAddress} target='_blank' className='text-gray-700 hover:text-blue-400 dark:text-[#5377d4]'>
        <div className='border rounded-xl p-4 hover:scale-105 cursor-pointer transition-all hover:shadow-md'>
            <img src={photoURL?photoURL:'/hotel-placeholder.png'} className='rounded-xl h-[180px] w-full object-cover' />
            <div className='my-2 flex flex-col gap-2'>
                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                <h2 className='text-sm'>{hotel?.price}</h2>
                <h2 className='text-sm text-[#C3A97E] dark:text-[#c3a16c]'>★ {hotel?.rating} stars</h2>
                <Button className='text-xs justify-start bg-blue-200 text-gray-700 rounded-3xl'><FaLocationDot/> View on Maps</Button>
            </div>
        </div>
    </Link>
  )
}

export default HotelCard
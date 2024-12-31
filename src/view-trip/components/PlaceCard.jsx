import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCard({place}) {

  const [photoURL, setPhotoURL] = useState();
      
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place])
      
  const GetPlacePhoto = async() => {
    const data = {
      textQuery : place?.placeName
    }
    const result = await GetPlaceDetails(data).then(resp => {
      console.log(resp.data.places[0].photos[3].name);
      const picURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoURL(picURL);
    })
  }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target='_blank' className='text-gray-700 hover:text-blue-400 dark:text-[#5377d4]'>
        <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
            <img src={photoURL?photoURL:'/location-placeholder.png'} className='w-[130px] h-[130px] rounded-xl object-cover' />
            <div className='flex flex-col gap-1'>
                <h2 className='font-bold text-lg'>{place?.placeName}</h2>
                <p className='text-sm text-gray-400'>{place?.placeDetails}</p>
                <h2>🎫 {place?.ticketPricing}</h2>
                <Button className='text-xs  bg-blue-200 text-gray-700 rounded-3xl'><FaLocationDot/> View on Maps</Button>
            </div>
        </div>
    </Link>
  )
}

export default PlaceCard
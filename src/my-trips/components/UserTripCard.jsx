import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCard({trip}) {

    const [photoURL, setPhotoURL] = useState();
    
    useEffect(() => {
    trip && GetPlacePhoto();
    }, [trip])

    const GetPlacePhoto = async() => {
    const data = {
        textQuery : trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp => {
        console.log(resp.data.places[0].photos[3].name);
        const picURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
        setPhotoURL(picURL);
    })
    }

  return (
    <Link to={'/view-trip/' + trip?.id} className='text-blue-800 hover:scale-105 transition-all hover:text-blue-400 dark:text-blue-200'>
        <div>
            <img src={photoURL?photoURL:'/placeholder.jpg'} className='h-[200px] w-full object-cover rounded-xl'/>
            <div className='mt-1'>
                <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
                <h2 className='text-sm text-gray-500'>Days: {trip?.userSelection?.noOfDays}, Budget: {trip?.userSelection?.budget}</h2>
            </div>
        </div>
    </Link>
    
  )
}

export default UserTripCard
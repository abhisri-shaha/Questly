import React from 'react'
import HotelCard from './HotelCard';

function Hotels({trip}) {
  return (
    <div>
        <h2 className='font-extrabold text-2xl my-5 text-[#895129] dark:text-[#c47b48]'>Hotel Recommendations</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {trip?.tripInfo?.hotels?.map((hotel, index) => (
                <HotelCard hotel = {hotel} />
            ))}
        </div>
    </div>
  )
}

export default Hotels
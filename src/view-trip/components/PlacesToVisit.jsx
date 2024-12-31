import React from 'react'
import PlaceCard from './PlaceCard'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-extrabold text-2xl mt-10 text-[#895129] dark:text-[#c47b48]'>Places to Visit</h2>
        <div>
            {trip?.tripInfo?.itinerary?.map((item, index) => (
                <div className='my-3'>
                    <h2 className='font-bold text-lg'>Day {item?.day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {item?.plan.map((place, index) => (
                        <div>
                            <h2 className='font-medium text-md text-[#c3a16c]'>{place?.bestTimeToVisit}</h2>
                            <PlaceCard place={place} />
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit
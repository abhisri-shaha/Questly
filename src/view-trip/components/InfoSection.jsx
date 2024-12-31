import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { IoShareSocial } from "react-icons/io5";

function InfoSection({ trip }) {

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
    <div>
      <img
        src={photoURL?photoURL:'/placeholder.jpg'}
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center">
        <div className="m-5 flex flex-col gap-2">
          <h2 className="font-extrabold text-3xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 dark:text-gray-700 font-bold text-xs md:text-md">
              {trip?.userSelection?.noOfDays == 1
                ? `📅 ${trip?.userSelection?.noOfDays} day`
                : `📅 ${trip?.userSelection?.noOfDays} days`}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 dark:text-gray-700 font-bold text-xs md:text-md">
              💰 {trip?.userSelection?.budget} budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 dark:text-gray-700 font-bold text-xs md:text-md">
              {trip?.userSelection?.traveler == 1
                ? `👤 ${trip?.userSelection?.traveler} person`
                : `👥 ${trip?.userSelection?.traveler} people`}
            </h2>
          </div>
        </div>

        <Button> <IoShareSocial /> </Button>

      </div>
    </div>
  );
}

export default InfoSection;

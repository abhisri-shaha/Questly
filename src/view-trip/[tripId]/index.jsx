import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';

function ViewTrip() {

    const {tripId} = useParams();

    const [trip, setTrip] = useState([]);

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId])

    // to get trip info from firebase
    const GetTripData = async() => {
        const docRef = doc(db, 'Trips', tripId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            console.log(docSnap.data());
            setTrip(docSnap.data());
        }
        else {
            console.log("Error");
            toast('No such doc');
        }
    }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* Info Section */}
            <InfoSection trip={trip} />
        {/* Hotels */}
            <Hotels trip={trip} />
        {/* Places To Visit */}
            <PlacesToVisit trip={trip} />
    </div>
  )
}

export default ViewTrip
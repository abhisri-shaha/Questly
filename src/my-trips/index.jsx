import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import UserTripCard from './components/UserTripCard';

function MyTrips() {

  const navigation = useNavigation();

  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, [])

  const GetUserTrips = async() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(!user) {
      navigation('/');
      return;
    }

    const q = query(collection(db, "Trips"), where("userEmail", "==", user?.email));
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prevTrips => [...prevTrips, doc.data()]);
    });
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className='font-bold text-3xl'>My Trips</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
        {userTrips.length > 0 ? 
            userTrips.map((trip, index) => (
            <UserTripCard trip={trip} key={index}/>
            ))
          :
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={index} className='h-[200px] w-full bg-slate-200 dark:bg-gray-800 animate-pulse rounded-xl'>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyTrips
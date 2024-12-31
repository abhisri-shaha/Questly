import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "@/constants/options";
import { chatSession } from "@/service/AIModel";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess:(codeResp)=> getUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

  const onGenerateTrip = async() => {

    const user = localStorage.getItem('user');
    if(!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 15 || !formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.traveler) {
      toast("Please fill in all the details")
      return;
    }
    
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location.label)
    .replace('{noOfDays}', formData?.noOfDays)
    .replace('{budget}', formData?.budget)
    .replace('{traveler}', formData?.traveler)
    .replace('{noOfDays}', formData?.noOfDays)

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    saveAITrip(result?.response?.text());
  };

  const saveAITrip = async(tripData) => {

    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "Trips", docId), {
      userSelection: formData,
      tripInfo: JSON.parse(tripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
  }

  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    })
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🗺️</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and we will do the
        rest
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination?
          </h2>
          <div className="dark:text-blue-950">
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
              }}
              className="bg-amber-50"
            />
          </div>
          
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">For how many days?</h2>
          <Input
            placeholder={"Max. 15"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            className="dark:bg-white dark:text-black"
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg dark:hover:shadow-[0_4px_15px_rgba(255,255,255,0.6)] bg-amber-50 dark:bg-[#F1EAD2] ${
                  formData?.budget == item.title && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl"> {item.icon} </h2>
                <h2 className="font-bold text-lg font-mono dark:text-[#365194]"> {item.title} </h2>
                <h2 className="text-sm text-gray-500  dark:text-gray-700 font-sans"> {item.desc} </h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who are you traveling with?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg dark:hover:shadow-[0_4px_15px_rgba(255,255,255,0.6)] bg-amber-50 dark:bg-[#F1EAD2] ${
                  formData?.traveler == item.people && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl"> {item.icon} </h2>
                <h2 className="font-bold text-lg font-mono dark:text-[#365194]"> {item.title} </h2>
                <h2 className="text-sm text-gray-500 dark:text-gray-700 font-sans"> {item.desc} </h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={onGenerateTrip}> 
          {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin"/> : "Generate Trip"} 
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={handleClose}>
        <DialogContent className='bg-white dark:bg-[#1a1a1a]'>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo-beige.png" className="w-[50px] h-[50px] rounded-3xl"/>
              <h2 className="font-bold text-lg mt-2">Sign In with Google</h2>
              <p>Login to Questly with Google authentication securely</p>

              <Button disabled={loading} onClick={login} className="w-full mt-5 flex gap-4 items-center"> 
                <FcGoogle className="h-7 w-7"/> 
                Sign In with Google 
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default CreateTrip;

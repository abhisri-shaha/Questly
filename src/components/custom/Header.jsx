import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { IoMdAddCircle } from "react-icons/io";


function Header() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess:(codeResp)=> getUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

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
      window.location.reload();
    })
  }

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo-beige.png" className="w-[50px] h-[50px] rounded-3xl" />

      <div>
        {user ?
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full"><IoMdAddCircle /> Add Trip</Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger className="bg-transparent">
                <img src={user?.picture} className="w-[35px] h-[35px] rounded-full"/>
              </PopoverTrigger>
              <PopoverContent className='bg-[#365194] dark:bg-[#ADD8E7]'>
                <a href='/'>
                  <h2 className='cursor-pointer dark:text-black' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  // window.location.reload();
                }}>
                  Logout
                  </h2>
                </a>
              </PopoverContent>
            </Popover>
          </div>
         : 
          <Button onClick={()=>setOpenDialog(true)} className="bg-[#f7dcb2] text-[#213F84]"> Sign In </Button>
        }
      </div>

      <Dialog open={openDialog} onOpenChange={handleClose}>
        <DialogContent className='bg-white dark:bg-[#1a1a1a]'>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo-beige.png" className="w-[50px] h-[50px] rounded-3xl"/>
              <h2 className="font-bold text-lg mt-2">Sign In with Google</h2>
              <p>Login to Questly with Google authentication securely</p>

              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center"> 
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

export default Header;

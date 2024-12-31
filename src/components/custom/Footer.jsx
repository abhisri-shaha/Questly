import React from 'react'
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function Footer() {
  return (
    <div className='flex justify-between items-center mt-10 px-4 py-3'>
      <h2 className='text-gray-400'>Questly created by Abhisri</h2>
      <div className='flex space-x-4'>
        <a href="https://github.com/abhisri-shaha" target="_blank">
          <IoLogoGithub className='text-gray-400 hover:text-gray-600' />
        </a>
        <a href="https://www.linkedin.com/in/abhisri-shaha" target="_blank">
          <FaLinkedin className='text-gray-400 hover:text-gray-600' />
        </a>
        <a href="mailto:abhisrishaha@gmail.com" target="_blank">
          <SiGmail className='text-gray-400 hover:text-gray-600' />
        </a>
      </div>
    </div>
  )
}

export default Footer

import { Html } from '@react-three/drei'
import React from 'react'
import { appleImg } from "../utils"

const Loader = () => {
  return (
    <Html>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div 
          className=" rounded-full text-transparent"
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "#63625c"
          }}
        >
          loading
        </div>
      </div>
    </Html>
  )
}

export default Loader;
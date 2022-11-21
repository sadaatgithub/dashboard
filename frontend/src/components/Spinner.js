import React from 'react'
import {RiLoader5Fill} from "react-icons/ri"

function Spinner() {
  return (
    <div className="flex h-[100vh] justify-center items-center">
    <RiLoader5Fill className="animate-spin m-auto text-6xl self-center" />
    </div>
  )
}

export default Spinner
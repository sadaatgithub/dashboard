import React from 'react'

const FormDiv = ({children}) => {
  return (
    <div className="bg-white text-gray-800 absolute flex flex-col gap-2 transition-all z-10 rounded-sm p-2
    [&>p]:text-red-500 [&>p]:text-base [&>p]:font-semibold w-full">
            {children}
    </div>
  )
}

export default FormDiv
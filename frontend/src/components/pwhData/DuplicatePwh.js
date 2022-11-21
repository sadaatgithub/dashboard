import React from 'react'
import { FaTimes } from 'react-icons/fa'

const DuplicatePwh = ({data,setDuplicateModal}) => {

  
  return (
    <>
    <div className="absolute top-0 right-0 bottom-0 bg-blue-600 z-20 text-white shadow-xl w-[400px] h-[200px] p-4
    flex flex-col gap-y-4 rounded-sm">
        <FaTimes className="self-end cursor-pointer" onClick={() => setDuplicateModal(false)}/>

        <table>
            <thead>
                <tr>
                    <td>SrNo</td>
                    <td>Full Name</td>
                    <td>View</td>
                </tr>
            </thead>
            <tbody>
            {data.map((data,index) => {
                return <tr key={index}>
                    <td>{data.SrNo}</td>
                    <td className="text-sm font-thin">{data.first_name + " " + data.last_name}</td>
                    <td> </td>
                </tr>
            })}
            </tbody>
        </table>

    </div>
    
    </>
  )
}

export default DuplicatePwh
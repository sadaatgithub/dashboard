import React from 'react'
import { FaTimes } from 'react-icons/fa'

const DuplicatePwh = ({data,setDuplicateModal}) => {

  
  return (
    <>
    <div className="absolute top-0 right-0 bottom-0 bg-blue-700 text-white shadow-lg w-[400px] h-[200px] p-4">
        <FaTimes onClick={() => setDuplicateModal(false)}/>

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
                    <td>{data.first_name + " " + data.last_name}</td>
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
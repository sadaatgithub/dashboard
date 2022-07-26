import React from 'react'
import { FaTimes } from 'react-icons/fa'

const DuplicatePwh = ({data,setDuplicateModal}) => {

  
  return (
    <>
    <div className="duplicate-pwh">
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
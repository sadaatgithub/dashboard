import React from 'react'

const PersonalDetail = (props) => {
    const {addPwh,onChange,valid} = props



  return (
    <>
    <div className="bg-white text-gray-800 absolute flex flex-col gap-2 transition-all z-10 rounded-sm p-2
    [&>p]:text-red-500 [&>p]:text-xl">
    <p>Personal</p>
               
    <div className="flex flex-col md:flex-row  gap-x-8 flex-wrap [&>div>input]:border bg-white  p-2
     w-full border gap-2
    [&>div>input]:p-1 [&>div>label]:text-base [&>div>input]:rounded-sm [&>div>input]:outline-none [&>div>input:focus]:border-indigo-500">
      <div className="flex gap-1 flex-col">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          value={addPwh?.first_name || ''}
          onChange={onChange()}
          // className="border"
          required
        />
       {/* <small>{valid.first_name? "":"Required"}</small> */}
      </div>
      <div className="flex gap-1 flex-col">
        <label htmlFor="guardian_father_name">
          Guardian/Father Name
        </label>
        <input
          type="text"
          name="guardian_father_name"
          value={addPwh?.guardian_father_name || ''}
          onChange={onChange()}
        />
        {/* <span className="error-span"><p>Required</p></span> */}
      </div>
      <div className=" flex gap-1 flex-col">
        <label htmlFor="mothers_name">Mothers Name</label>
        <input
          type="text"
          name="mothers_name"
          value={addPwh?.mothers_name || ''}
          onChange={onChange()}
        />
      </div>
      <div className=" flex gap-1 flex-col">
        <label htmlFor="last_name">Last Name<sup>*</sup></label>
        <input
          type="text"
          name="last_name"
          value={addPwh?.last_name || ''}
          onChange={onChange()}
          required
        />
      </div>
      <div className="flex gap-1 flex-col">
        <label htmlFor="dob">DOB</label>
        <input
          type="date"
          name="dob"
          // format="dd/mm/yyyy"
          // className="date:mr-2"
          value={addPwh?.dob || ''}
          onChange={onChange()}
        />
      </div>
     
      <div className="flex gap-1 flex-col [&>select]:border">
        <label htmlFor="gender">Gender</label>

        <select
          name="gender"
          className="p-1"
          id="gender"
          value={addPwh?.gender || ''}
          onChange={onChange()}
        >
          <option value="not selected">Select</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
          <option value="ND">Not To DIsclosed</option>
        </select>
      </div>
      <div className=" flex gap-1 flex-col ">
        <label htmlFor="religion">Religion</label>
        <select
          name="religion"
          id="religion"
          className="border p-1"
          value={addPwh?.religion || ''}
          onChange={onChange()}
        >
          <option value="not selected">Select</option>
          <option value="H">Hindu</option>
          <option value="M">Muslim</option>
          <option value="S">Sikh</option>
          <option value="C">Christian</option>
          <option value="P">Parasi</option>
        </select>
      </div>
      <div className=" flex gap-1 flex-col">
        <label htmlFor="caste">Caste</label>
        <select
          className="border p-1 [& > *]:text-sm"
          name="caste"
          id="caste"
          value={addPwh?.caste || ''}
          onChange={onChange()}
        >
          <option value="not selected">Select</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="G">GENERAL</option>
          <option value="BC">BC</option>
          <option value="FC">FC</option>
        </select>
      </div>
    </div>
    
    <p>Address</p>
                <div className="flex gap-x-8 flex-wrap [&>div>input]:border bg-white  p-2
    gap-2 border
    [&>div>input]:p-1 [&>div>label]:text-base [&>div>input]:rounded-sm [&>div>input]:outline-none [&>div>input:focus]:border-indigo-500">
                  <div className=" flex gap-1 flex-col">
                    <label htmlFor="line_1">Line 1</label>
                    <input
                      type="text"
                      value={addPwh?.pwh_address?.line_1 || ''}
                      name="line_1"
                      // onChange={onChange('pwh_address')}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className=" flex gap-1 flex-col">
                    <label htmlFor="line_2">Line 2</label>
                    <input
                      type="text"
                      name="line_2"
                      value={addPwh?.pwh_address?.line_2 || ''}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className=" flex gap-1 flex-col">
                    <label htmlFor="line_3">Line 3</label>
                    <input
                      type="text"
                      name="line_3"
                      value={addPwh?.pwh_address?.line_3 || ''}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className=" flex gap-1 flex-col">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      value={addPwh?.pwh_address?.city || ''}
                      onChange={onChange("pwh_address")}

                    />
                  </div>
                  <div className=" flex gap-1 flex-col">
                    <label htmlFor="tahsil">Tahsil</label>
                    <input
                      type="text"
                      value={addPwh?.pwh_address?.tahsil || ''}
                      name="tahsil"
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className=" flex gap-1 flex-col">
                    <label htmlFor="district">District<sup>*</sup></label>
                    <input
                      type="text"
                      name="district"
                      value={addPwh?.pwh_address?.district || ''}
                      onChange={onChange("pwh_address")}
                      required
                    />
                  </div>
                  <div className=" flex gap-1 flex-col">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      name="state"
                      value={addPwh?.pwh_address?.state || ''}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className=" flex gap-1 flex-col">
                    <label htmlFor="pincode">Pincode<sup>*</sup></label>
                    <input
                      type="number"
                      name="pincode"
                      value={addPwh?.pwh_address?.pincode || ''}
                      onChange={onChange("pwh_address")}
                      required
                      placeholder='000000'

                    />
                  </div>
                </div>
                <p>Contact Info</p>
                <div className="flex gap-2 [&>div>input]:border bg-white  p-2
   border
    [&>div>input]:p-1 [&>div>label]:text-base [&>div>input]:rounded-sm [&>div>input]:outline-none [&>div>input:focus]:border-indigo-500">
                  <div className=" flex gap-1 flex-col">
                    <label htmlFor="mobile">Mobile<sup>*</sup></label>
                    <input
                      type="number"
                      name="mobile"
                      value={addPwh?.contact?.mobile || ''}
                      onChange={onChange("contact")}
                      required

                    />
                  </div>
                  <div className=" flex gap-1 flex-col">
                    <label htmlFor="alternate_mobile">Alternate Mobile</label>
                    <input
                      type="number"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                      name="alternate_mobile"
                      value={addPwh?.contact?.alternate_mobile || ''}
                      onChange={onChange("contact")}
                    />
                  </div>
                  <div className=" flex gap-1 flex-col">
                    <label htmlFor="email">Email<sup>*</sup></label>
                    <input
                      type="email"
                      name="email"
                      value={addPwh?.contact?.email || ''}
                      onChange={onChange("contact")}
                      required

                    />

                  </div>
                  
                </div>
                </div>
    </>
  )
}

export default PersonalDetail
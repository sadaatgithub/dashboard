import React, { useEffect } from 'react'

const PersonalDetail = (props) => {
    const {addPwh,onChange} = props



  return (
    <>
    <div className="form-div">
    <p>Personal</p>
               
    <div className="personal-info">
      <div className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          value={addPwh?.first_name}
          onChange={onChange()}
        />
      </div>
      <div className="form-group">
        <label htmlFor="guardian_father_name">
          Guardian/Father Name
        </label>
        <input
          type="text"
          name="guardian_father_name"
          value={addPwh?.guardian_father_name}
          onChange={onChange()}
        />
        {/* <span className="error-span"><p>Required</p></span> */}
      </div>
      <div className="form-group">
        <label htmlFor="mothers_name">Mothers Name</label>
        <input
          type="text"
          name="mothers_name"
          value={addPwh?.mothers_name}
          onChange={onChange()}
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={addPwh?.last_name}
          onChange={onChange()}
        />
      </div>
      <div className="form-group">
        <label htmlFor="dob">DOB</label>
        <input
          type="date"
          name="dob"
          // format
          value={addPwh?.dob}
          onChange={onChange()}
        />
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender</label>

        <select
          name="gender"
          id="gender"
          value={addPwh?.gender}
          onChange={onChange()}
        >
          <option value="not selected">Select</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
          <option value="ND">Not To DIsclosed</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="religion">Religion</label>
        <select
          name="religion"
          id="religion"
          value={addPwh?.religion}
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
      <div className="form-group">
        <label htmlFor="caste">Caste</label>
        <select
          name="caste"
          id="caste"
          value={addPwh?.caste}
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
                <div className="address-info">
                  <div className="form-group">
                    <label htmlFor="line_1">Line 1</label>
                    <input
                      type="text"
                      value={addPwh?.pwh_address?.line_1}
                      name="line_1"
                      // onChange={onChange('pwh_address')}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="line_2">Line 2</label>
                    <input
                      type="text"
                      name="line_2"
                      value={addPwh?.pwh_address?.line_2}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="line_3">Line 3</label>
                    <input
                      type="text"
                      name="line_3"
                      value={addPwh?.pwh_address?.line_3}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      value={addPwh?.pwh_address?.city}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tahsil">Tahsil</label>
                    <input
                      type="text"
                      value={addPwh?.pwh_address?.tahsil}
                      name="tahsil"
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="district">District</label>
                    <input
                      type="text"
                      name="district"
                      value={addPwh?.pwh_address?.district}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      name="state"
                      value={addPwh?.pwh_address?.state}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pincode">Pincode</label>
                    <input
                      type="number"
                      name="pincode"
                      value={addPwh?.pwh_address?.pincode}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                </div>
                <p>Contact Info</p>
                <div className="contact-info">
                  <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      value={addPwh?.contact?.mobile}
                      onChange={onChange("contact")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="alternate_mobile">Alternate Mobile</label>
                    <input
                      type="text"
                      name="alternate_mobile"
                      value={addPwh?.contact?.alternate_mobile}
                      onChange={onChange("contact")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={addPwh?.contact?.email}
                      onChange={onChange("contact")}
                    />
                  </div>
                </div>
                </div>
    </>
  )
}

export default PersonalDetail
import React from 'react'

const MembershipDetails = (props) => {
    const {addPwh,onChange} = props

  return (
    <>
    <div className="form-div">

    <p>Membership</p>
    <div className="membership">
      <div className="form-group">
        <label htmlFor="addar_member">Aadhar no(member)</label>
        <input
          type="text"
          name="aadhar_member"
          value={addPwh?.pwh_membership?.aadhar_member}
          onChange={onChange("pwh_membership")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="aadhar_father">Aadhar no(Father)</label>
        <input
          type="text"
          name="aadhar_father"
          value={addPwh?.pwh_membership?.aadhar_father}
          onChange={onChange("pwh_membership")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="aadhar_mother">Aadhar no(Mother)</label>
        <input
          type="text"
          name="aadhar_mother"
          value={addPwh?.pwh_membership?.aadhar_mother}
          onChange={onChange("pwh_membership")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="aadhar_spouce">Aadhar no(Spouce)</label>
        <input
          type="text"
          name="aadhar_spouce"
          value={addPwh?.pwh_membership?.aadhar_spouce}
          onChange={onChange("pwh_membership")}
        />
      </div>
      </div>
    </div></>
  )
}

export default MembershipDetails
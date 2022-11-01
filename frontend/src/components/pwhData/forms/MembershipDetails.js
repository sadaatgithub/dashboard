
const MembershipDetails = (props) => {
    const {addPwh,onChange} = props

  return (
    <>
    <div className="flex flex-col p-2">

    <p>Membership</p>
    <div className="flex gap-x-8 flex-wrap [&>div>input]:border bg-white  p-2
    [&>div>input]:flex [&>div>input]:flex-col [&>div>input]:gap-1
    [&>div>input]:p-1 [&>div>label]:text-base [&>div>input]:rounded-sm [&>div>input]:outline-none [&>div>input:focus]:border-indigo-500">
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
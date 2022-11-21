import FormGroup from "./FormGroup";
import FormDiv from "./FormDiv";

const MembershipDetails = (props) => {
  const { addPwh, onChange } = props;

  return (
    <>
      <FormDiv
        children={
          <>
            <p>Membership</p>

            <FormGroup
              children={
                <>
                  <div className="">
                    <label htmlFor="addar_member">Aadhar no(member)</label>
                    <input
                      type="text"
                      name="aadhar_member"
                      value={addPwh?.pwh_membership?.aadhar_member}
                      onChange={onChange("pwh_membership")}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="aadhar_father">Aadhar no(Father)</label>
                    <input
                      type="text"
                      name="aadhar_father"
                      value={addPwh?.pwh_membership?.aadhar_father}
                      onChange={onChange("pwh_membership")}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="aadhar_mother">Aadhar no(Mother)</label>
                    <input
                      type="text"
                      name="aadhar_mother"
                      value={addPwh?.pwh_membership?.aadhar_mother}
                      onChange={onChange("pwh_membership")}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="aadhar_spouce">Aadhar no(Spouce)</label>
                    <input
                      type="text"
                      name="aadhar_spouce"
                      value={addPwh?.pwh_membership?.aadhar_spouce}
                      onChange={onChange("pwh_membership")}
                    />
                  </div>
                </>
              }
            />
          </>
        }
      />
    </>
  );
};

export default MembershipDetails;

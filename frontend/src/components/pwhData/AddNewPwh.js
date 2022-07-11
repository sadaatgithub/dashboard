import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../pwhData/forms/form.css";
import {
  createPwh,
  updatePwh,
  getPwhWithId,
  updateFormdata,
  resetUpdateId,
  getDataFromDb,
  reset,
} from "../../features/data/addNewPwhSlice";
import InputElement from "../InputElement";
import { fetchData } from "../../features/data/dataSlice";
import Spinner from "../Spinner";
import Tabs from "./Tabs";
import PersonalInputs from "./PersonalInputs";

// import { } from "../../features/data/updatePwhSlice";

const AddNewPwh = () => {
  // const { data } = useSelector((state) =>state.getPwh)
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isSuccess, isLoading, isDataFetched, isError, message ,isDataToUpdateSuccess} =
    useSelector((state) => state.createPwh);

  // const [addPwh, setAddPwh] = useState(data);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("Personal");

  // const tabArray = ['tab1','tab2','tab3','tab4','tab5']
  const tabArray = [
    "Personal",
    "Educational",
    "Family",
    "Medical",
    "Membership",
  ];

  const index = tabArray.indexOf(value);
  const [tab, setTab] = useState(index);


  const handleFocus = (e) => {
    setFocused(true);
  };

  // if(!isDataFetched){
  //   dispatch(getPwhWithId(id))
  // }

  const onSubmit = (e) => {
    e.preventDefault();

    if (data.id) {
      dispatch(updatePwh(data));
    } else {
      dispatch(createPwh(data));
    }
  };

  const onFocus = (e) => {
    e.target.name === e.target.value && setFocused(true);
  };

  const onChange = (level) => (e) => {
    
    const name = e.target.name
    const value = e.target.value
    const formData = {
      name,value,level
    }
    if (!level) {
  

    // console.log(name,value)
      dispatch(updateFormdata(formData))
      // setdata({...data,[e.target.name]:e.target.value})
      // setdata((prevState) => {
      //   return { ...prevState, [e.target.name]: e.target.value };
      // });

    } else {
      dispatch(updateFormdata(formData))

      // setdata({
      //   ...data,
      //   [level]:{
      //     ...data[level],
      //     [e.target.name]:e.target.value
      //   }
      // })
      // setdata((prevState) => {
      //   return {
      //     ...prevState,
      //     [level]: {
      //       ...prevState[level],
      //       [e.target.name]: e.target.value,
      //     },
      //   };
      // });
    }
  };

  useEffect(() => {

    if(id && !isDataFetched){
      dispatch(getPwhWithId(id))
    }
    console.log(data)
    if (isSuccess) {
      const msg = id? "Updated" : "Added"
      toast.success(` Successfully ${msg}....!`)
      dispatch(fetchData());
      dispatch(resetUpdateId());
      dispatch(reset());
      navigate("/pwh-data");
    }
    if (isError) {
      toast.error(message);
    }
    return () => {
      if(isDataFetched){
      // dispatch(reset());
      dispatch(resetUpdateId());
    }
    };
  }, [dispatch,isSuccess,isDataFetched,isLoading]);
  // dispatch, isSuccess, isError, message, navigate

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="container-form">
        <div className="close-div">
          <button
            className="search-close"
            onClick={() => navigate(-1, { replace: true })}
          >
            Back
          </button>
        </div>

        <div className="form-left">
          <Tabs value={value} setValue={setValue} tabArray={tabArray} />
        </div>

        <div className="form-right">
          <form className="form" onSubmit={onSubmit}>
            <div className="form-section">
              <div
                className={`${value === "Personal" ? "show" : ""} form-div" `}
              >
                <p>Personal</p>
               
                <div className="personal-info">
                  <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={data?.first_name}
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
                      value={data.guardian_father_name}
                      onChange={onChange()}
                    />
                    {/* <span className="error-span"><p>Required</p></span> */}
                  </div>
                  <div className="form-group">
                    <label htmlFor="mothers_name">Mothers Name</label>
                    <input
                      type="text"
                      name="mothers_name"
                      value={data.mothers_name}
                      onChange={onChange()}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={data.last_name}
                      onChange={onChange()}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">DOB</label>
                    <input
                      type="date"
                      name="dob"
                      // format
                      value={data.dob}
                      onChange={onChange()}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>

                    <select
                      name="gender"
                      id="gender"
                      value={data.gender}
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
                      value={data.religion}
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
                      value={data.caste}
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
                      value={data.pwh_address?.line_1}
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
                      value={data.pwh_address?.line_2}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="line_3">Line 3</label>
                    <input
                      type="text"
                      name="line_3"
                      value={data.pwh_address?.line_3}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      value={data.pwh_address?.city}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tahsil">Tahsil</label>
                    <input
                      type="text"
                      value={data.pwh_address?.tahsil}
                      name="tahsil"
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="district">District</label>
                    <input
                      type="text"
                      name="district"
                      value={data.pwh_address?.district}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      name="state"
                      value={data.pwh_address?.state}
                      onChange={onChange("pwh_address")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pincode">Pincode</label>
                    <input
                      type="number"
                      name="pincode"
                      value={data.pwh_address?.pincode}
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
                      value={data.contact?.mobile}
                      onChange={onChange("contact")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="alternate_mobile">Alternate Mobile</label>
                    <input
                      type="text"
                      name="alternate_mobile"
                      value={data.contact?.alternate_mobile}
                      onChange={onChange("contact")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={data.contact?.email}
                      onChange={onChange("contact")}
                    />
                  </div>
                </div>
              </div>

              <div
                className={`${
                  value === "Educational" ? "show" : ""
                } form-div" `}
              >
                <p>Educational</p>
                <div className="educational">
                  <div className="form-group">
                    <p>Studying?</p>
                    <div className="form-control flex">
                      <label htmlFor="is_studying">
                        Yes
                        <input
                          type="radio"
                          name="is_studying"
                          value="true"
                          onChange={onChange("pwh_occupation")}
                        />
                      </label>
                      <label htmlFor="is_studying">
                        No
                        <input
                          type="radio"
                          name="is_studying"
                          value="false"
                          onChange={onChange("pwh_occupation")}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="highest_class">Highest Class</label>
                    <input
                      type="text"
                      name="highest_class"
                      id=""
                      value={data.pwh_occupation?.highest_class}
                      onChange={onChange("pwh_occupation")}
                    />
                  </div>
                </div>
                <p>Occupational</p>
                <div className="occupational">
                  <div className="form-group">
                    <p>Employed?</p>
                    <div className="form-control flex">
                      <label htmlFor="is_employed">
                        Yes
                        <input
                          type="radio"
                          name="is_employed"
                          value="true"
                          onChange={onChange("pwh_occupation")}
                        />
                      </label>
                      <label htmlFor="is_employed">
                        No
                        <input
                          type="radio"
                          name="is_employed"
                          value="false"
                          onChange={onChange("pwh_occupation")}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="employement_type">Employement Type</label>
                    <input
                      type="text"
                      name="employement_type"
                      value={data.pwh_occupation?.employement_type}
                      onChange={onChange("pwh_occupation")}
                    />
                  </div>
                  <div className="form-group">
                    <p>Reimbursment?</p>
                    <div className="form-control flex">
                      <label htmlFor="is_reimbursed">
                        Yes
                        <input
                          type="radio"
                          name="is_reimbursed"
                          value="true"
                          onChange={onChange("pwh_occupation")}
                        />
                      </label>
                      <label htmlFor="is_reimbursed">
                        No
                        <input
                          type="radio"
                          name="is_reimbursed"
                          value="false"
                          onChange={onChange("pwh_occupation")}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="emp_or_name">Employement Org Name</label>
                    <input
                      type="text"
                      name="emp_or_name"
                      id=""
                      value={data.pwh_occupation?.emp_or_name}
                      onChange={onChange("pwh_occupation")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reimbursment_type">Reimbursment Type</label>
                    <input
                      type="text"
                      name="reimbursment_type"
                      id=""
                      value={data.pwh_occupation?.reimbursment_type}
                      onChange={onChange("pwh_occupation")}
                    />
                  </div>
                </div>
              </div>

              <div className={`${value === "Family" ? "show" : ""} form-div" `}>
                <p>Family History</p>
                <div className="family-history">
                  <div className="form-group">
                    <label htmlFor="no_of_affected">No of affected</label>
                    <input
                      type="text"
                      name="no_of_affected"
                      value={data.pwh_family?.no_of_affected}
                      onChange={onChange("pwh_family")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="affected_nhr_id">Affected NHR Id</label>
                    <input
                      type="text"
                      name="affected_nhr_id"
                      value={data.pwh_family?.affected_nhr_id}
                      onChange={onChange("pwh_family")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="family_income">Family Income</label>
                    <input
                      type="text"
                      name="family_income"
                      value={data.pwh_family?.family_income}
                      onChange={onChange("pwh_family")}
                    />
                  </div>
                  <div className="form-group">
                    <p>BPL</p>
                    <div className="form-control flex">
                      <select
                        name="is_bpl"
                        id=""
                        value={data.pwh_family?.is_bpl}
                        onChange={onChange("pwh_family")}
                      >
                        <option value="">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="bpl_ref_no">BPL Ref No</label>
                    <input
                      type="text"
                      name="bpl_ref_no"
                      value={data.pwh_family?.bpl_ref_no}
                      onChange={onChange("pwh_family")}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`${value === "Medical" ? "show" : ""} form-div" `}
              >
                <p>Medical History</p>
                <div className="medical-history">
                  <div className="form-group">
                    <label htmlFor="age_of_diagnosis">Age Of Diagnosis</label>
                    <input
                      type="text"
                      name="age_of_diagnosis"
                      value={data.pwh_medical?.age_of_diagnosis}
                      onChange={onChange("pwh_medical")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="hospital_diagnosis">
                      Hospital Diagnosed
                    </label>
                    <input
                      type="text"
                      name="hospital_diagnosis"
                      value={data.pwh_medical?.hospital_diagnosis}
                      onChange={onChange("pwh_medical")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="blood_group_with_rh">Blood Group</label>
                    <select
                      name="blood_group_with_rh"
                      id=""
                      value={data.pwh_medical?.blood_group_with_rh}
                      onChange={onChange("pwh_medical")}
                    >
                      <option value="">Select</option>
                      <option value="O+">O +ve</option>
                      <option value="O-">O -ve</option>
                      <option value="A+">A +ve</option>
                      <option value="A-">A -ve</option>
                      <option value="AB+">AB +ve</option>
                      <option value="AB-">AB -ve</option>
                      <option value="B+">B +ve</option>
                      <option value="B-">B -ve</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="factor_def">Factor</label>
                    <select
                      name="factor_def"
                      id=""
                      value={data.pwh_medical?.factor_def}
                      onChange={onChange("pwh_medical")}
                    >
                      <option value="null">Select</option>
                      <option value="1">F1</option>
                      <option value="2">F2</option>
                      <option value="3">F3</option>
                      <option value="4">F4</option>
                      <option value="5">F5</option>
                      <option value="6">F6</option>
                      <option value="7">F7</option>
                      <option value="8">F8</option>
                      <option value="9">F9</option>
                      <option value="10">F10</option>
                      <option value="11">F11</option>
                      <option value="12">F12</option>
                      <option value="13">F13</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="factor_level">Factor Level</label>
                    <input
                      type="text"
                      name="factor_level"
                      value={data.pwh_medical?.factor_level}
                      onChange={onChange("pwh_medical")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="others_def">Other Defeciency</label>
                    <select
                      name="others_def"
                      id=""
                      value={data.pwh_medical?.others_def}
                      onChange={onChange("pwh_medical")}
                    >
                      <option value="">Select</option>
                      <option value="VwD">Vwd</option>
                      <option value="glanzmann">Glanzmann</option>
                      <option value="fibronogenemia">Fibrinogenemia</option>
                      <option value="hypofibrogenemia">Hypofibrogenemia</option>
                      <option value="fpd">
                        Functional Platelete Dissorder
                      </option>
                      <option value="disfibronogenemia">
                        Disfibronogenemia
                      </option>
                    </select>
                  </div>
                </div>
                <div className="deformity">
                  <div className="form-group">
                    <p>Inhibitor?</p>
                    <div className="form-control flex">
                      <label htmlFor="is_inhibitor_pos">
                        Yes
                        <input
                          type="radio"
                          name="is_inhibitor_pos"
                          {...(data.pwh_medical?.is_inhibitor_pos === "true"
                            ? "checked"
                            : "np")}
                          value="true"
                          onChange={onChange("pwh_medical")}
                        />
                      </label>
                      <label htmlFor="is_inhibitor_pos">
                        No
                        <input
                          type="radio"
                          name="is_inhibitor_pos"
                          value="false"
                          onChange={onChange("pwh_medical")}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <p>HCV?</p>
                    <div className="form-control flex">
                      <label htmlFor="is_hcv_pos">
                        Yes
                        <input
                          type="radio"
                          name="is_hcv_pos"
                          value="true"
                          onChange={onChange("pwh_medical")}
                        />
                      </label>
                      <label htmlFor="is_hcv_pos">
                        No
                        <input
                          type="radio"
                          name="is_hcv_pos"
                          value="false"
                          onChange={onChange("pwh_medical")}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <p>HIV?</p>
                    <div className="form-control flex">
                      <label htmlFor="is_hiv_pos">
                        Yes
                        <input
                          type="radio"
                          name="is_hiv_pos"
                          value="true"
                          onChange={onChange("pwh_medical")}
                        />
                      </label>
                      <label htmlFor="is_hiv_pos">
                        No
                        <input
                          type="radio"
                          name="is_hiv_pos"
                          value="false"
                          onChange={onChange("pwh_medical")}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <p>Deformity?</p>
                    <div className="form-control flex">
                      <label htmlFor="is_deformity">
                        Yes
                        <input
                          type="radio"
                          name="is_deformity"
                          value="true"
                          onChange={onChange("pwh_medical")}
                        />
                      </label>
                      <label htmlFor="is_deformity">
                        No
                        <input
                          type="radio"
                          name="is_deformity"
                          value="false"
                          onChange={onChange("pwh_medical")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${value === "Membership" ? "show" : ""} form-div" `}
              >
                <p>Membership</p>
                <div className="membership">
                  <div className="form-group">
                    <label htmlFor="addar_member">Aadhar no(member)</label>
                    <input
                      type="text"
                      name="aadhar_member"
                      value={data.pwh_membership?.aadhar_member}
                      onChange={onChange("pwh_membership")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="aadhar_father">Aadhar no(Father)</label>
                    <input
                      type="text"
                      name="aadhar_father"
                      value={data.pwh_membership?.aadhar_father}
                      onChange={onChange("pwh_membership")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="aadhar_mother">Aadhar no(Mother)</label>
                    <input
                      type="text"
                      name="aadhar_mother"
                      value={data.pwh_membership?.aadhar_mother}
                      onChange={onChange("pwh_membership")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="aadhar_spouce">Aadhar no(Spouce)</label>
                    <input
                      type="text"
                      name="aadhar_spouce"
                      value={data.pwh_membership?.aadhar_spouce}
                      onChange={onChange("pwh_membership")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex">
              {/* <span onClick={onNext}>Next</span> */}
              <button type="submit" className="btn btn-submit">
                {isLoading ? "Requesting" : data.id ? "Update" : "Add"}

                {/* Add */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewPwh;

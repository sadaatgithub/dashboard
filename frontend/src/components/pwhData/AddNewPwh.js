import { useState, useEffect } from "react";

import { useSelector,useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../pwhData/forms/form.css'
import { createPwh,updatePwh , reset as resetNewPwh} from "../../features/data/addNewPwhSlice";
import InputElement from "../InputElement";
import { fetchData } from "../../features/data/dataSlice";
import Spinner from "../Spinner";
import Tabs from "./Tabs";
import PersonalInputs from "./PersonalInputs";

// import { } from "../../features/data/updatePwhSlice";



const AddNewPwh = () => {

  // const { data } = useSelector((state) =>state.getPwh)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const initialFormData = {
  //   id:"",
  //   first_name:"",
  //   last_name:"",
  //   guardian_father_name:"",
  //   mothers_name:"",
    
  //   dob:"",
  //   gender:"",
  //   religion:"",
  //   caste:"",
  //   pwh_address: {
  //     line_1:"",
  //     line_2:"",
  //     line_3:"",
  //     tahsil:"",
  //     city:"",
  //     district:"",
  //     state:"",
  //     pincode:"",
  //   },
  //   contact: {
  //     mobile:"",
  //     alternate_mobile:"",
  //     email:"",
  //   },
  //   pwh_family:{
  //     no_of_affected:"",
  //     affected_nhr_id:"",family_income:"",is_bpl:"",bpl_ref_no:"",
  //   },
  //   pwh_medical:{
  //     age_of_diagnosis:"",hospital_diagnosis:"",blood_group_with_rh:"",
  //     factor_def:"",factor_level:"",others_def:"",is_deformity:"",
  //     is_inhibitor_pos:"",is_hiv_pos:"",is_hcv_pos:"",
  //   },
  //   pwh_occupation:{
  //     is_studying:"",highest_class:"",is_employed:"",employement_type:"",
  //     is_reimbursed:"",emp_or_name:"",reimbursment_type:"",
  //   },
  //   pwh_membership:{
  //     aadhar_member:"",aadhar_father:"",aadhar_mother:"",aadhar_spouce:"",
  //   }

  // };



const {data,isSuccess, isLoading,isDataFetched, isError, message} = useSelector((state) =>state.createPwh)

const [addPwh, setAddPwh] = useState(data);
const [focused, setFocused] = useState(false);
const [value,setValue] = useState('Personal')

// const tabArray = ['tab1','tab2','tab3','tab4','tab5']
const tabArray = ['Personal','Educational','Family','Medical','Membership']

const index = tabArray.indexOf(value)
const [tab,setTab] = useState(index)


// const onNext = () =>{
//   if(tab <= tabArray.length){
//     setTab(tab + 1 )
//     setValue(tabArray[tab])
//   }
// }

const handleFocus = (e) => {
  setFocused(true);
};
const onSubmit = (e) => {
    e.preventDefault();
    console.log(addPwh);

if(addPwh.id){
  dispatch(updatePwh(addPwh))
} else{
  dispatch(createPwh(addPwh))

}
  }
const onFocus = (e) =>{
    e.target.name === e.target.value && setFocused(true)
}
  
const onChange = level => e => {

    if(!level){
      // setAddPwh({...addPwh,[e.target.name]:e.target.value})
      setAddPwh((prevState) =>{
        return {...prevState,[ e.target.name]:e.target.value}
      })
    } else{
      // setAddPwh({
      //   ...addPwh,
      //   [level]:{
      //     ...addPwh[level],
      //     [e.target.name]:e.target.value
      //   }
      // })
      setAddPwh((prevState) =>{
        return {...prevState,[level]:{
          ...prevState[level],[e.target.name]: e.target.value
        }}
      })
    }
  
  };

useEffect(() =>{
    if(isSuccess){
      toast.success("Successfully Added...!")
      dispatch(fetchData())
      navigate("/pwh-data")

    }
    if(isError){
      toast.error(message)
    }
    return () =>{
      dispatch(resetNewPwh())
    }
},[dispatch,isLoading,isSuccess,isError,message,navigate])

if(isLoading){
  return <Spinner />
}

  return (
    <>
  <div className="container-form">
  <div className="close-div">
      <button className='search-close'  onClick={() => navigate(-1)}>Back</button>
      </div>

      <div className="form-left">
          <Tabs value={value} setValue={setValue} tabArray={tabArray}/>
          </div>

    <div className="form-right">
      <form className="form" onSubmit={onSubmit}>
       <div className="form-section">
          <div className={`${value === 'Personal'? "show":""} form-div" `}>
                <p>Personal</p>
                {/* <PersonalInputs addPwh={addPwh} inputHandler={onChange()}/> */}
                <div className="personal-info">
                <div className="form-group">
                <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                name="first_name"
                value={addPwh.first_name}
                onChange={onChange()}/>

                </div>
                <div className="form-group">
              <label htmlFor="guardian_father_name">Guardian/Father Name</label>
              <input
                type="text"
            
                name="guardian_father_name"
                value={addPwh.guardian_father_name}
                onChange={onChange()}
                // onBlur={handleFocus}
                // focused={focused.toString()}
                // onFocus={onFocus}
              />
              {/* <span className="error-span"><p>Required</p></span> */}

            </div>
            <div className="form-group">
              <label htmlFor="mothers_name">Mothers Name</label>
              <input
                type="text"
                name="mothers_name"
                value={addPwh.mothers_name}
                onChange={onChange()}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={addPwh.last_name}
                onChange={onChange()}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">DOB</label>
              <input
                type="date"
                name="dob"
                // format
                value={addPwh.dob}
                onChange={onChange()}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
             
              <select name="gender" id="gender" value={addPwh.gender}onChange={onChange()}>
                <option value="not selected">Select</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
                <option value="ND">Not To DIsclosed</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="religion">Religion</label>
              <select name="religion" id="religion" value={addPwh.religion} onChange={onChange()}>
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
              <select name="caste" id="caste" value={addPwh.caste} onChange={onChange()}>
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
                value={addPwh.pwh_address?.line_1}
                name="line_1"
                // onChange={onChange('pwh_address')}
                onChange={onChange('pwh_address')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="line_2">Line 2</label>
              <input
                type="text"
                name="line_2"
                value={addPwh.pwh_address?.line_2}
                onChange={onChange('pwh_address')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="line_3">Line 3</label>
              <input
                type="text"
                name="line_3"
                value={addPwh.pwh_address?.line_3}
                onChange={onChange('pwh_address')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                value={addPwh.pwh_address?.city}
                onChange={onChange('pwh_address')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tahsil">Tahsil</label>
              <input
                type="text"
                value={addPwh.pwh_address?.tahsil}
                name="tahsil"
                onChange={onChange('pwh_address')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="district">District</label>
              <input
                type="text"
                name="district"
                value={addPwh.pwh_address?.district}
                onChange={onChange('pwh_address')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                value={addPwh.pwh_address?.state}
                onChange={onChange('pwh_address')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                type="number"
                name="pincode"
                value={addPwh.pwh_address?.pincode}
                onChange={onChange('pwh_address')}
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
                value={addPwh.contact?.mobile}
                onChange={onChange('contact')}
               
              />
            </div>
            <div className="form-group">
              <label htmlFor="alternate_mobile">Alternate Mobile</label>
              <input type="text" name="alternate_mobile" 
                value={addPwh.contact?.alternate_mobile}
                onChange={onChange('contact')}/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" 

              value={addPwh.contact?.email}
              onChange={onChange('contact')} />
            </div>
            </div>
          
          </div>

        <div className={`${value === 'Educational'? "show":""} form-div" `}>
          <p>Educational</p>
          <div className="educational">
          <div className="form-group">
          <p>Studying?</p>
          <div className="form-control flex">
          <label htmlFor="is_studying">Yes
          <input type="radio" name="is_studying" value="true" 
        onChange={onChange('pwh_occupation')}/></label>
          <label htmlFor="is_studying">No
          <input type="radio" name="is_studying" value="false"
         onChange={onChange('pwh_occupation')}/></label>
         </div>
        </div>
        <div className="form-group">
          <label htmlFor="highest_class">Highest Class</label>
          <input type="text" name="highest_class" id="" value={addPwh.pwh_occupation?.highest_class} onChange={onChange('pwh_occupation')} />
        </div>
          </div>
          <p>Occupational</p>
          <div className="occupational">
          <div className="form-group">
                <p>Employed?</p>
                <div className="form-control flex">
                <label htmlFor="is_employed">Yes
                <input type="radio" name="is_employed" value="true" onChange={onChange('pwh_occupation')} /></label>
                <label htmlFor="is_employed">No
                <input type="radio" name="is_employed" value='false' onChange={onChange('pwh_occupation')} /></label>
                </div>
              </div>
              <div className="form-group">
  <label htmlFor="employement_type">Employement Type</label>
  <input type="text" name="employement_type" value={addPwh.pwh_occupation?.employement_type} onChange={onChange('pwh_occupation')} />
        </div>
        <div className="form-group">
          <p>Reimbursment?</p>
          <div className="form-control flex">
          <label htmlFor="is_reimbursed">Yes
          <input type="radio" name="is_reimbursed" value="true" onChange={onChange('pwh_occupation')} /></label>
          <label htmlFor="is_reimbursed">No
          <input type="radio" name="is_reimbursed" value='false' onChange={onChange('pwh_occupation')} /></label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="emp_or_name">Employement Org Name</label>
          <input type="text" name="emp_or_name" id="" value={addPwh.pwh_occupation?.emp_or_name} onChange={onChange('pwh_occupation')}/>
          
        </div>
        <div className="form-group">
          <label htmlFor="reimbursment_type">Reimbursment Type</label>
          <input type="text" name="reimbursment_type" id="" value={addPwh.pwh_occupation?.reimbursment_type} onChange={onChange('pwh_occupation')}/>

        </div>
          </div>
     
          

        </div>

        <div className={`${value === 'Family'? "show":""} form-div" `}>
          <p>Family History</p>
          <div className="family-history">
          <div className="form-group">
              <label htmlFor="no_of_affected">No of affected</label>
              <input
                type="text"
                name="no_of_affected"
                value={addPwh.pwh_family?.no_of_affected}
                onChange={onChange('pwh_family')}
               
              />
            </div>
        <div className="form-group">
              <label htmlFor="affected_nhr_id">Affected NHR Id</label>
              <input
                type="text"
                name="affected_nhr_id"
                value={addPwh.pwh_family?.affected_nhr_id}
                onChange={onChange('pwh_family')}
              />
            </div>
        <div className="form-group">
              <label htmlFor="family_income">Family Income</label>
              <input
                type="text"
                name="family_income"
                value={addPwh.pwh_family?.family_income}
              onChange={onChange('pwh_family')}
              />
            </div>
        <div className="form-group">
          <p>BPL</p>
          <div className="form-control flex">
              
             <select name="is_bpl" id=""  value={addPwh.pwh_family?.is_bpl}
              onChange={onChange('pwh_family')}>
               <option value="">Select</option>
               <option value="true">Yes</option>
               <option value="false">No</option>
             </select>
              
              {/* <label htmlFor="is_bpl">No
              <input
              
                type="radio"
                name="is_bpl"
                value="false"
                onChange={onChange('pwh_family')}
              /></label> */}
              </div>
            </div>
        <div className="form-group">
              <label htmlFor="bpl_ref_no">BPL Ref No</label>
              <input
                type="text"
                name="bpl_ref_no"
                value={addPwh.pwh_family?.bpl_ref_no}
                onChange={onChange('pwh_family')}
              />
            </div>
          </div>
        </div>
        <div className={`${value === 'Medical'? "show":""} form-div" `}>
          <p>Medical History</p>
          <div className="medical-history">
          <div className="form-group">
                  <label htmlFor="age_of_diagnosis">Age Of Diagnosis</label>
                  <input type="text" name="age_of_diagnosis" value={addPwh.pwh_medical?.age_of_diagnosis}
                onChange={onChange('pwh_medical')}/>
                </div>
                <div className="form-group">
                  <label htmlFor="hospital_diagnosis">Hospital Diagnosed</label>
                  <input type="text" name="hospital_diagnosis" value={addPwh.pwh_medical?.hospital_diagnosis}
                 onChange={onChange('pwh_medical')}/>
                </div>
                <div className="form-group">
             <label htmlFor="blood_group_with_rh">Blood Group</label>
             <select name="blood_group_with_rh" id="" value={addPwh.pwh_medical?.blood_group_with_rh} onChange={onChange('pwh_medical')}>
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
                 <select name="factor_def" id="" value={addPwh.pwh_medical?.factor_def} onChange={onChange('pwh_medical')}>
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
                  <input type="text" name="factor_level" value={addPwh.pwh_medical?.factor_level} onChange={onChange('pwh_medical')}/>
                </div>
                <div className="form-group">
                  <label htmlFor="others_def">Other Defeciency</label>
                  <select name="others_def" id="" value={addPwh.pwh_medical?.others_def} onChange={onChange('pwh_medical')}>
                    <option value="">Select</option>
                    <option value="VwD">Vwd</option>
                    <option value="glanzmann">Glanzmann</option>
                    <option value="fibronogenemia">Fibrinogenemia</option>
                    <option value="hypofibrogenemia">Hypofibrogenemia</option>
                    <option value="fpd">Functional Platelete Dissorder</option>
                    <option value="disfibronogenemia">Disfibronogenemia</option>
                  </select>
                </div>
       
      
        

          </div>
    <div className="deformity">
          <div className="form-group">
          <p>Inhibitor?</p>
          <div className="form-control flex">
          <label htmlFor="is_inhibitor_pos">Yes
          <input type="radio" name="is_inhibitor_pos"  {...data.pwh_medical?.is_inhibitor_pos === 'true'? "checked" : "np"} value="true" onChange={onChange('pwh_medical')} /></label>
          <label htmlFor="is_inhibitor_pos">No
          <input type="radio" name="is_inhibitor_pos" value='false' onChange={onChange('pwh_medical')} /></label>
          </div>
        </div>
          <div className="form-group">
          <p>HCV?</p>
          <div className="form-control flex">

          <label htmlFor="is_hcv_pos">Yes
          <input type="radio" name="is_hcv_pos" value="true" onChange={onChange('pwh_medical')} /></label>
          <label htmlFor="is_hcv_pos">No
          <input type="radio" name="is_hcv_pos" value='false' onChange={onChange('pwh_medical')} /></label>
        </div>
        </div>
        <div className="form-group">
          <p>HIV?</p>
          <div className="form-control flex">

          <label htmlFor="is_hiv_pos">Yes
          <input type="radio" name="is_hiv_pos" value="true" onChange={onChange('pwh_medical')} /></label>
          <label htmlFor="is_hiv_pos">No
          <input type="radio" name="is_hiv_pos" value='false' onChange={onChange('pwh_medical')} /></label>
        </div>
        </div>
        <div className="form-group">
          <p>Deformity?</p>
          <div className="form-control flex">
          <label htmlFor="is_deformity">Yes
          <input type="radio" name="is_deformity" value="true" onChange={onChange('pwh_medical')} /></label>
          <label htmlFor="is_deformity">No
          <input type="radio" name="is_deformity" value='false' onChange={onChange('pwh_medical')} /></label>
          </div>

        </div>
        
          </div>
        </div>
        <div className={`${value === 'Membership'? "show":""} form-div" `}>
          <p>Membership</p>
          <div className="membership">
          <div className="form-group">
      <label htmlFor="addar_member">Aadhar no(member)</label>
      <input type="text" name="aadhar_member" value={addPwh.pwh_membership?.aadhar_member} onChange={onChange('pwh_membership')} />
      
    </div>
    <div className="form-group">
      <label htmlFor="aadhar_father">Aadhar no(Father)</label>
      <input type="text" name="aadhar_father" value={addPwh.pwh_membership?.aadhar_father} onChange={onChange('pwh_membership')} />

    </div>
    <div className="form-group">
      <label htmlFor="aadhar_mother">Aadhar no(Mother)</label>
      <input type="text" name="aadhar_mother" value={addPwh.pwh_membership?.aadhar_mother} onChange={onChange('pwh_membership')} />

    </div>
    <div className="form-group">
      <label htmlFor="aadhar_spouce">Aadhar no(Spouce)</label>
      <input type="text" name="aadhar_spouce" value={addPwh.pwh_membership?.aadhar_spouce} onChange={onChange('pwh_membership')} />

    </div>

          </div>
        </div>
    
     </div>

      <div className="flex">
        {/* <span onClick={onNext}>Next</span> */}
          <button type="submit" className="btn btn-submit">
            {addPwh.id? "Update":"Add"}
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

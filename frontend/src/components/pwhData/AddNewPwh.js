import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../pwhData/forms/form.css";
import {
  createPwh,
  updatePwh,
  reset,
} from "../../features/data/addNewPwhSlice";
import { fetchData } from "../../features/data/dataSlice";
import Spinner from "../Spinner";
import Tabs from "./Tabs";
import updateService from "../../features/data/updateService";
import PersonalDetail from "./forms/PersonalDetail";
import EducationalDetails from "./forms/EducationalDetails";
import FamilyDetails from "./forms/FamilyDetails";
import MedicalDetails from "./forms/MedicalDetails";
import MembershipDetails from "./forms/MembershipDetails";

const AddNewPwh = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isSuccess, isError, message ,isLoading} = useSelector((state) => state.createPwh);
  
  const initialPersonalState = {
    first_name:false,guardian_father_name:false,last_name:false,city:false,district:false,mobile:false,
    pincode:false,email:false
  }

  const [isPersonalInfo,setPersonalInfo] = useState(initialPersonalState)
  const [isPersonalInfovalid, setPersonalInfoValid] =useState(false)
  const [addPwh, setAddPwh] = useState({});
  const [focused, setFocused] = useState(false);
  const [formSteps, setFormSteps] = useState(0)


  const tabArray = [
      "Personal",
      "Educational",
      "Family",
      "Medical",
      "Membership"
  ]


const isValid = Object.values(isPersonalInfo).every(value => value === true)

  const handleFocus = (e) => {
    setFocused(true);
  };


  const onNext = () =>{
    setFormSteps(prevStep => prevStep + 1)

  }

const onPrev = () =>{
  setFormSteps(prevStep => prevStep - 1)

}

  const onSubmit = (e) => {
    e.preventDefault();
    id? dispatch(updatePwh(addPwh)): dispatch(createPwh(addPwh))
    console.log(addPwh)
  };

const onFocus = (e) => {
    e.target.name === e.target.value && setFocused(true);
};
const onBlur = (name,value) =>{
if(name === 'email'){
  if(value.includes('@')){
    setPersonalInfo((prevState) => {return {...prevState,[name]:true}})

  } else {
    setPersonalInfo((prevState) => {return {...prevState,[name]:false}})

  }
} else{
  if(value){
    setPersonalInfo((prevState) => {return {...prevState,[name]:true}})
  } else{
    setPersonalInfo((prevState) => {return {...prevState,[name]:false}})

  }
}
}
  const onChange = (level) => (e) => {
    const name = e.target.name
    const value = e.target.value
    const required = e.target.required
    if (!level) {
      setAddPwh((prevState) => {
        return {...prevState, [e.target.name]: e.target.value };
      });

    } else {
      setAddPwh((prevState) => { 
        return {...prevState,[level]: {...prevState[level],[e.target.name]: e.target.value,
          },
        };
      });
    }
    if(required && !id){
      onBlur(name,value)
    }

  };

  const getPwh = id =>{
    updateService.getPwhWithId(id).then(response =>{
      setAddPwh(response)
    })
    .catch(e =>{
      console.log(e)
    })
  }

  useEffect(() => {
    // console.log(isPersonalInfo)
      console.log(isValid)
    if(id){
    getPwh(id)
  }
    if (isSuccess) {
      const msg = id? "Updated" : "Added"
      toast.success(`Successfully ${msg}....!`)
      dispatch(fetchData());
      dispatch(reset());
      navigate("/pwh-data");
    }
    if (isError) {
      toast.error(message);
    }
  
  }, [id,dispatch,isSuccess,isError,isLoading,navigate,isValid,message]);
 

  return (
    <>
    <div className="close-div">
          <button
            className="back-btn"
            onClick={() => navigate(-1, { replace: true })}
          >
            Back
          </button>
        </div>
     
      <div className="container-form">
        

        <div className="form-left">
          <Tabs formSteps={formSteps} setFormSteps={setFormSteps} tabArray={tabArray} />
        </div>

        <div className="form-right">
      
          <form className="form" onSubmit={onSubmit}>
            <div className="form-section">
              {formSteps === 0 &&  <PersonalDetail addPwh={addPwh} onChange={onChange} valid={isPersonalInfo}/>}
              {formSteps === 1 &&  <EducationalDetails addPwh={addPwh} onChange={onChange}/>}
              {formSteps === 2 &&  <FamilyDetails addPwh={addPwh} onChange={onChange}/>}
              {formSteps === 3 &&  <MedicalDetails addPwh={addPwh} onChange={onChange}/>}
              {formSteps === 4 &&  <MembershipDetails addPwh={addPwh} onChange={onChange}/>}
            </div>

            <div className="form-btn-nxt-prev">
              {formSteps > 0 && <input type='button' className="btn-submit" 
                      value="Prev" onClick={onPrev}/>}
            
                      
            <input type={formSteps > 4? "submit":"button"}  className="btn-submit" 
                  value={formSteps >= 4? addPwh?.id? isLoading? 'Updating' : 'Update' 
                  : isLoading? 'Sending' 
                  : 'Add':"Next"} onClick={onNext}/>
            </div>
            {isValid? "valid":"not Valid"}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewPwh;

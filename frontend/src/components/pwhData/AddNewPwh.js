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
  
  const initialData = {contact:{},pwh_occupation:{},
                      pwh_educational:{},pwh_medical:{},pwh_membership:{},
                      pwh_address:{},pwh_family:{}}


  const initialPersonalState = {
    first_name:false,last_name:false,district:false,mobile:false,
    pincode:false,email:false,factor_def:false
  }

  const [isPersonalInfo,setPersonalInfo] = useState(initialPersonalState)
  const [addPwh, setAddPwh] = useState(initialData);
  const [formSteps, setFormSteps] = useState(0)


  const tabArray = [
      "Personal",
      "Educational",
      "Family",
      "Medical",
      "Membership"
  ]


let isFormValid = Object.values(isPersonalInfo).every(value => value === true)
// const isFormValid = true




  const onNext = () =>{
    if(formSteps > 4) {
      setFormSteps(0)
    } else {
      setFormSteps((prevState) => prevState + 1)
    }

  }

const onPrev = () =>{
  setFormSteps(prevStep => prevStep - 1)

}

const onAlert = () =>{
  if(!isFormValid){
    toast.info('Please Fill the required fields')
  }
}
  const onSubmit = (e) => {
    e.preventDefault();
    id? dispatch(updatePwh(addPwh)): dispatch(createPwh(addPwh))
    console.log(addPwh)

  };


if(id){
  isFormValid = true
}
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

  
    if(id){
    getPwh(id)

  }
    if (isSuccess) {
      navigate("/pwh-data");
      const msg = id? "Updated" : "Added"
      toast.success(`Successfully ${msg}....!`)
      dispatch(fetchData());
      dispatch(reset());
    }
    if (isError) {
      toast.error(message);
    }
  
  }, [id,dispatch,isSuccess,isError,isLoading,navigate,message]);

if(isLoading){
  <h1>Loading.......</h1>
}
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
        <div className="form-btn">
          <Tabs formSteps={formSteps} setFormSteps={setFormSteps} tabArray={tabArray} />
       
        </div>
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
            
               {isLoading? <Spinner />:""}
            <input type={formSteps > 4 && isFormValid? "submit":"button"}  className="btn-submit" 
                  value={formSteps >= 4? addPwh?.id? isLoading? 'Updating' : 'Update' : isLoading? 'Sending' 
                  : 'Add':"Next"} onClick={formSteps > 3 && isFormValid === false ? onAlert:onNext}/>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewPwh;

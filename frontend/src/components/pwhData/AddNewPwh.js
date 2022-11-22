import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import "../pwhData/forms/form.css";
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
  <h1><Spinner/></h1>
}
  return (

   
    <>
    <div className="close-div bg-white py-2">
          <button className="bg-gray-600 text-white py-1 px-2 rounded" onClick={() => navigate(-1, { replace: true })}>Back</button>
    </div>
     
      <div className="flex md:flex-row flex-col gap-1 w-full h-[80vh] border shadow-sm ">
        

        <div className="md:w-1/5 bg-white">
          <Tabs formSteps={formSteps} setFormSteps={setFormSteps} tabArray={tabArray} />
        </div>

      
          <form className="md:w-4/5 flex h-full flex-col  bg-white" onSubmit={onSubmit}>
            <div className="relative flex-grow text-left overflow-y-auto">
              
              {
                formSteps === 0 ? <PersonalDetail addPwh={addPwh} onChange={onChange} valid={isPersonalInfo}/>
                :formSteps === 1 ? <EducationalDetails addPwh={addPwh} onChange={onChange}/>
                :formSteps === 2 ? <FamilyDetails addPwh={addPwh} onChange={onChange}/>
                :formSteps === 3 ?  <MedicalDetails addPwh={addPwh} onChange={onChange}/>
                :<MembershipDetails addPwh={addPwh} onChange={onChange}/>
              }
            
            </div>

            <div className="z-10 self-center flex gap-x-4 mb-2">
              {formSteps > 0 && <input type='button' className="bg-blue-600 text-white px-3 py-2 rounded-sm cursor-pointer" 
                      value="Prev" onClick={onPrev}/>}
            
            <input type={formSteps > 4 && isFormValid? "submit":"button"}  className="bg-blue-600 text-white px-3 py-2 rounded-sm cursor-pointer" 
                  value={formSteps >= 4? addPwh?.id? isLoading? 'Updating' : 'Update' : isLoading? 'Sending' 
                  : 'Add':"Next"} onClick={formSteps > 3 && isFormValid === false ? onAlert:onNext}/>
            </div>
          </form>
      </div>
    </>
  );
};

export default AddNewPwh;

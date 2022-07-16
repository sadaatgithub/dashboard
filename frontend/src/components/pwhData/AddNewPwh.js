import { useState, useEffect } from "react";
// import http from "../http-common";
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

  const { data, isSuccess, isError, message ,isLoading} =
    useSelector((state) => state.createPwh);
  const {data:allData} =useSelector((state) => state.data)
  
  // const filterData = allData.filter((data) => data.id == id)

  const [addPwh, setAddPwh] = useState();
  const [focused, setFocused] = useState(false);
  const [formSteps, setFormSteps] = useState(0)


  const tabArray = [
      "Personal",
      "Educational",
      "Family",
      "Medical",
      "Membership"
  ]




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
    // id? dispatch(updatePwh(addPwh)): dispatch(createPwh(addPwh))
    console.log(addPwh)
  };

const onFocus = (e) => {
    e.target.name === e.target.value && setFocused(true);
};

  const onChange = (level) => (e) => {
    if (!level) {
      setAddPwh((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    } else {
      setAddPwh((prevState) => {
        return {
          ...prevState,[level]: {...prevState[level],[e.target.name]: e.target.value,
          },
        };
      });
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
    if(formSteps > 4){
      setFormSteps(0)
    }
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

  
  }, [id,dispatch,isSuccess,isError,isLoading,navigate,formSteps]);
 

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
        <br/>
     
      <div className="container-form">
        

        <div className="form-left">
          <Tabs formSteps={formSteps} setFormSteps={setFormSteps} tabArray={tabArray} />
        </div>

        <div className="form-right">
      
          <form className="form" onSubmit={onSubmit}>
            <div className="form-section">
              {formSteps === 0 &&  
                <PersonalDetail addPwh={addPwh} onChange={onChange}/>
              }
              {formSteps === 1 &&  
                <EducationalDetails addPwh={addPwh} onChange={onChange}/>
              }
              {formSteps === 2 &&  
                <FamilyDetails addPwh={addPwh} onChange={onChange}/>
              }
              {formSteps === 3 &&  
                <MedicalDetails addPwh={addPwh} onChange={onChange}/>
              }
              {formSteps === 4 &&  
                <MembershipDetails addPwh={addPwh} onChange={onChange}/>
              }
            

              {/* <div className={`${
                  formSteps === 1 ? "show" : ""
                } form-div" `}>
                <EducationalDetails addPwh={addPwh} onChange={onChange} />
                
              </div> */}

              {/* <div className={`${formSteps === 2 ? "show" : ""} form-div" `}>
              <FamilyDetails addPwh={addPwh} onChange={onChange} />
              </div> */}
              {/* <div
                className={`${formSteps === 3? "show" : ""} form-div" `}
              >
            <MedicalDetails addPwh={addPwh} onChange={onChange}/>
              </div> */}
              {/* <div
                className={`${formSteps === 4 ? "show" : ""} form-div" `}
              >
           <MembershipDetails addPwh={addPwh} onChange={onChange}/>
              </div> */}
            </div>

            <div className="flex">
              {/* <button type="submit" className="btn btn-submit">
                {addPwh?.id? isLoading? 'Updating' : 'Update' : isLoading? 'Sending' : 'Add'}
              </button> */}
            <input type='button' disabled={formSteps <= 0} className="btn btn-submit" 
                      value="Prev" onClick={onPrev}/>
                      
            <input type={formSteps > 4? "submit":"button"}  className="btn btn-submit" 
                      value={formSteps >= 4? "Submit":"Next"} onClick={onNext}/>
            </div>
          </form>
          {/* <button onClick={onPrev}>Prev</button>
          <button onClick={onNext}>Next</button> */}

        </div>
      </div>
    </>
  );
};

export default AddNewPwh;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { updateData } from "../../features/data/getPwhSlice";
// import AddressPwh from "./AddressPwh";
// import ContactPwh from "./ContactPwh";
// import { updatePwh, reset } from "../../features/data/updatePwhSlice";
// import { toast } from "react-toastify";
// // import Spinner from './Spinner';
// import Spinner from "../Spinner";



// function EditPwh() {
//   const { data} = useSelector(
//     (state) => state.getPwh
//   );
//   const { isLoading, isSuccess,isError, message} = useSelector(
//     (state) => state.updatePwh
//   );

//   const [formData, setFormData] = useState(data);
//   const { id } = useParams();
//   const navigate = useNavigate()
//   const dispatch = useDispatch();

//   const onSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     dispatch(updatePwh(formData))
//   };


//   useEffect(() => {
//     console.log(formData);
//     if(isError){
//       toast.error(message)
//     }

//     if(isSuccess){
//         navigate("/pwh-data")
//         toast.success('Updated Successfully')
//     }
//     return () =>{
//       dispatch(reset())
//     }

//   }, [isSuccess]);

//   if (isLoading) {
//     return <Spinner />;
//   }
//   return (
//     <>
//        <form onSubmit={onSubmit}>
//         <div className="form-heading">
//           <h3>Add New Data</h3>
//         </div>
//         <div className="form-div">
//           <div className="form-div-parts">
//             <div className="form-group">
//               <label htmlFor="first_name">First Name</label>
//               <input
//                 type="text"
//                 name="first_name"
//                 value={formData.first_name}
//                 onChange={(e) => {
//                   setFormData(prevState => ({
//                     ...prevState,
//                     [e.target.name]:e.target.value,
                    
//                   }));
//                 }}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="guardian_name">Middle Name</label>
//               <input
//                 type="text"
//                 name="guardian_name"
//                 value={formData.guardian_name}
//                 onChange={(e) => {
//                   setFormData(prevState => ({
//                     ...prevState,
//                     [e.target.name]:e.target.value,
                    
//                   }));
//                 }}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="first_name">Last Name</label>
//               <input
//                 type="text"
//                 name="last_name"
//                 value={formData.last_name}
//                 onChange={(e) => {
//                   setFormData(prevState => ({
//                     ...prevState,
//                     [e.target.name]:e.target.value,
                    
//                   }));
//                 }}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="dob">DOB</label>
//               <input
//                 type="date"
//                 name="dob"
//                 format
//                 value={formData.dob}
//                 onChange={(e) => {
//                   setFormData(prevState => ({
//                     ...prevState,
//                     [e.target.name]:e.target.value,
                    
//                   }));
//                 }}
//               />
//             </div>
//           </div>
//           <div className="form-div-parts">
//             <div className="form-group">
//               <label htmlFor="line_1">Line 1</label>
//               <input
//                 type="text"
//                 value={formData.pwh_address?.line_1}
//                 name="line_1"
//                 // onChange={onChange('pwh_address')}
//                 onChange={(e) => {
//                     setFormData(prevState => ({
//                       ...prevState,
//                       pwh_address: {
//                         ...prevState.pwh_address,
//                         [e.target.name]: e.target.value,
//                       },
//                     }));
//                   }}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="line_2">Line 2</label>
//               <input
//                 type="text"
//                 name="line_2"
//                 value={formData.pwh_address?.line_2}
//                 onChange={(e) => {
//                   setFormData(prevState => ({
//                     ...prevState,
//                     pwh_address: {
//                       ...prevState.pwh_address,
//                       [e.target.name]: e.target.value,
//                     },
//                   }));
//                 }}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="line_3">Line 3</label>
//               <input
//                 type="text"
//                 name="line_3"
//                 value={formData.pwh_address?.line_3}
//                 onChange={(e) => {
//                   setFormData(prevState => ({
//                     ...prevState,
//                     pwh_address: {
//                       ...prevState.pwh_address,
//                       [e.target.name]: e.target.value,
//                     },
//                   }));
//                 }}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="city">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.pwh_address?.city}
//                 onChange={(e) => {
//                   setFormData(prevState => ({
//                     ...prevState,
//                     pwh_address: {
//                       ...prevState.pwh_address,
//                       [e.target.name]: e.target.value,
//                     },
//                   }));
//                 }}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="tahsil">Tahsil</label>
//               <input
//                 type="text"
//                 value={formData.pwh_address?.tahsil}
//                 name="tahsil"
//                 onChange={(e) => {
//                   setFormData(prevState => ({
//                     ...prevState,
//                     pwh_address: {
//                       ...prevState.pwh_address,
//                       [e.target.name]: e.target.value,
//                     },
//                   }));
//                 }}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="district">District</label>
//               <input
//                 type="text"
//                 name="district"
//                 value={formData.pwh_address?.district}
//                 onChange={(e) => {
//                   setFormData(prevState => ({
//                     ...prevState,
//                     pwh_address: {
//                       ...prevState.pwh_address,
//                       [e.target.name]: e.target.value,
//                     },
//                   }));
//                 }}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="state">State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.pwh_address?.state}
//                 onChange={(e) => {
//                   setFormData(prevState => ({
//                     ...prevState,
//                     pwh_address: {
//                       ...prevState.pwh_address,
//                       [e.target.name]: e.target.value,
//                     },
//                   }));
//                 }}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="pincode">Pincode</label>
//               <input
//                 type="number"
//                 name="pincode"
//                 value={formData.pwh_address?.pincode}
//                 onChange={(e) => {
//                   setFormData(prevState => ({
//                     ...prevState,
//                     pwh_address: {
//                       ...prevState.pwh_address,
//                       [e.target.name]: e.target.value,
//                     },
//                   }));
//                 }}
//               />
//             </div>
//           </div>
//           <div className="form-div-parts">
//             <div className="form-group">
//               <label htmlFor="mobile">Mobile</label>
//               <input
//                 type="text"
//                 name="mobile"
//                 value={formData.contact?.mobile}
//                 onChange={(e) => {
//                   setFormData(prevState => ({
//                     ...prevState,
//                     contact: {
//                       ...prevState.contact,
//                       [e.target.name]: e.target.value,
//                     },
//                   }));
//                 }}
        
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="alternate_mobile">Alternate Mobile</label>
//               <input type="text" name="alternate_mobile" 
//                 value={formData.contact?.alternate_mobile}
//               onChange={(e) => {
//                     setFormData(prevState => ({
//                       ...prevState,
//                       contact: {
//                         ...prevState.contact,
//                         [e.target.name]: e.target.value,
//                       },
//                     }));
//                   }} />
//             </div>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input type="email" name="email" 

//               value={formData.contact?.email}
//               onChange={(e) => {
//                     setFormData(prevState => ({
//                       ...prevState,
//                       contact: {
//                         ...prevState.contact,
//                         [e.target.name]: e.target.value,
//                       },
//                     }));
//                   }} />
//             </div>
//           </div>
//         </div>
//         <div className="form-div-parts">
//           <button type="submit" className="btn btn-primary">
//             {isLoading? "Loading":"Update"}
//             {/* Add */}
//           </button>
//         </div>
//       </form>
//     </>
//   );
// }

// export default EditPwh;

import React from 'react'

const EducationalDetails = (props) => {
    const {addPwh,onChange} = props



  return (
    <>
    <div className="p-2">

    <p>Educational</p>
                <div className="flex gap-x-4 [&>div>input]:border bg-white  p-2
    [&>div>input]:flex [&>div>input]:flex-col [&>div>input]:gap-1
    [&>div>input]:p-1 [&>div>label]:text-base [&>div>input]:rounded-sm [&>div>input]:outline-none [&>div>input:focus]:border-indigo-500">
                  <div className="flex flex-col gap-y-1">
                    {/* <p>Studying?</p> */}
                      <label htmlFor="is_studying">Studying</label>
                    <div className="flex [&>select]:border">
                      <select name="is_studying" id="" value={addPwh?.pwh_occupation?.is_studying}  onChange={onChange("pwh_occupation")} className="py-1" requireed>
                        <option value="null">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-col">
                    <label htmlFor="highest_class">Highest Class</label>
                    <input
                      type="text"
                      name="highest_class"
                      id=""
                      value={addPwh?.pwh_occupation?.highest_class}
                      onChange={onChange("pwh_occupation")}
                    />
                  </div>
                </div>
                <p>Occupational</p>
                <div className="flex flex-col md:flex-row gap-2 [&>div>input]:border bg-white  p-2
    [&>div>input]:flex [&>div>input]:flex-col [&>div>input]:gap-1
    [&>div>input]:p-1 [&>div>label]:text-base [&>div>input]:rounded-sm [&>div>input]:outline-none [&>div>input:focus]:border-indigo-500">
                  <div className="flex gap-1 flex-col">
                  <label htmlFor="is_employed">Employed</label>
                    <div className=" flex [&>select]:border">
                      <select name="is_employed" id="" className="py-1" value={addPwh?.pwh_occupation?.is_employed}  
                          onChange={onChange("pwh_occupation")}>
                        <option value="null">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-col">
                    <label htmlFor="employement_type">Employement Type</label>
                    <input
                      type="text"
                      name="employement_type"
                      value={addPwh?.pwh_occupation?.employement_type}
                      onChange={onChange("pwh_occupation")}
                    />
                  </div>
                  <div className="flex gap-1 flex-col [&>select]:border">
                     <label htmlFor="is_reimbursed">Reimbursment</label>
                    <div className=" flex [&>select]:border ">
                      <select name="is_reimbursed" id="" value={addPwh?.pwh_occupation?.is_reimbursed} className="py-1" onChange={onChange("pwh_occupation")}>
                        <option value="null">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-col">
                    <label htmlFor="emp_or_name">Employement Org Name</label>
                    <input
                      type="text"
                      name="emp_or_name"
                      id=""
                      value={addPwh?.pwh_occupation?.emp_or_name}
                      onChange={onChange("pwh_occupation")}
                    />
                  </div>
                  <div className="flex gap-1 flex-col">
                    <label htmlFor="reimbursment_type">Reimbursment Type</label>
                    <input
                      type="text"
                      name="reimbursment_type"
                      id=""
                      value={addPwh?.pwh_occupation?.reimbursment_type}
                      onChange={onChange("pwh_occupation")}
                    />
                  </div>
                </div>
                </div>
                </>
  )
}

export default EducationalDetails
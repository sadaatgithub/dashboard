import React from 'react'

const EducationalDetails = (props) => {
    const {addPwh,onChange} = props



  return (
    <>
    <div className="form-div">

    <p>Educational</p>
                <div className="educational">
                  <div className="form-group">
                    {/* <p>Studying?</p> */}
                      <label htmlFor="is_studying">Studying</label>
                    <div className="form-control flex">
                      <select name="is_studying" id="" value={addPwh?.pwh_occupation?.is_studying}  onChange={onChange("pwh_occupation")} requireed>
                        <option value="null">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
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
                <div className="occupational">
                  <div className="form-group">
                  <label htmlFor="is_studying">Employed</label>
                    <div className="form-control flex">
                      <select name="is_studying" id="" value={addPwh?.pwh_occupation?.is_employed}  
                          onChange={onChange("pwh_occupation")}>
                        <option value="null">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="employement_type">Employement Type</label>
                    <input
                      type="text"
                      name="employement_type"
                      value={addPwh?.pwh_occupation?.employement_type}
                      onChange={onChange("pwh_occupation")}
                    />
                  </div>
                  <div className="form-group">
                     <label htmlFor="is_studying">Reimbursment</label>
                    <div className="form-control flex">
                      <select name="is_studying" id="" value={addPwh?.pwh_occupation?.is_reimbursed}  onChange={onChange("pwh_occupation")}>
                        <option value="null">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="emp_or_name">Employement Org Name</label>
                    <input
                      type="text"
                      name="emp_or_name"
                      id=""
                      value={addPwh?.pwh_occupation?.emp_or_name}
                      onChange={onChange("pwh_occupation")}
                    />
                  </div>
                  <div className="form-group">
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
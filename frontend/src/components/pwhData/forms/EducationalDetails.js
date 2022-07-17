import React from 'react'

const EducationalDetails = (props) => {
    const {addPwh,onChange} = props

    const studyingCheckedTrue = addPwh.pwh_occupation.is_studying === 'true'? 'true':''
    const studyingCheckedFalse = addPwh.pwh_occupation.is_studying === 'false'? 'true':''

  return (
    <>
    <div className="form-div">

    <p>Educational</p>
                <div className="educational">
                  <div className="form-group">
                    <p>Studying?</p>
                    <div className="form-control flex">
                     
                      <label htmlFor="is_studying">
                        No
                        <input
                          type="radio"
                          name="is_studying"
                          value="false"
                          checked={studyingCheckedFalse}
                          onChange={onChange("pwh_occupation")}
                        />
                      </label>
                      <label htmlFor="is_studying">
                        Yes
                        <input
                          type="radio"
                          name="is_studying"
                          value="true"
                          checked={studyingCheckedTrue}
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
                      value={addPwh?.pwh_occupation?.highest_class}
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
                      value={addPwh?.pwh_occupation?.employement_type}
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
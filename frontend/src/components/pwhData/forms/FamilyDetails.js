import React from 'react'

const FamilyDetails = (props) => {
    const {addPwh,onChange} = props

  return (
    <>
    <div className="form-div">

      <p>Family History</p>
                <div className="family-history">
                  <div className="form-group">
                    <label htmlFor="no_of_affected">No of affected</label>
                    <input
                      type="text"
                      name="no_of_affected"
                      value={addPwh?.pwh_family?.no_of_affected}
                      onChange={onChange("pwh_family")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="affected_nhr_id">Affected NHR Id</label>
                    <input
                      type="text"
                      name="affected_nhr_id"
                      value={addPwh?.pwh_family?.affected_nhr_id}
                      onChange={onChange("pwh_family")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="family_income">Family Income</label>
                    <input
                      type="text"
                      name="family_income"
                      value={addPwh?.pwh_family?.family_income}
                      onChange={onChange("pwh_family")}
                    />
                  </div>
                  <div className="form-group">
                    <p>BPL</p>
                    <div className="form-control flex">
                      <select
                        name="is_bpl"
                        id=""
                        value={addPwh?.pwh_family?.is_bpl}
                        onChange={onChange("pwh_family")}
                      >
                        <option value="null">Select</option>
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
                      value={addPwh?.pwh_family?.bpl_ref_no}
                      onChange={onChange("pwh_family")}
                    />
                  </div>
                </div>
                </div>
    </>
  )
}

export default FamilyDetails
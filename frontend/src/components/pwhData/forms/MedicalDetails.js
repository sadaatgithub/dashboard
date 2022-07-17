import React from 'react'

const MedicalDetails = (props) => {
    const {addPwh,onChange} = props

  return (
    <>
    <div className="form-div">

        <p>Medical History</p>
                <div className="medical-history">
                  <div className="form-group">
                    <label htmlFor="age_of_diagnosis">Age Of Diagnosis</label>
                    <input
                      type="text"
                      name="age_of_diagnosis"
                      value={addPwh?.pwh_medical?.age_of_diagnosis}
                      onChange={onChange("pwh_medical")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="hospital_diagnosis">
                      Hospital Diagnosed
                    </label>
                    <input
                      type="text"
                      name="hospital_diagnosis"
                      value={addPwh?.pwh_medical?.hospital_diagnosis}
                      onChange={onChange("pwh_medical")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="blood_group_with_rh">Blood Group</label>
                    <select
                      name="blood_group_with_rh"
                      id=""
                      value={addPwh?.pwh_medical?.blood_group_with_rh}
                      onChange={onChange("pwh_medical")}
                    >
                      <option value="null">Select</option>
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
                    <select
                      name="factor_def"
                      id=""
                      value={addPwh?.pwh_medical?.factor_def}
                      onChange={onChange("pwh_medical")}
                    >
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
                    <input
                      type="text"
                      name="factor_level"
                      value={addPwh?.pwh_medical?.factor_level}
                      onChange={onChange("pwh_medical")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="others_def">Other Defeciency</label>
                    <select
                      name="others_def"
                      id=""
                      value={addPwh?.pwh_medical?.others_def}
                      onChange={onChange("pwh_medical")}
                    >
                      <option value="">Select</option>
                      <option value="VwD">Vwd</option>
                      <option value="glanzmann">Glanzmann</option>
                      <option value="fibronogenemia">Fibrinogenemia</option>
                      <option value="hypofibrogenemia">Hypofibrogenemia</option>
                      <option value="fpd">
                        Functional Platelete Dissorder
                      </option>
                      <option value="disfibronogenemia">
                        Disfibronogenemia
                      </option>
                    </select>
                  </div>
                </div>
                <div className="deformity">
                  <div className="form-group">
                  <label for="is_studying">Inhibitor Status</label>
                    <div className="form-control flex">
                      <select name="is_inhibitor_pos" id="" value={addPwh?.pwh_medical?.is_inhibitor_pos}  onChange={onChange("pwh_medical")}>
                        <option value="null">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                  <label for="is_studying">HCV ?</label>
                    <div className="form-control flex">
                      <select name="is_hcv_pos" id="" value={addPwh?.pwh_medical?.is_hcv_pos}  onChange={onChange("pwh_medical")}>
                        <option value="null">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                  <label for="is_studying">HIV ?</label>
                    <div className="form-control flex">
                      <select name="is_hiv_pos" id="" value={addPwh?.pwh_medical?.is_hiv_pos}  onChange={onChange("pwh_medical")}>
                        <option value="null">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                  <label for="is_studying">Deformity</label>
                    <div className="form-control flex">
                      <select name="is_deformity" id="" value={addPwh?.pwh_medical?.is_deformity}  onChange={onChange("pwh_medical")}>
                        <option value="null">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                </div>
    </>
  )
}

export default MedicalDetails
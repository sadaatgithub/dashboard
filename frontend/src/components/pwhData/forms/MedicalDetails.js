import React from "react";
import FormDiv from "./FormDiv";
import FormGroup from "./FormGroup";

const MedicalDetails = (props) => {
  const { addPwh, onChange } = props;
  const factorArray = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
  ];
  const factorArrayList = factorArray.map((data) => {
    return (
      <option key={data} value={data}>
        F{data}
      </option>
    );
  });

  return (
    <>
      <FormDiv
        children={
          <>
            <p>Medical History</p>
            <FormGroup
              children={
                <>
                  <div>
                    <label htmlFor="age_of_diagnosis">Age Of Diagnosis</label>
                    <input
                      type="text"
                      name="age_of_diagnosis"
                      value={addPwh?.pwh_medical?.age_of_diagnosis || ""}
                      onChange={onChange("pwh_medical")}
                    />
                  </div>
                  <div>
                    <label htmlFor="hospital_diagnosis">
                      Hospital Diagnosed
                    </label>
                    <input
                      type="text"
                      name="hospital_diagnosis"
                      value={addPwh?.pwh_medical?.hospital_diagnosis || ""}
                      onChange={onChange("pwh_medical")}
                    />
                  </div>
                  <div>
                    <label htmlFor="blood_group_with_rh">Blood Group</label>
                    <select
                      name="blood_group_with_rh"
                      id=""
                      className="border py-1"
                      value={addPwh?.pwh_medical?.blood_group_with_rh || ""}
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
                  <div>
                    <label htmlFor="factor_def">Factor</label>
                    <select
                      name="factor_def"
                      id=""
                      className="border py-1"
                      value={addPwh?.pwh_medical?.factor_def || ""}
                      onChange={onChange("pwh_medical")}
                      required
                    >
                      <option value="null">Select</option>

                      {factorArrayList}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="factor_level">Factor Level</label>
                    <input
                      type="text"
                      name="factor_level"
                      value={addPwh?.pwh_medical?.factor_level || ""}
                      onChange={onChange("pwh_medical")}
                    />
                  </div>
                  <div>
                    <label htmlFor="others_def">Other Defeciency</label>
                    <select
                      name="others_def"
                      id=""
                      className="border py-1"
                      value={addPwh?.pwh_medical?.others_def || ""}
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
                </>
              }
            />

            <FormGroup
              children={
                <>
                  <div>
                    <label htmlFor="is_studying">Inhibitor Status</label>
                    <div className="flex">
                      <select
                        name="is_inhibitor_pos"
                        id=""
                        className="border py-1"
                        value={addPwh?.pwh_medical?.is_inhibitor_pos || ""}
                        onChange={onChange("pwh_medical")}
                      >
                        <option value="null">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="is_studying">HCV ?</label>
                    <div className="form-control flex">
                      <select
                        name="is_hcv_pos"
                        className="border py-1"
                        id=""
                        value={addPwh?.pwh_medical?.is_hcv_pos || ""}
                        onChange={onChange("pwh_medical")}
                      >
                        <option value="null">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="is_studying">HIV ?</label>
                    <div className="form-control flex">
                      <select
                        name="is_hiv_pos"
                        className="border py-1"
                        id=""
                        value={addPwh?.pwh_medical?.is_hiv_pos || ""}
                        onChange={onChange("pwh_medical")}
                      >
                        <option value="null">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="is_studying">Deformity</label>
                    <div className="form-control flex">
                      <select
                        name="is_deformity"
                        className="border py-1"
                        id=""
                        value={addPwh?.pwh_medical?.is_deformity || ""}
                        onChange={onChange("pwh_medical")}
                      >
                        <option value="null">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                </>
              }
            />
          </>
        }
      />
    </>
  );
};

export default MedicalDetails;

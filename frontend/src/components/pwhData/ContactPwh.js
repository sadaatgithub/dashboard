import React from 'react'

const ContactPwh = ({data, onChange}) => {
  return (<>
    <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                   <input
                      type="text"
                      value={''}
                      name="mobile"
                      // onChange={(e) => {
                      //   setFormData(prevState => ({
                      //     ...prevState,
                      //     contact: {
                      //       ...prevState.contact,
                      //       [e.target.name]: [e.target.value],
                      //     },
                      //   }));
                      // }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="alternate_mobile">Alternate Mobile</label>
                    <input
                      type="text"
                      value={''}
                      name="alternate_mobile"
                      onChange={onChange('contact')}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      value={''}
                      name="email"
                      onChange={onChange}
                    />
                  </div>
                  </>
  )
}

export default ContactPwh
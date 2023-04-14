import React, { Fragment, useState } from 'react'

import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  async function forgetPassword(val) {
    let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords", val)
    setLoading(false);
    if(data.statusMsg === 'success') {
      setFlag(true);
    }
  }
  async function resetPassword(val) {
    let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode", val).catch((err) => {
      setLoading(false);
      setErrMsg(err.response.data.message);
    })
    if (data.status === 'Success') {
      navigate("../resetpassword")
    }
    setLoading(false);
  }
  const [isLoading, setLoading] = useState(false);
    let formik = useFormik({
      initialValues: {
        email: '',
      },
      onSubmit: (values) => {
        setLoading(true);
        forgetPassword(values);
      },
    })
    let formikReset = useFormik({
      initialValues: {
        resetCode: '',
      },
      onSubmit: (values) => {
        setLoading(true);
        resetPassword(values);
      },
    })
    return (
      <Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Forgot Password</title>
        </Helmet>
        <div className='w-75 mx-auto py-5 text-white'>
        {flag ?  <form onSubmit={formikReset.handleSubmit}>
          <label htmlFor="resetCode">Reset Code: </label>
          <input onBlur={formikReset.handleBlur} onChange={formikReset.handleChange} type='text' value={formikReset.values.resetCode} className='form-control my-2' name='resetCode' id='resetCode'></input>
          {formikReset.errors.resetCode && formikReset.touched.resetCode ? <div className='alert alert-danger'>{formikReset.errors.resetCode}</div> : null}
          {errMsg !== '' ? <div className="alert alert-danger">{errMsg}</div>:""}
          <div className="d-flex align-items-center justify-content-start py-3">
            {isLoading ? <button className='btn btn-primary p-2'><i className='fas fa-spinner fa-spin'></i></button> : <button type='submit' className='btn btn-primary'>Verify Code</button>}
          </div>
        </form> :  <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' value={formik.values.email} className='form-control my-2' name='email' id='email'></input>
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}
          <div className="d-flex align-items-center justify-content-start py-3">
            {isLoading ? <button className='btn btn-primary p-2'><i className='fas fa-spinner fa-spin'></i></button> : <button type='submit' className='btn btn-primary'>Send Code</button>}
          </div>
        </form>}
      </div>
    </Fragment>
    )
  }
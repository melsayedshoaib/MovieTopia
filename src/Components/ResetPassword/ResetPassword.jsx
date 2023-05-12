import * as Yup from 'yup';

import React, { Fragment, useState } from 'react'

import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
   const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  async function sendDate(values) {
    setLoading(true);
    let {data} = await axios.put("https://route-ecommerce-app.vercel.app/api/v1/auth/resetPassword", values).catch((err) => {
      setLoading(false)
      setErrMsg(err.response.data.message);
    });
    if (data.token) {
      setLoading(false);
      navigate("/login");
    }
  }
    let formik = useFormik({
      initialValues: {
        email: '',
        newPassword: '',
      },
      validationSchema: Yup.object({
        email: Yup.string().required("Email is required").email("Enter a valid email address"),
        newPassword: Yup.string().required('Password is required'),
      }),
      onSubmit: (values) => sendDate(values)
    })
    return (
      <Fragment>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>Reset Password</title>
        </Helmet>
        <div className='w-75 mx-auto py-5 text-white'>
        {errMsg.length > 0 ? <div className='alert alert-danger'>{ errMsg}</div> : ""}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' value={formik.values.email} className='form-control my-2' name='email' id='email'></input>
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}
          <label htmlFor="password">New Password: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' value={formik.values.newPassword} className='form-control my-2' name='newPassword' id='newPassword'></input>
          {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger'>{formik.errors.newPassword}</div> : null}
          <div className="d-flex align-items-center justify-content-start py-3">
            {isLoading ? <button className='btn btn-primary p-2'><i className='fas fa-spinner fa-spin'></i></button> : <button type='submit' className='btn btn-primary'>Reset Password</button>}
          </div>
        </form>
      </div>
      </Fragment>
    )
  }

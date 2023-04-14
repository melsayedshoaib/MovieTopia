import * as Yup from 'yup';

import { Link, useNavigate } from 'react-router-dom'
import React, { Fragment, useState } from 'react'

import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useFormik } from 'formik'

export default function Login({saveUserData}) {
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  async function sendDate(values) {
    setLoading(true);
    let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values).catch((err) => {
      setLoading(false)
      setErrMsg(err.response.data.message);
    });
    if (data.message === 'success') {
      localStorage.setItem("user-token", data.token);
      saveUserData();
      setLoading(false);
      navigate("/home");
    }
  }
  const navigate = useNavigate();
    let formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: Yup.object({
        email: Yup.string().required("Email is required").email("Enter a valid email address"),
        password: Yup.string().required('Password is required'),
      }),
      onSubmit: (values) => sendDate(values)
    })
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
        <div className='w-75 mx-auto py-5 text-white'>
        <h2>Login</h2>
        {errMsg.length > 0 ? <div className='alert alert-danger'>{ errMsg}</div> : ""}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' value={formik.values.email} className='form-control my-2' name='email' id='email'></input>
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}
          <label htmlFor="password">Password: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' value={formik.values.password} className='form-control my-2' name='password' id='password'></input>
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}
          <div className="d-flex align-items-center justify-content-start py-3">
            {isLoading ? <button className='btn btn-primary p-2'><i className='fas fa-spinner fa-spin'></i></button> : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn btn-primary'>Login</button>}
            <Link to={'../forgetpassword'} className='text-decoration-none text-info ms-2 fs-6'>Forget Password?</Link>
          </div>
        </form>
        <div className='text-center'>
          <p>Don't have an account? <button onClick={() => navigate("/register")} className='text-info bg-transparent border-0'>Register</button></p>
        </div>
      </div>
      </Fragment>
    )
  }
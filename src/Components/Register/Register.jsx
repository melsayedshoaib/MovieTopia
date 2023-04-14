import * as Yup from 'yup';

import React, { Fragment, useState } from 'react'

import {Helmet} from "react-helmet";
import axios from 'axios';
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  async function sendDate(values) {
    setLoading(true);
    let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values).catch((err) => {
      setLoading(false)
      setErrMsg(err.response.data.message);
    });
    if (data.message === 'success') {
      setLoading(false);
      navigate("/login");
    }
  }
  const navigate = useNavigate();
    let formik = useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '',
      },
      validationSchema: Yup.object({
        name: Yup.string().required('Name is required').min(3, 'Minimum length must be at least 3 characters'),
        email: Yup.string().required("Email is required").email("Enter a valid email address").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email address"),
        password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{6,}$/i, "Invalid password - Must include letters"),
        rePassword: Yup.string().required('Repassword is required').oneOf([Yup.ref("password")], "Repassword doesn't match password"),
        phone: Yup.string().required('Phone is required').matches(/^01[1052][0-9]{8}$/i, "Invalid phone number"),
      }),
      onSubmit: (values) => sendDate(values)
    })
    return (
      <Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Register</title>
        </Helmet>
        <div className='w-75 mx-auto py-5 text-white'>
        <h2>Register Now!</h2>
        {errMsg.length > 0 ? <div className='alert alert-danger'>{ errMsg}</div> : ""}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='text' value={formik.values.name} className='form-control my-2' name='name' id='name'></input>
          {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : null}
          <label htmlFor="email">Email: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' value={formik.values.email} className='form-control my-2' name='email' id='email'></input>
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}
          <label htmlFor="password">Password: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' value={formik.values.password} className='form-control my-2' name='password' id='password'></input>
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}
          <label htmlFor="rePassword">Re-enter Password: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' value={formik.values.rePassword} className='form-control my-2' name='rePassword' id='rePassword'></input>
          {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : null}
          <label htmlFor="phone">Phone Number: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='tel' value={formik.values.phone} className='form-control my-2' name='phone' id='phone'></input>
          {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : null}
          {isLoading ? <button className='btn btn-primary my-2'><i className='fas fa-spinner fa-spin'></i></button> : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn btn-primary my-2'>Register</button>}
        </form>
        <div className='text-center'>
          <p>Already have an account? <button onClick={() => navigate("/login")} className='text-info bg-transparent border-0'>Login</button></p>
        </div>
      </div>
      </Fragment>
    )
  }
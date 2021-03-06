import React from 'react';
import {useFormik} from 'formik'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './LoginForm.css'

export default function LoginForm({handleLogin, handleDisplay}) {
    let navigate = useNavigate();
    const initialValues = {
    username: "",
    password: ""
    }
    const onSubmit = (values) => {
        axios.post('http://localhost:4000/login', values)
        .then((res) => {
          localStorage.setItem('username', res.data.username)
          localStorage.setItem('id', res.data.id)
          localStorage.setItem('name', res.data.name)
          handleLogin()
          navigate('/lists')
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    }
    const validate = (values) => {
        const errors = {}
        if(!values.username) {
          errors.username = "Username Required"
        }
        if(!values.password) {
          errors.password = "Password Required"
        } else if(values.password.length < 8) {
          errors.password = "Password must be longer than 8 Characters."
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    return (
    
    <div className='form-modal'>
      <form className='form-container' onSubmit={formik.handleSubmit}>
        <button type='button' onClick={() => handleDisplay("")} className='close-modal-btn'>X</button>
        <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder='Username'
         />
        <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder='Password'
         />
        <button type='submit' disabled={!formik.isValid}>Submit</button>
      </form>
    </div>);
}

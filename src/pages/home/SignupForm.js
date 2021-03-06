import React from 'react';
import {Formik, useFormik} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router';


export default function SignupForm( {handleLogin, handleDisplay}) {
    let navigate = useNavigate();

    const initialValues = {
        username: '',
        name: '',
        password: '',
        confirmPassword: ''
    }
    const onSubmit = (values) => {
        axios.post('http://localhost:4000/register', values)
        .then((res) => {
            console.log(res.data);
            localStorage.setItem('username', res.data[0][0].username)
            localStorage.setItem('id', res.data[0][0].id)
            localStorage.setItem('name', res.data[0][0].name)
            handleLogin()
            navigate('/lists')

        })
        .catch((err)=> console.log(err.response.data))
    }
    const validate = (values) => {
        const errors = {}
        if(!values.username){
            errors.username = "Username Required"
        }
        if(!values.password){
            errors.password = "Password Required"
        } else if(values.password.length < 8){
            errors.password = "Password must be longer than 8 characters"
        }
        if(!values.name){
            errors.name = "Name Required"
        }
        if(!values.confirmPassword){
            errors.confirmPassword = "Please confirm password"
        }else if(values.password !== values.confirmPassword){
            errors.confirmPassword = "Passwords must match"
        }
        return errors
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })
    
    return (
        <div className="form-modal">
            <form className='form-container' onSubmit={formik.handleSubmit}>
            <button type='button' onClick={() => handleDisplay("")} className='close-modal-btn'>x</button>
                <input 
                type="text"
                name='name'
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder='Name'
                />
                <input 
                type="text"
                name='username'
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder='Username'
                />
                <input 
                type="password"
                name='password'
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder='Password'
                />
                <input 
                type="password"
                name='confirmPassword'
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                placeholder='Confirm Password'
                />
                <button type='submit' disabled={!formik.isValid}>Submit</button>
            </form>
        </div>
    )
}

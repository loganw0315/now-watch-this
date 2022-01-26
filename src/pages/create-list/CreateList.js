import React from 'react';
import {useFormik} from 'formik'
import './CreateList.css'
import axios from 'axios';
import { useNavigate } from 'react-router';

function CreateList() {
    const userId = localStorage.getItem('id')
    let navigate = useNavigate();
    const initialValues = {
        title: "",
        description: "",
        privacy: "",
        userId: userId
    }

    
    const onSubmit = (values) => {
        axios.post('http://localhost:4000/lists', values)
        .then((res) => {
            console.log(res.data);
            navigate('/lists')
        })
        
    }
    const validate = (values) => {

    }
    
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

  return (
  <div className='create-list'>
    <div className='create-list-form'>
      <h1>New List</h1>
      <form onSubmit={formik.handleSubmit}>
        <input 
        type="text" 
        name="title"
        onChange={formik.handleChange}
        value={formik.values.title}
        placeholder='Title'
        />
        <input 
        type="text" 
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
        placeholder='Description'
        />
        <select 
        name="privacy"
        onChange={formik.handleChange}
        value={formik.values.privacy}
        >
            <option value="" label='Select privacy'/>
            <option value="public" label='Public'/>
            <option value="private" label='Private'/>
            <option value="unlisted" label='Unlisted'/>
        </select>
        <button type='submit' disabled={!formik.isValid}>Submit</button>
      </form>
    </div>
  </div>
  )
}

export default CreateList;

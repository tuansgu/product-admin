import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
const Register = () => {

  const[fname, setFname] = useState('');
  const[fdescription, setFdescription] = useState('');
  const[file, setFile] = useState('');

  const history = useNavigate()

  const addProduct = async(e) => {
    e.preventDefault()

    var formData = new FormData();
    formData.append("photo", file)
    formData.append("fname", fname)
    formData.append("fdescription", fdescription)
    const config = {
      headers: {
        "Content-Type":"multipart/form-data"
      }
    }

    const res = await axios.post("/register", formData, config);
    if(res.data.status == 201)
    {
      history("/")
    }
    else
    {
      console.log("error")
    }

  } 

  return (
    <div className='container mt-3'>
      <h1 className='text-center mt-3'>
        Create Product
      </h1>
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product's Name</Form.Label>
            <Form.Control type="text" name='fname' onChange={(e) => {setFname(e.target.value)}} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name='fdescription' onChange={(e) => {setFdescription(e.target.value)}}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Product's Image</Form.Label>
            <Form.Control type="file" name='photo'/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={addProduct}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Register
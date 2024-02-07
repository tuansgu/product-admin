import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'

const Update = () => {
  return (
    <div className='container mt-3'>
        <h1 className='text-center mt-3'>
            Update Product
        </h1>
        <div>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product's Name</Form.Label>
            <Form.Control type="text" name='fname'  />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name='fdescription' />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Product's Image</Form.Label>
            <Form.Control type="file" name='photo' />
          </Form.Group>
          <img src='' alt='image product' className='d-flex '/>

          <Button variant="primary" type="submit" >
            Submit
          </Button>
            </Form>
        </div>
    </div>
  )
}

export default Update

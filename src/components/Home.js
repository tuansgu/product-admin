import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button"
import { NavLink } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'

const Home = () => {

  const [data, setData] = useState([])
  const [show, setShow] = useState(false);

  const getProductData = async () => {
    const res = await axios.get("/getdata", {
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.data.status == 201) {
      console.log("data get")
      setData(res.data.data)
    }
    else {
      console.log("error")
    }
  }

  const delProduct = async(id) => {
    const res = await axios.delete(`/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if(res.data.status == 201) 
    {
      getProductData()
      setShow(true)
    }
    else 
    {
      console.log("error");
    }
  }


  useEffect(() => {
    getProductData()
  }, [])


  return (
    <>
    {
      show ? <Alert variant='danger' onClose={() => setShow(false)} dismissible>
        Product Delete
        </Alert> : ""
      } 
      <div className='container mt-2'>
        <h1 className='text-center mt-2'>Product</h1>

        <div className='text-end'>
          <Button variant="primary">
            <NavLink to="/register" className="text-decoration-none text-light">
              Add Product
            </NavLink>
          </Button>
        </div>

        <div className='d-flex justify-content-between align-items-center mt-5 flex-lg-wrap'>
          {
            data.length > 0 ? data.map((el, i) => {
              return (
                <>
                  <Card style={{ width: '22rem', height: '18rem' }} className='mb-3'>
                    <Card.Img variant="top" src={`/uploads/${el.image}`} style={{ width: '100px', textAlign: 'center', margin: 'auto' }} className='mt-2' />
                    <Card.Body className='text-center'>
                      <Card.Title>{el.name}</Card.Title>
                      <Card.Text>
                        {el.description}
                      </Card.Text>
                      <Button variant="danger" onClick={() => delProduct(el.id)} style={{ marginRight: "5px" }} className='row-lg-2 text-center mb-5'>Delete</Button>
                      <Button variant='primary' className='row-lg-2 text-center mb-5'>
                        <NavLink to="/update" className="text-decoration-none text-light">
                          Update
                        </NavLink>
                      </Button>
                    </Card.Body>
                  </Card>
                </>
              )
            }):""
          }

        </div>
      </div>
    </>
  )
}

export default Home
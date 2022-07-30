import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link,useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { config } from 'dotenv'

const ProductCreateScreen = ({ match, history }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [productKey, setProductKey] = useState('')
    const [uploading, setUploading] = useState(false)

    let historyHook = useHistory();

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
    
        try {
          const config = {
            header: {
              'Content-Type': 'multipart/form-data',
            },
          }
    
          const { data } = await axios.post('/api/upload', formData, config)
    
          setImage(data)
          setUploading(false)
        } catch (error) {
          console.log(error)
          setUploading(false)
        }
      }

  const submitHandler = async (e) => {
    e.preventDefault();
    let dest_url = `/api/products/new`;
    // console.log(name);
      let body = {

      
        'name': name,
        'price': price,
        'image': image,
        'brand': brand,
        'countInStock': countInStock,
        'category': category,
        'description': description,
        'productKey': productKey
      }
      let user = await JSON.parse(localStorage.getItem("userInfo"));
      
      
      let CONFIG = {
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${user.token}`
        }
      }
      try{
      const data = await axios.post(dest_url, body, CONFIG)
      historyHook.replace("/admin/productlist");
      // console.log(data);
      }catch(err){
        console.log(err);
      }
      
    };
  

  return (
    <>
      {/* <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link> */}
      <FormContainer>
        <h1>Create Product</h1>
        
        
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price Address</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
                </Form.Group>
                
            <Form.Group controlId='productKey'>
              <Form.Label>Product Key</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product key'
                value={productKey}
                onChange={(e) => setProductKey(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              <span className='link'>Create</span>
            </Button>
          </Form>
      </FormContainer>
    </>
  )
}

export default ProductCreateScreen

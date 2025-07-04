import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Signup/signup.css'

function AddProduct() {
  const [name, setName]= useState('');
  const [price, setPrice]= useState('');
  const [category, setCategory]= useState('');
  const [company, setCompany]= useState('');
  const [error, setError]= useState('');
  const navigate= useNavigate();

  const handleSubmit= async()=>{
    // console.log(name);
    let userId= localStorage.getItem('user');
    if(userId==='' || userId===null){
      navigate('/signup');
    }
    userId=JSON.parse(userId)._id;
    // console.log(userId);

    if(name==='' || price==='' || category==='' || company===''){
      setError('Input is empty');
    }else{
      let result=await fetch('http://localhost:5000/product/add-product', {
        method: 'post',
        body:JSON.stringify({name, price, category, company, userId}),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      result= await result.json();
      // console.log(result);
      if(result.error){
        setError(result.error);
      }else{
        alert('Product added successfully');
        navigate('/');
      }
    }
  }

  return (
    <div className='signup'>
        <h1>Add products</h1>
        <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder='product name' className='signup-input'/>
        <input onChange={(e)=> setPrice(e.target.value)} value={price} type="text" name="" id="" placeholder='product price' className='signup-input' />
        <input onChange={(e)=> setCategory(e.target.value)} value={category} type="text" name="" id="" placeholder='product category' className='signup-input' />
        <input onChange={(e)=> setCompany(e.target.value)} value={company} type="text" name="" id="" placeholder='product company' className='signup-input'/>
        <button className='signup-btn' onClick={handleSubmit}>Add Product</button>
        <p className='text-danger'>{error}</p>
    </div>
  )
}

export default AddProduct
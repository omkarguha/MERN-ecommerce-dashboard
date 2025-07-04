import React, { useEffect, useState } from 'react'
import '../Signup/signup.css'

function UpdateProduct() {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError]= useState('');

  useEffect(() => {
    const queryParams = window.location.pathname.split('/');
    const productId = queryParams[queryParams.length - 1];
    // console.log(productId);

    const getDataToInput = async () => {
      try {
        const response = await fetch(`http://localhost:5000/product/id/${productId}`);
        const result = await response.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
      } catch (error) {
        setError('Failed to fetch product data');
      }
    };

    getDataToInput();
    // console.log(data);
  }, [])

  const handleUpdate= async()=>{
    if (!name || !price || !category || !company) {
      setError('All fields are required');
      return;
    }

    const queryParams = window.location.pathname.split('/');
    const productId = queryParams[queryParams.length - 1];

    const product = { name, price, category, company };
    try {
      const response = await fetch(`http://localhost:5000/product/id/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert('Product updated successfully');
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update product');
      }
    } catch (error) {
      setError('An error occurred while updating the product');
    }
  }


  return (
    <div className='signup'>
      <h1>Update Product</h1>
      <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='product name' className='signup-input' />
      <input onChange={(e) => setPrice(e.target.value)} value={price} type="text" name="" id="" placeholder='product price' className='signup-input' />
      <input onChange={(e) => setCategory(e.target.value)} value={category} type="text" name="" id="" placeholder='product category' className='signup-input' />
      <input onChange={(e) => setCompany(e.target.value)} value={company} type="text" name="" id="" placeholder='product company' className='signup-input' />
      <button className='signup-btn' onClick={handleUpdate}>Add Product</button>
      <p className='text-danger'>{error}</p>
    </div>
  )
}

export default UpdateProduct
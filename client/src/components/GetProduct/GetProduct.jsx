import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './products.css';
import { useNavigate } from 'react-router-dom';

function GetProduct() {

    const [products, setProducts]= useState([]);
    const navigate= useNavigate();

    useEffect(()=>{
        getAllProducts();
    }, [])

    const getAllProducts= async()=>{
        let result= await fetch('http://localhost:5000/product',{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('auth')}`
            }
        });
        result= await result.json();
        // console.log(localStorage.getItem('auth'));
        setProducts(result);
    }

    const handleDelete= async(id)=>{
        let result= await fetch(`http://localhost:5000/product/id/${id}`, {
            method: 'DELETE',
            headers:{
                Authorization: `Bearer ${localStorage.getItem('auth')}`
            }
        });
        // result= await result.json();
        // console.log(result);
        getAllProducts();
    }

    const handleUpdate=(id)=>{
        navigate(`/update/${id}`);
    }

    const handleSearch= async(e)=>{
        let key= e.target.value;
        if(key){
            let result= await fetch(`http://localhost:5000/product/search/${key}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('auth')}`
                }
            });
            result= await result.json();
            if(result){
                setProducts(result);
            }
        }else{
            getAllProducts();
        }

    }


  return (
    <div className='product-list'>
        <h1>Products List</h1>
        <div>
            <input type="text" className='search' onChange={handleSearch} />
        </div>

        <ul>
            <li>S. No</li>
            <li>Name</li>
            <li>Price</li>
            <li>Company</li>
            <li>Category</li>
            <li>Operations</li>
        </ul>
        {
            products.length>0 ? products.map((item, index)=>{
                return(
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.company}</li>
                        <li>{item.category}</li>
                        <li>
                            <button className='btn btn-dark btn-sm' onClick={()=>handleDelete(item._id)}>Delete</button>.
                            <button className='btn btn-sm btn-outline-dark' onClick={()=>handleUpdate(item._id)}>Update</button>
                        </li>
                    </ul>
                ) 
            }) : <h1>No Result Found</h1>
        }
    </div>
  )
}

export default GetProduct
import React, { useState} from 'react'
import './signup.css'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';

function Signup() {
  const [fullName, setName]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [error, setError]= useState('');
  const navigate= useNavigate();

  useEffect(()=>{
    const auth= localStorage.getItem('user');
    if(auth) navigate('/');
  })

  

  const handleSignup=async()=>{
    if(email=='' || password==='' || fullName===''){
      setError('Input is empty')
    }else{

      let result= await fetch('http://localhost:5000/user/signup',{
        method: 'post',
        body: JSON.stringify({fullName, email, password}),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      result= await result.json();
      let auth=result.auth;
      result=result.userPayload;
      if(result.error){
        setError(result.error);
        setEmail('');
        setPassword('');
        setName('');
      }else{
        const userPayload={
        fullName: result.fullName,
        email: result.email,
        _id: result._id
        }
        localStorage.setItem('user', JSON.stringify(userPayload));
        localStorage.setItem('auth', auth);
        navigate('/');
      }

    }
  }


  return (

    <div className='signup'>
      <h1>Signup</h1>
      <input onChange={(e)=> setName(e.target.value)} value={fullName} name='fullName' className='signup-input' type="text" id="" placeholder='Name'/>
      <input onChange={(e)=> setEmail(e.target.value)} value={email} name='email' className='signup-input' type="email" id="" placeholder='Email'/>
      <input onChange={(e)=> setPassword(e.target.value)} value={password} className='signup-input' type="password" id="" placeholder='Password'/>
      <button onClick={handleSignup} type='submit' className='signup-btn'>Sign Up</button>
      <p className='text-danger'>{error}</p>
    </div>
  )
}

export default Signup
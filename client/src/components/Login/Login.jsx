import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css'
import '../Signup/signup.css'

function Login() {
    const [email, setEmail]= useState('');
    const [password, setPass]= useState('');
    const [error, setError]= useState('');
    const navigate= useNavigate();

    useEffect(()=>{
        const user= localStorage.getItem('user');
        if(user) navigate('/');
    })

    const handleLogin=async()=>{
        // console.log(email);
        if(email==='' | password===''){
            setError('Input is Empty')
        }else{
            let result= await fetch('http://localhost:5000/user/login',{
                method:'post',
                body: JSON.stringify({email, password}),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            result= await result.json();
            if(result.error){
                setError(result.error);
                setEmail('');
                setPass('');
            }else{
                localStorage.setItem('user', JSON.stringify(result.userPayload));
                localStorage.setItem('auth', result.auth);
                navigate('/');
            }
        }
    }


  return (
    <div className='login'>
        <h1>Login</h1>
        <input onChange={(e)=> setEmail(e.target.value)} value={email} name='email' type="text" placeholder='Email' className='signup-input'/>
        <input onChange={(e)=> setPass(e.target.value)} value={password} type="password" placeholder='Password' className='signup-input'/>
        <button onClick={handleLogin} type='submit' className='signup-btn'>Log In</button>
        <p className='text-danger'>{error}</p>
    </div>
  )
}

export default Login
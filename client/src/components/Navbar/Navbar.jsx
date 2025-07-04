import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './navbar.css';


const Navbar=()=>{

    const auth=localStorage.getItem('user');
    const navigate= useNavigate();

    const handleLogout=()=>{
        // localStorage.removeItem('user');
        localStorage.clear(); //anyone can be used
        navigate('/');
    }


    return(
        <div className='nav-bar'>
            {/* <img src="https://images.unsplash.com/photo-1630148180214-417337ce9652?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" srcset=""/> */}
            
            <ul className='nav-ul'>
                <li><h4><b><i><u>Ecom--Dashboard</u></i></b></h4></li>
                {auth ?
                    <>
                        <li><Link to="/" >Products</Link></li>
                        <li><Link to="/add" >Add Product</Link></li>
                        {/* <li><Link to="/update" >Update Product</Link></li> */}
                        <li><Link to="/profile" >Profile</Link></li>
                        <li><Link onClick={handleLogout} to="/signup" >Logout ({JSON.parse(auth).fullName})</Link></li>
                    </> :
                    <>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                }
                
            </ul>
        </div>
    )
}

export default Navbar;
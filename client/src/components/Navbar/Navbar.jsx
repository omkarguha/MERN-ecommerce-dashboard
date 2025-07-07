import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './navbar.css';


const Navbar=()=>{

    const auth=localStorage.getItem('user');
    const navigate= useNavigate();

    const handleLogout=()=>{
        // localStorage.removeItem('user');
        localStorage.clear(); //both can be used
        navigate('/');
    }


    return(
        <div className='nav-bar'>
            
            <ul className='nav-ul'>
                <li><h4><b><i><u>Ecom--Dashboard</u></i></b></h4></li>
                {auth ?
                    <>
                        <li><Link to="/" >Products</Link></li>
                        <li><Link to="/add" >Add Product</Link></li>
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
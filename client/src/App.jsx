import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Signup from './components/Signup/Signup';
import PrivateCompt from './components/PrivateCompt/PrivateCompt';
import Login from './components/Login/Login';
import AddProduct from './components/AddProduct/AddProduct';
import GetProduct from './components/GetProduct/GetProduct';
import UpdateProduct from './components/UpdateProduct/UpdateProduct';
import Profile from './components/Profile/Profile'

import './App.css';

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar/>
        <Routes>

          <Route element={<PrivateCompt/>}>
            <Route path='/' element={<GetProduct/>}/>
            <Route path='/add' element={<AddProduct/>}/>
            <Route path='/update/:id' element={<UpdateProduct/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/logout' element={<h1>Logging Out</h1>}/>
          </Route>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  )
}

export default App

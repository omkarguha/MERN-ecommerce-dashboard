import React from 'react'
import './profile.css'

function Profile() {
    const user= JSON.parse(localStorage.getItem('user'));
  return (
    <div className='profile'>
        <h1>Profile Page</h1>
        <table>
            <tbody>
                <tr>
                    <td className='first'><h5>User Id:</h5></td>
                    <td className='second'>{user._id}</td>
                </tr>
                <tr>
                    <td className='first'><h5>Name:</h5></td>
                    <td className='second'>{user.fullName}</td>
                </tr>
                <tr>
                    <td className='first'><h5>Email:</h5></td>
                    <td className='second'>{user.email}</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Profile
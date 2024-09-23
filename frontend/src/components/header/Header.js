import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../logo.png';


export default function Header() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username')
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary-subtle">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/home"><img src={logo} alt='logo' width={60} height={60} /></NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/employees">Employees</NavLink>
              </li>
            </ul>
          </div>
          <div className='d-flex align-items-center'>
            <h4 className='me-5'>{username}-</h4>
            <button className='btn btn-primary' onClick={() => { navigate('/') }}>Log Out</button>
          </div>
        </div>
      </nav>
    </div>

  )
}

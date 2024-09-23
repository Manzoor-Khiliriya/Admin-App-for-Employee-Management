import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../logo.png';

export default function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        userName: "",
        password: ""
    });

    useEffect(() => {
        localStorage.clear();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/v1/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });


            const result = await response.json();

            if (!response.ok) {
                return alert(result.error || "Login failed");
            }
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('username', result.data.userName);
            navigate('/home');
        } catch (error) {
            console.error('Sign in failed' || error.message);
        }
    };

    return (
        <div className='d-flex flex-column'>
            <div className='bg-primary-subtle p-3'>
                <NavLink className='navbar-brand' to="/"><img src={logo} width={60} height={60} alt='logo' /></NavLink>
            </div>
            <div className="col-10 col-md-5 mx-auto shadow-lg rounded-3 bg-light p-5 mt-5  text-center">
                <form onSubmit={handleSubmit}>
                    <div className='d-flex my-2'>
                        <label className='form-label col-3 my-auto'>User Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="userName"
                            value={loginData.userName}
                            onChange={handleChange}
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className='d-flex my-2'>
                        <label className='form-label col-3 my-auto'>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            placeholder="password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 me-2">Login</button>
                </form>
            </div>
        </div>
    )
}

import React, { useState } from 'react';
import '../Style.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                // Login successful, handle accordingly (e.g., redirect user)
                console.log('Login successful');
            } else {
                // Login failed, handle accordingly (e.g., display error message)
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="neumorphic-card">
            <img className='logo-designed' src="./Assets/Logo/logo.png" alt="logo" />
            <form onSubmit={handleSubmit} className="neumorphic-form">
                <div className="neumorphic-input-wrapper">
                    <label htmlFor="neumorphic-username">Login ID</label>
                    <input type="text" name="neumorphic-username" id="neumorphic-username" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Please enter login id" />
                </div>
                <div className="neumorphic-input-wrapper">
                    <label htmlFor="neumorphic-password">Password</label>
                    <input type="password" name="neumorphic-password" id="neumorphic-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Please enter password' required />
                </div>
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
}

export default Login;

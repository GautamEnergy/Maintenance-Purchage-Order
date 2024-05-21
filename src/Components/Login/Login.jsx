import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const ProfileImg = localStorage.getItem("ProfileImg");

        if (token && ProfileImg) {
            setLoginOpen(false);
        } else {
            setLoginOpen(true);
        }
    }, []);

    const validateInput = () => {
        if (!email || !password) {
            setError("Please enter both email and password.");
            return false;
        }
        return true;
    };

    const userlogin = async () => {
        if (!validateInput()) return;
        console.log("Texxxxxxxxxt")
        console.log(email);
        console.log("Passs");
        console.log(password);

        try {
            const res = await axios.post("http://srv515471.hstgr.cloud:8080/Employee/Login", {
                loginid: email,
                password: password,
            });
            console.log("Workingggggggggggggggggggggggg")
            if (res.data.msg === "Login Successfull") {
                const token = res.data.token;
                const ProfileImg = res.data.PersonData[0].ProfileImg;


                // console.log(res.data.PersonData[0].ProfileImg);
                localStorage.setItem('profilePic', ProfileImg);

                console.log("Token:", token);
                console.log("ProfileImg:", ProfileImg);

                console.log("Admin logged in successfully!");
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                //window.alert("Login successful!");
                navigate('/nav');


            } else {
                setError("Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.error("Error logging in admin:", error.msg);
            setError("network error");
        }
    };

    return (
        <div className="neumorphic-card">
            <img className='logo-designed' src="./Assets/Logo/logo.png" alt="logo" />
            <form onSubmit={(event) => event.preventDefault()} className="neumorphic-form">
                <div className="neumorphic-input-wrapper">
                    <label htmlFor="email">Login Id</label>
                    <input
                        // type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Please enter email"
                    />
                </div>
                <div className="neumorphic-input-wrapper">
                    <label htmlFor="neumorphic-password">Password</label>
                    <input
                        type="password"
                        name="neumorphic-password"
                        id="neumorphic-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Please enter password'
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit" onClick={userlogin}>Sign in</button>
            </form>
        </div>
    );
}

export default Login;

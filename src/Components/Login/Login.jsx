import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../ContextAPI'
import '../Style.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import logo from "../../Assets/Images/LOGO.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const { setToken } = useContext(AppContext);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [LoginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [url, setUrl] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const department = localStorage.getItem("department");
        const PersonID = localStorage.getItem("CurrentUser");
        const url = localStorage.getItem('url');
        setUrl(url);

        // console.log('asddasda')
        // console.log(localStorage.getItem("CurrentUser"))
        const ProfileImg = localStorage.getItem("ProfileImg");
        const Name = localStorage.getItem("Name");
        const Designation = localStorage.getItem("Designation");


        if (token && ProfileImg && Name && PersonID) {
            setLoginOpen(false);
        } else {
            setLoginOpen(true);
        }

    }, []);




    const notifySuccess = (message) => toast.success(message, { autoClose: 5000 });
    const notifyError = (message) => toast.error(message, { autoClose: 5000 });

    const validateInput = () => {
        if (!LoginId || !password) {
            // setError("Please enter both email and password.");
            return false;
        }
        return true;
    };

    const userlogin = async () => {
        if (!validateInput()) return;
        console.log("Login Id")
        console.log(LoginId);
        console.log("Login Password");
        console.log(password);

        const url = localStorage.getItem('url');

        try {
            const res = await axios.post(`${url}/Employee/Login`, {
                loginid: LoginId,
                password: password,
                department: 'Machine Maintenance'
            });
            console.log("Response Data:", res.data);

            if (res.data.msg === "Login Successfull") {
                const token = res.data.token;

                // Log the PersonData structure to understand it
                console.log("PersonData:", res.data.PersonData);

                // Assuming PersonData is an array, we will log the first item
                if (Array.isArray(res.data.PersonData) && res.data.PersonData.length > 0) {
                    const firstPerson = res.data.PersonData[0];
                    console.log("First Person Data:", firstPerson);

                    const ProfileImg = firstPerson.ProfileImg;
                    const PersonID = firstPerson.PersonID;
                    const Name = firstPerson.Name;
                    const Designation = firstPerson.Designation

                    localStorage.setItem('profilePic', ProfileImg);
                    localStorage.setItem('CurrentUser', PersonID);
                    localStorage.setItem('Name', Name);
                    localStorage.setItem('Designation', Designation);


                    console.log("Token:", token);

                    localStorage.setItem('Token', token)
                    setToken(token);

                    console.log("ProfileImg:", ProfileImg);
                    console.log("CurrentUser:", PersonID);
                    console.log("Name:", Name);
                    console.log("Designation", Designation)

                    console.log("Admin logged in successfully!");
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    navigate('/dashboard');
                } else {
                    setError("Unexpected response structure. PersonData is not an array or is empty.");
                }
            } else {
                setError("Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.log(error.response.data.msg)
            if (error.response.status == 401) {

                notifyError('This login id is not valid')
            } else if (error.response.status == 400) {

                error.response.data.msg == 'Wrong Password' ?
                    notifyError('Wrong Password Entered') :
                    error.response.data.msg == 'Internal Error' ?
                        notifyError('Internal Error') :
                        error.response.data.msg == 'Wrong EmployeeId' ?
                            notifyError('This LoginId Does not exists') :
                            notifyError('Something Went Wrong')
            }

        }
    };



    return (
        <div className="login-card py-3">
            <img src={logo} />
            <form onSubmit={(event) => event.preventDefault()} className="login-form">
                <div className="login-form-input">
                    <label htmlFor="text">Login Id</label>
                    <input
                        name="text"
                        id="text"
                        value={LoginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        required
                        placeholder="Please enter login ID"
                    />
                </div>

                <div className="login-form-input password-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Please enter password"
                    />
                    {password && (
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="password-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    )}
                </div>

                {error && <div className="error">{error}</div>}
                <button type="submit" onClick={userlogin}>Sign in</button>
            </form>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
}

export default Login;


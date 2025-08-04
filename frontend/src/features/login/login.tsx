// import { useState, type ChangeEvent, type FormEvent } from "react"
// import './login.css';
// import { useNavigate } from "react-router-dom";
// import type { AxiosResponse, AxiosError} from "axios";
// import { loginApi } from "../shared/config/api";



// export default function Login(){
//     const [formData, setFormData] = useState({username:'', password:''})
//     const navigate=useNavigate()

//     const handleChange= (e: ChangeEvent<HTMLInputElement>)=>{
//         const {name, value} =e.target;
//         setFormData({...formData, [name]:value})
//     }
//     const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
//         e.preventDefault();

       
//         loginApi(formData).then((res: AxiosResponse)=>{
//             localStorage.setItem('token', res.data.token)
//             localStorage.setItem('currentUser', JSON.stringify(res.data.userData));
//             navigate('/home');
//         }
//         ).catch(
//             (error: AxiosError)=>{
//                 const message=error.response?.data as String ?? 'Server Error'
//                 alert(message)
//             }
//         ).finally(()=>{
//             console.log('Okay')  
//         })
//     }
//     return(
//         <div className="login-wrapper">
//             <form onSubmit={handleSubmit}>
//                 <label className="Title"> Login</label>
//                 <input name="username" onChange= {handleChange} value={formData.username} placeholder="Username" type="text"/>
//                 <input name="password" onChange= {handleChange} value={formData. password} placeholder="Password" type="password"/>
//                 <button type="submit"> Submit</button>
//                 <button type="button" onClick={() => navigate('/register')}>Go to Register Page</button>
//             </form>
//         </div>
//     )
// }

// //export default Login;

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse, AxiosError } from "axios";

interface LoginResponse {
  token: string;
  userData: {
    username: string;
    // add more fields if you have in your backend user object
  };
}

// API call function for login
async function loginApi(formData: { username: string; password: string }): Promise<AxiosResponse<LoginResponse>> {
  return axios.post<LoginResponse>("http://localhost:3000/api/auth/login", formData);
}

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    loginApi(formData)
      .then((res: AxiosResponse<LoginResponse>) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("currentUser", JSON.stringify(res.data.userData));
        navigate("/home");
      })
      .catch((error: AxiosError) => {
        const message = error.response?.data as { message?: string } | undefined;
        setErrorMessage(message?.message || "Server Error");
      });
  };

  return (
    <div className="login-wrapper" style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: 20 }}>Login</h2>
        <input
          name="username"
          onChange={handleChange}
          value={formData.username}
          placeholder="Username"
          type="text"
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
        <input
          name="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
          type="password"
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: "100%", padding: 10, backgroundColor: "#6b46c1", color: "white", border: "none", cursor: "pointer" }}>
          Submit
        </button>
        {errorMessage && <p style={{ color: "red", marginTop: 10 }}>{errorMessage}</p>}
        <button type="button" onClick={() => navigate("/register")} style={{ marginTop: 15 }}>
          Go to Register Page
        </button>
      </form>
    </div>
  );
}

import { useState , type ChangeEvent, type FormEvent} from "react";
import './register.css';
//import type { AxiosResponse } from "axios";


function Register(){
    const[formData, setFormData] =useState({username:'', password:'', email:''})
    
    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        const{name, value}=e.target;
        setFormData({...formData,[name]:value})

    }
    const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(formData)

        
    }
    return(
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <label className="RegisterTitle">Register</label>
                <input name="username" className="UserName" onChange={handleChange} value={formData.username} placeholder=" Username" type="text"/>
                <input name="password" onChange={handleChange} value={formData.password} placeholder="Password" type="text" />
                <input name="email" onChange={handleChange} value={formData.email} placeholder="Email" type="text"/>
                <button type="submit"> Submit</button>
                
            </form>
        </div>
    )
}

export default Register;
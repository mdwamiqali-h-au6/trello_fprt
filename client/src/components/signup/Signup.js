import React, {useState, Fragment} from 'react'
import {Link} from 'react-router-dom';
import './Signup.css'

const Signup = () => {

    const [values, setValues] = useState({
        fullname: '',
        email: '',
        password: '',
        success: false,
        errors: false
    })

    const {fullname, email, password, success, errors} = values

    const handleChange = name => event => {
        setValues({
                ...values,
                [name]: event.target.value,
            }
        );
    }

    const onSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:8000/signup/",{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => {
            console.log(response);
        })
        .catch(errors => console.log(errors));

        setValues({
            ...values,
            fullname: "",
            email: "",
            password: "",
            success: true,
            errors: false
        })
    }
    const successMessage = () => {
        return (
            <div 
                className="alert alert-success" 
                role="alert"
                style={{display: success ? "" : "none"}}
            >
                User registred successfully!
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div 
                className="alert alert-danger" 
                role="alert"
                style={{display: errors ? "" : "none"}}
            >
                {errors}
            </div>
        )
    }

    return (
        <Fragment>
            <div className="main signup-body">
                <div className="container">
                    <div className="sign-up-content">
                        {successMessage()}
                        {errorMessage()}
                        <form className="signup-form">
                            <h2 className="form-title">Signup</h2>
                            <div className="form-textbox">
                                <label htmlFor="name">Full name</label>
                                <input type="text" id="name" onChange={handleChange('fullname')} value={fullname}/>
                            </div>
                            <div className="form-textbox">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" onChange={handleChange('email')} value={email}/>
                            </div>
                            <div className="form-textbox">
                                <label htmlFor="pass">Password</label>
                                <input type="password" id="pass" onChange={handleChange('password')} value={password}/>
                            </div>
                            <div className="padding-custom">
                                
                            </div>
                            <div className="form-textbox">
                                <button onClick={onSubmit} name="submit" className="submit">Create account</button>
                            </div>
                        </form>
                        <p className="loginhere">
                            Already have an account ?<Link to="/login" className="loginhere-link"> Login</Link>
                        </p>
                    </div>
                </div>
                </div>
        </Fragment>
    )
}

export default Signup;
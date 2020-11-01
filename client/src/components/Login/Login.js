import React, {useState, Fragment} from 'react'
import {Link, useHistory  } from 'react-router-dom';
import './Login.css'

const Signup = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        errors: false,
    })

    const {email, password, errors} = values

    const handleChange = name => event => {
        setValues({
                ...values,
                [name]: event.target.value,
            }
        );
    }

    let history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:8000/login/",{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => {
            return response = response.json()
        })
        .then(result => {
            if(!result.token){
                history.push('/login')
                setValues({
                    ...values,
                    errors: result.message
                })
            }else if(result.token){
                localStorage.setItem("userToken", result.token)
                localStorage.setItem("userDetails", result.userData._id)
                window.location.assign('/');
            }
            console.log(result)
        })
        .catch(errors => console.log(errors));

        setValues({
            ...values,
            email: "",
            password: "",
        })
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
            <div className="main login-body">
                <div className="container">
                    <div className="sign-up-content">
                        {errorMessage()}
                        <form className="signup-form">
                            <h2 className="form-title">Login</h2>
                            <div className="form-textbox">
                                <label htmlFor="email-name">Email</label>
                                <input type="email" onChange={handleChange('email')} value={email} id="email-name" />
                            </div>
                            <div className="form-textbox">
                                <label htmlFor="pass">Password</label>
                                <input type="password" onChange={handleChange('password')} value={password} id="pass" />
                            </div>
                            <div className="padding-custom">
                                
                            </div>
                            <div className="form-textbox">
                                <button onClick={onSubmit} name="submit" className="submit">Login</button>
                            </div>
                        </form>
                        <p className="loginhere">
                            Dont have an account ?<Link to="/signup" className="loginhere-link"> Signup here</Link>
                        </p>
                    </div>
                </div>
                </div>
        </Fragment>
    )
}

export default Signup;
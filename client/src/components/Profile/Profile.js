import React, {useState, Fragment} from 'react';
import {useHistory} from 'react-router-dom'
import './Profile.css'
import Image from './img_avatar.png'

const Profile = () => {
    let history = useHistory();

    const [values, setValues] = useState({
        fullname: '',
        password: '',
        profilePic: '',
    })

    const {fullname, password} = values

    const handleChange = name => event => {
        setValues({
                ...values,
                [name]: event.target.value,
            }
        );
    }

    const token = localStorage.getItem('userToken')
    const onSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        formData.append('fullname', fullname);
        formData.append('password', password);
        formData.append('profileImage', fileField.files);

        fetch("http://localhost:8000/profile/",{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => {
            return response = response;
        })
        .then(result => {
            if(!result.token){
                history.push('/profile')
                setValues({
                    ...values,
                })
            }else if(result){
                console.log(result)
                // localStorage.setItem("userToken", result.token)
                // window.location.assign('/');
            }
        })
        .catch(errors => console.log(errors));

        setValues({
            ...values,
            email: "",
            password: "",
        })
    }

    return (
        <Fragment>
            <div className="jumbotron">
                <div className="container spacing">
                    <h2 className="">Hello, world!</h2>
                    <h4 className="font-weight-bold">Manage your personal information</h4>
                    <p>This is where you can make changes to your profile information.</p>
                    <br className="my-4"/>
                    <h5 className="font-weight-bold">About.</h5>
                    <hr className="my-4"/>
                    <div className="profile-content">
                        <form className="signup-form" encType="multipart/form-data">
                            <div className="form-group">
                                <label htmlFor="fullname">Full Name</label>
                                <input type="text" onChange={handleChange('fullname')} value={fullname} className="form-control" id="fullname"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">Password</label>
                                <input type="password" onChange={handleChange('password')} value={password} className="form-control" id="Password"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="profile">Password</label>
                                <input type="file" name="profilePic" className="form-control" id="profile"/>
                            </div>
                            <button onClick={onSubmit} name="submit" className="submit">Save</button>
                        </form>
                        <div className="profile-picture">
                            <h4>Avatar</h4>
                            <img src={Image} className="pic" alt="avatar"/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile

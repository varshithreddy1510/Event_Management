import React from "react";

const Profile = ()=>{
    const user = localStorage.getItem('user');

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <p>Name: {JSON.parse(user).name}</p>
            <p>Email: {JSON.parse(user).email}</p>
        </div>
    )
}

export default Profile;
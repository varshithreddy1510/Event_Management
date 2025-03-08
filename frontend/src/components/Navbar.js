import React from "react";
import { json, Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div className="navbar-container">
        <img 
        alt="logo"
        className="logo"
        src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?t=st=1726927038~exp=1726930638~hmac=a268ef9381ca02ca856f003b9d8b9a8b636905bcb7b26334c0e8728dd9436d78&w=826"
        />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/Events">Event</Link>
          </li>
          <li>
            <Link to="/">Update Event</Link>
          </li>
          <li>
            <Link to="/add">Add Event</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">LogOut({JSON.parse(auth).name})</Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul">
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;

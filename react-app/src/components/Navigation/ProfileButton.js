import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="profile-container">
      <button onClick={openMenu} className="nav-profile-button">
        <i className="fas fa-user" />
        <i className="fas fa-caret-down" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="profile-dropdown-container">
            <div className="profile-dropdown-div">
              <div className="profile-dropdown-user">
                <i className="fas fa-user" />
                <span className="profile-dropdown-name">{user.username}</span>
              </div>
              <NavLink to="/orders" style={{ textDecoration: 'none', color: "black" }}>
                <div className="profile-dropdown-purchases">
                  <i className="fas fa-clipboard-list" />
                  <span>Purchases</span>
                </div>
              </NavLink>
              <div onClick={handleLogout} className="profile-dropdown-logout">
                <i className="fas fa-sign-out-alt" />
                <span className="profile-dropdown-logout-btn">Sign Out</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="profile-logsign-div">
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalClass="login-sign-btn"
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalClass="login-sign-btn"
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;

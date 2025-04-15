import React from 'react';
// import './Header.css';

const Header = ({ username, onLogout }) => {
  return (
    <>
    <div className='empDashboard'>
        <div className="header-container">
          <h3 className="greeting">
            Hello <br />
            <span className="username-container">
              {username} 👋
              <button className="float-right logout-button" onClick={onLogout}>
                Logout
              </button>
            </span>
          </h3>
        </div>
    </div>
    </>
    
  );
};

export default Header;

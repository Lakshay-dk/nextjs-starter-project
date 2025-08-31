import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>📚 ReadShelf</h2>
        </div>
        <div className="nav-links">
          <span className="nav-item">My Library</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

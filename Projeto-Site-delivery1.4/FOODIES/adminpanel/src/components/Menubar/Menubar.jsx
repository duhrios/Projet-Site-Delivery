import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

const Menubar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">
        <button
          id="sidebarToggle"
          onClick={toggleSidebar}
          className="btn btn-primary"
        >
          <i className="bi bi-list"></i>
        </button>
        
      </div>
    </nav>
  );
};

export default Menubar;

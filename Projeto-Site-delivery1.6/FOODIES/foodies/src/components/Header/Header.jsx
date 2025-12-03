import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
  return (
    <div className="p-5 nb-4 bg-light rounded-3 mt-1 header">
        <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold"> Peça aqui sua comida preferida</h1>
            <p col-md-8 ts-4>Encontre as melhores comidas e bebidas para delivery em São Paulo</p>
            <Link to="/explore" className='btn btn-primary'> Explore </Link>
        </div>
    </div>
  )
}

export default Header;

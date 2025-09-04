import React, { useContext } from "react";

import "./PlaceOrder.css";
import { assets } from "../../../assets/assets";
import { StoreContext } from "../../../context/StoreContext";
import Cart from "../Cart/Cart";
import { calculateCartTotals } from "../../../util/cartUtils";
calculateCartTotals

const PlaceOrder = () => {
  const { foodList, quantities, setQuantities } = useContext(StoreContext);

  // itens no carrinho
  const cartItems = foodList.filter(food => quantities[food.id] > 0);

  const {subtotal, shipping, tax , total} = calculateCartTotals(cartItems, quantities
    
  );
  return (
    <div className="container mt-4">
      <main>
        <div className="py-5 text-center">
          {" "}
          <img className="d-block mx-auto" src={assets.logo} alt="Logo" width="98" height="98" />{" "}
         
        </div>
        <div className="row g-5">
          {" "}
          <div className="col-md-5 col-lg-4 order-md-last">
            {" "}
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              {" "}
              <span className="text-primary">Seu Carrinho</span>{" "}
              <span className="badge bg-primary rounded-pill">{cartItems.length}</span>{" "}
            </h4>{" "}
            <ul className="list-group mb-3">
              {" "}
              {cartItems.map((item => (
              <li 
              key={item.id}
              
              
              className="list-group-item d-flex justify-content-between lh-sm">
                {" "}
                <div>
                  {" "}
                  <h6 className="my-0">{item.name}</h6>{" "}
                  <small className="text-body-secondary">
                   Quantidade:     {quantities[item.id]}
                  </small>{" "}
                </div>{" "}
                <span className="text-body-secondary">R${(item.price * quantities[item.id]).toFixed(2)}</span>
              </li>

              )))}
              <li className="list-group-item d-flex justify-content-between ">
                {" "}
                <div>
                  {" "}
                  
                  <span >
                    Frete
                  </span>{" "}
                </div>{" "}
                <span className="text-body-secondary">R${subtotal == 0? 0.0: shipping.toFixed(2)}</span>{" "}
              </li>{" "}
              <li className="list-group-item d-flex justify-content-between ">
                {" "}
                <div>
                  {" "}
                 
                  <span>
                    Taxa (10%)
                  </span>{" "}
                </div>{" "}
                <span className="text-body-secondary">R${tax.toFixed(2)}</span>{" "}
              </li>{" "}
              <li className="list-group-item d-flex justify-content-between">
                {" "}
                <span>Total </span> <strong>{total.toFixed(2)} (BRL)</strong>{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
          <div className="col-md-7 col-lg-8">
            {" "}
            <h4 className="mb-3">Endereço de entrega</h4>{" "}
            <form className="needs-validation" novalidate>
              {" "}
              <div className="row g-3">
                {" "}
                <div className="col-sm-6">
                  {" "}
                  <label htmlFor="firstName" className="form-label">
                    Nome
                  </label>{" "}
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Digite seu nome..."
                    value=""
                    
                    required
                  />{" "}
                </div>{" "}
                <div className="col-sm-6">
                  {" "}
                  <label htmlFor="lastName" className="form-label">
                    Sobrenome
                  </label>{" "}
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Digite seu Sobrenome..."
                    value=""
                    required
                  />{" "}
                </div>{" "}
                <div className="col-12">
                  {" "}
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>{" "}
                  <div className="input-group has-validation">
                    {" "}
                    <span className="input-group-text">@</span>{" "}
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="meuemail@exemplo.com"
                      required
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div className="col-12">
                  {" "}
                  <label htmlFor="phone" className="form-label">
                    Número de Telefone
                  </label>{" "}
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    placeholder="(DDD)999999999"
                    required
                  />{" "}
                </div>{" "}
                <div className="col-12">
                  {" "}
                  <label htmlFor="address2" className="form-label">
                    Endereço{" "}
                    {/*    <span className="text-body-secondary">(Opcional)</span> */}
                  </label>{" "}
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="Rua das Flores, 123"
                  />{" "}
                </div>{" "}
                <div className="col-md-5">
                  {" "}
                  <label htmlFor="country" className="form-label">
                    País
                  </label>
                  <div className="form-control" id="country">
                    Brasil
                  </div>
                  {/*   <label htmlFor="country" className="form-label">
                      País
                    </label>{""}
                   <input type="text" className="form-control" value="Brasil" name="country" readonly/> */}
                  {/*  <select className="form-select" id="country" required>
                      {" "}
                      <option value="">Escolher</option> <option>Brasil</option>{" "}
                    </select>{" "} */}
                </div>{" "}
                <div className="col-md-4">
                  {" "}
                  <label htmlFor="state" className="form-label">
                    Estado
                  </label>{" "}
                  <select className="form-select" id="state" required>
                    {" "}
                    <option value="">Escolher...</option>
                    <option>Acre</option>
                    <option>Alagoas</option>
                    <option>Amapá</option>
                    <option>Amazonas</option>
                    <option>Bahia</option>
                    <option>Ceará</option>
                    <option>Distrito Federal</option>
                    <option>Espírito Santo</option>
                    <option>Goiás</option>
                    <option>Maranhão</option>
                    <option>Mato Grosso</option>
                    <option>Mato Grosso do Sul</option>
                    <option>Minas Gerais</option>
                    <option>Pará</option>
                    <option>Paraíba</option>
                    <option>Paraná</option>
                    <option>Pernambuco</option>
                    <option>Piauí</option>
                    <option>Rio de Janeiro</option>
                    <option>Rio Grande do Norte</option>
                    <option>Rio Grande do Sul</option>
                    <option>Rondônia</option>
                    <option>Roraima</option>
                    <option>Santa Catarina</option>
                    <option>São Paulo</option>
                    <option>Sergipe</option>
                    <option>Tocantins</option>
                  </select>{" "}
                </div>{" "}
                <div className="col-md-3">
                  {" "}
                  <label htmlFor="zip" className="form-label">
                    CEP
                  </label>{" "}
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder="12345-678"
                    required
                  />{" "}
                </div>{" "}
              </div>{" "}
              <hr className="my-4" />{" "}
              <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={cartItems.length === 0}>
                Finalizar compra
              </button>{" "}
            </form>{" "}
          </div>{" "}
        </div>
      </main>
    </div>
  );
};

export default PlaceOrder;

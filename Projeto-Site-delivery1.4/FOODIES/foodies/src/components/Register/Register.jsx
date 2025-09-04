import React, { useState } from 'react';
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import { registerUser } from '../../../../adminpanel/src/services/authService';
const Register = () => {
  const navigate = useNavigate();
  const [data, setData] =  useState({ 
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData( data => ({...data, [name]: value}));
  }
  const onSubmitHandler = async (event) => {
      event.preventDefault();
      
      try {
       const response = await registerUser(data);
      if(response.status === 201){
         toast.success('Registro foi efetuado com sucesso. Por favor realize o login.');
         navigate("/login");

      }else{
         toast.error("Não foi possível resgistrar-se. Por favor tente novamente.");
      }
      } catch (error) {
         toast.error("Não foi possível resgistrar-se. Por favor tente novamente.");
      }


  };

  return (  
    <div className=" register-container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Cadastro</h5>
            <form onSubmit={onSubmitHandler}>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingName" placeholder="Roberto Firmino"
                name='name'
                onChange={onChangeHandler}
                value={data.name}
                required
                />
                <label htmlFor="floatingName">Nome Completo</label>
              </div>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingName" placeholder="nome@exemplo.com"
                 name="email" onChange={onChangeHandler}
                 value={data.email}
                 required
                />
                <label htmlFor="floatingName">Endereço de Email</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                required
                />
                <label htmlFor="floatingPassword">Senha</label>
              </div>
              

              
              <div className="d-grid">
                <button className="btn btn-outline-primary btn-login text-uppercase " type="submit"> Cadastrar-se</button>
                <button className="btn btn-outline-danger btn-login text-uppercase mt-2" type="reset">Limpar</button>
              </div>
              
           <div className="mt-4">
  Já possui uma conta? <Link to="/login">Fazer login</Link>
</div>   
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register;

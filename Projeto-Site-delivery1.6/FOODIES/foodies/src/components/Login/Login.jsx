import React from 'react';
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { login } from '../../../../adminpanel/src/services/authService';
import { useContext } from 'react';
import {StoreContext} from '../../context/StoreContext';
import { toast } from 'react-toastify';
import axios from "axios";

const Login = () => {
const {setToken} = useContext(StoreContext);
const navigate = useNavigate();


  const [data,setData] = useState({
   email: '',
   password: ''
  });
  const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
       setData(data => ({... data, [name]: value}));
  };

  const onSubmitHandler = async (event) => {
     event.preventDefault();

     try {
         const response = await login(data);

         console.log("data", data);
         if (response.status === 200) {
           setToken(response.data.token);
           localStorage.setItem("token" , response.data.token);
          navigate("/")
         }else {
             toast.error("Não foi possível realizar login. Por favor tente novamente.");

         }

     } catch (error) {
        console.log("Erro ao efetuar login.", error);
      
      toast.error("Não foi possível realizar login. Por favor tente novamente.");
     }
     
  };

  return (
    <div className=" login-container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Login</h5>
            <form onSubmit={onSubmitHandler}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="nome@example.com" 
                name='email'
                onChange={onChangeHandler}
                value={data.email}
                />
                <label htmlFor="floatingInput">Endereço de email</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Senha"
                 name='password'
                 onChange={onChangeHandler}
                 value={data.password}
                />
                <label htmlFor="floatingPassword">Senha</label>
              </div>

              
              <div className="d-grid">
                <button className="btn btn-outline-primary btn-login text-uppercase " type="submit"> Fazer login</button>
                <button className="btn btn-outline-danger btn-login text-uppercase mt-2" type="reset">Limpar</button>
              </div>
              
           <div className="mt-4">
  Não possui conta? <Link to="/register">Criar conta</Link>
</div>   
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login;

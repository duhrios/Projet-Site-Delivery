import { assets } from "../../assets/assets";
import React, { useState } from "react";
import axios from "axios";
import { addFood } from "../../services/foodServic";
import { toast } from "react-toastify";

const AddFood = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
   const onChangeHandler = async (event) => {
    const name = event.target.name;
    const value = event.target.value; 

    




    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error("Por favor, selecione uma imagem.");
      return;
    }

    const formData = new FormData();
    formData.append("food", JSON.stringify(data));
    formData.append("file", image);

    try {
      await addFood(data, image);
      toast.success("Prato adicionado com sucesso.");
      setData({
        name: "",
        description: "",
        category: "Selecione uma opção",
        price: "",
      });
      setImage(null);
    } catch (error) {
      toast.error("Erro ao adicionar prato.");
    }
  };
  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className=" card col-md-5">
          <div className="card-body">
            <h2 className="mb-4">Adicionar Prato</h2>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    alt=""
                    width={98}
                  />
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Digite o nome do prato..."
                  className="form-control"
                  id="name"
                  required
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Descrição
                </label>
                <textarea
                  className="form-control"
                  placeholder="Escreva o conteúdo aqui..."
                  id="description"
                  rows="5"
                  required
                  name="description"
                  onChange={onChangeHandler}
                  value={data.description}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Categoria
                </label>
                <select
                  name="category"
                  id="category"
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.category}
                  required
                >
                  <option value="" disabled hidden>
                    Selecione uma categoria...
                  </option>
                  <option value="Pizzas">Pizzas</option>
                  <option value="Refeições">Refeições</option>

                  <option value="Vegetariana">Vegetariana</option>
                  <option value="Hambúrgueres">Hambúrgueres</option>
                  <option value="Bolos">Bolos</option>
                  <option value="Sorvetes">Sorvetes</option>
                  <option value="Refrigerantes">Refrigerantes</option>
                  <option value="Alcoólicas">Alcoólicas</option>
                </select>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Preço
                  </label>
                  <input
                    type="number"

                     step="0.01"
                    name="price"
                    id="price"
                    required
                    placeholder="&#82;&#36;200"
                    className="form-control"
                    onChange={onChangeHandler}
                    value={data.price}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
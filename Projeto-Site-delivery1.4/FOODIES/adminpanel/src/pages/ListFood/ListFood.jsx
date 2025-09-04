import {useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import './ListFood.css';
import { deleteFood, getFoodList } from "../../services/foodServic";

const ListFood = () => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
    const data = await getFoodList();
    setList(data);
    } catch (error) {
      toast.error('Erro ao ler os pratos.')
    }
  };
  
 const removeFood = async(foodId) => {
    try {
   const sucess = await deleteFood(foodId);
   if (sucess) {
      toast.success('Prato removido.');
      await fetchList();
   } else {
      toast.error('Um erro ocorreu na remoção do prato.');
   }
    } catch (error) {
      toast.error('Um erro ocorreu na remoção do prato.');
    }
  }
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="py-5 row justify-content-center">
      <div className="col-11 card">
        <table className="table">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    height="40"
                    width={48}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>R${item.price}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => removeFood(item.id)}>
                    <i className="bi bi-trash"></i > Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListFood;

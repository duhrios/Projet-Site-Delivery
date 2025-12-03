import { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";
import { assets } from "../../../assets/assets";
import "./MyOrders.css";

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setData(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      setData([]);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <table className="table table-responsive">
            <tbody>
              {data && data.length > 0 ? (
                data.map((order, index) => (
                  <tr key={index}>
                    <td>
                      <img src={assets.logo} alt="" height={40} width={48} />
                    </td>
                    <td>
                      {order.orderedItems?.map((item, i) =>
                        i === order.orderedItems.length - 1
                          ? `${item.nome} x ${item.quantity}`
                          : `${item.nome} x ${item.quantity}. `
                      )}
                    </td>
                    <td>R$ {order.amount?.toFixed(2) ?? "0.00"}</td>
                    <td>Items: {order.orderedItems?.length ?? 0}</td>
                    <td className="fw-bold text-capitalize">
                      &#x25cf; {order.orderStatus ?? "pendente"}
                    </td>
                    <td>
                      <button className="btn btn-sm btn-warning" onClick={fetchOrders}>
                        <i className="bi bi-arrow-clockwise"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    Nenhum pedido encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
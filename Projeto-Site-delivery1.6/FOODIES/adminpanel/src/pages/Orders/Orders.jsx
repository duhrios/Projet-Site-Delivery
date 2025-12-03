import { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets.js"; 

const Orders = () => {
  const [data, setData] = useState([]);
  const [localStatus, setLocalStatus] = useState({}); // Estado local para cada pedido

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders/all");
      setData(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      setData([]);
    }
  };

  const updateStatus = (event, orderId) => {
    // Atualiza apenas localmente (sem chamar API)
    setLocalStatus(prev => ({
      ...prev,
      [orderId]: event.target.value
    }));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
                      <img src={assets.parcel} alt="" height={48} width={48} />
                    </td>
                    <td>
                      <div>
                       {order.userAddress}
                      </div>
                    </td>
                    <td>R${order.amount?.toFixed(2) ?? "0.00"}</td>
                    <td>Items: {order.orderedItems?.length ?? 0}</td>
                    <td className="fw-bold text-capitalize">
                      &#x25cf; {localStatus[order.id] || "PENDING"}
                    </td>
                    <td>
                      <select 
                        className="form-control"
                        onChange={(event) => updateStatus(event, order.id)} 
                        value={localStatus[order.id] || "PENDING"}
                      >
                        <option value="PENDING">Preparando prato</option>
                        <option value="OUT_FOR_DELIVERY">Saiu para entrega</option>
                        <option value="DELIVERED">Pedido entregue</option>
                      </select>
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

export default Orders;
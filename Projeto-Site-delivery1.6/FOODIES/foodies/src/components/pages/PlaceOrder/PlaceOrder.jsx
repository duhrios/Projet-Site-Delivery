import { useContext, useState } from "react";
import "./PlaceOrder.css";
import { assets } from "../../../assets/assets";
import { StoreContext } from "../../../context/StoreContext";
import { calculateCartTotals } from "../../../util/cartUtils";
import axios from "axios";
import { toast } from "react-toastify";
import { MERCADOPAGO_KEY } from '/src/util/constants';
import { useNavigate } from "react-router-dom";

const cidadesPorEstado = {
  "Acre": ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá", "Feijó"],
  "Alagoas": ["Maceió", "Arapiraca", "Palmeira dos Índios", "Rio Largo", "Penedo"],
  "Amapá": ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque", "Mazagão"],
  "Amazonas": ["Manaus", "Parintins", "Itacoatiara", "Manacapuru", "Coari"],
  "Bahia": ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Juazeiro"],
  "Ceará": ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral"],
  "Distrito Federal": ["Brasília", "Ceilândia", "Taguatinga", "Sobradinho", "Gama"],
  "Espírito Santo": ["Vitória", "Vila Velha", "Serra", "Cariacica", "Linhares"],
  "Goiás": ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia"],
  "Maranhão": ["São Luís", "Imperatriz", "Timon", "Caxias", "Codó"],
  "Mato Grosso": ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra"],
  "Mato Grosso do Sul": ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã"],
  "Minas Gerais": ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim"],
  "Pará": ["Belém", "Ananindeua", "Santarém", "Marabá", "Parauapebas"],
  "Paraíba": ["João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux"],
  "Paraná": ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel"],
  "Pernambuco": ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Petrolina"],
  "Piauí": ["Teresina", "Parnaíba", "Picos", "Piripiri", "Floriano"],
  "Rio de Janeiro": ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói"],
  "Rio Grande do Norte": ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante", "Macaíba"],
  "Rio Grande do Sul": ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria"],
  "Rondônia": ["Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena", "Cacoal"],
  "Roraima": ["Boa Vista", "Rorainópolis", "Caracaraí", "Alto Alegre", "Mucajaí"],
  "Santa Catarina": ["Florianópolis", "Joinville", "Blumenau", "São José", "Criciúma"],
  "São Paulo": ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santo André"],
  "Sergipe": ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana", "São Cristóvão"],
  "Tocantins": ["Palmas", "Araguaína", "Gurupi", "Porto Nacional", "Paraíso do Tocantins"]
};

const PlaceOrder = () => {
  const { foodList, quantities, setQuantities, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    state: '',
    city: '',
    zip: ''
  });

  const [cidadesDisponiveis, setCidadesDisponiveis] = useState([]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => {
      const newData = { ...data, [name]: value };
      
      if (name === 'state') {
        newData.city = '';
        if (value && cidadesPorEstado[value]) {
          setCidadesDisponiveis(cidadesPorEstado[value]);
        } else {
          setCidadesDisponiveis([]);
        }
      }
      return newData;
    });
  };

  const onSubmitHandler = async (event) => { 
    event.preventDefault();
    console.log("🎯 INICIANDO PEDIDO...");

    // Preparar itens do carrinho
    const orderItems = cartItems.map(item => ({
      foodId: item.id,
      quantity: quantities[item.id]
    }));

    const orderData = {
      items: orderItems,
      address: data,
      amount: total
    };

    try {
      console.log("📤 Enviando pedido para backend...");
      console.log("🔑 Token:", token ? "✅ Presente" : "❌ Ausente");
      
      // Chamar o backend
      const response = await axios.post(
        'http://localhost:8080/api/orders/create',
        orderData,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      console.log("✅ Resposta do backend:", response.data);

      // Pegar o preferenceId da resposta
      const preferenceId = response.data.mercadopagoPreferenceId;

      if (!preferenceId) {
        console.error("❌ PreferenceId não encontrado na resposta!");
        toast.error("Erro: PreferenceId não encontrado");
        return;
      }

      console.log("🎯 PreferenceId recebido:", preferenceId);
      
      // Verificar se o SDK do Mercado Pago está carregado
      if (!window.MercadoPago) {
        console.error("❌ MercadoPago SDK não carregado!");
        toast.error("Erro ao carregar sistema de pagamento");
        return;
      }

      // Inicializar Mercado Pago
      const mp = new window.MercadoPago(MERCADOPAGO_KEY, { 
        locale: 'pt-BR' 
      });
      
      console.log("💳 Abrindo checkout do Mercado Pago...");

      // Abrir checkout
      mp.checkout({
        preference: { 
          id: preferenceId 
        },
        autoOpen: true,
      });
      
      console.log("✅ Checkout iniciado com sucesso!");
      toast.success("Abrindo pagamento do Mercado Pago...");

    } catch (error) {
      console.error("❌ ERRO COMPLETO:", error);
      console.error("❌ Response:", error.response);
      
      // Verificar se é erro de token expirado
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Sessão expirada! Faça login novamente.");
        navigate('/login');
        return;
      }
      
      toast.error(error.response?.data?.message || "Erro ao processar pedido");
    }
  };

  const verifyPayment = async(mercadopagoResponse) => {
    console.log("🔍 Verificando pagamento:", mercadopagoResponse);
    
    const paymentData = {
      mercadopago_payment_id: mercadopagoResponse.mercadopago_payment_id,
      mercadopago_order_id: mercadopagoResponse.mercadopago_order_id,
      mercadopago_signature: mercadopagoResponse.mercadopago_signature
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/orders/verify', 
        paymentData, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        toast.success('Pagamento confirmado com sucesso!');
        await clearCart();
        navigate('/myorders');
      } else {
        toast.error('Erro ao confirmar pagamento.');
        navigate('/');
      }
    } catch (error) {
      console.error("❌ Erro ao verificar pagamento:", error);
      toast.error('Erro ao confirmar pagamento. Verifique seus pedidos.');
      navigate('/myorders');
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('http://localhost:8080/api/cart/clear', {
        headers: {'Authorization': `Bearer ${token}`}
      });
      setQuantities({});
      console.log("✅ Carrinho limpo!");
    } catch (error) {
      console.error("❌ Erro ao limpar carrinho:", error);
      toast.error("Erro ao limpar o carrinho.");
    }
  };

  const cartItems = foodList.filter(food => quantities[food.id] > 0);
  const {subtotal, shipping, tax, total} = calculateCartTotals(cartItems, quantities);

  return (
    <div className="container mt-4">
      <main>
        <div className="py-5 text-center">
          <img className="d-block mx-auto" src={assets.logo} alt="Logo" width="98" height="98" />
        </div>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Seu Carrinho</span>
              <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
            </h4>
            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-body-secondary">
                      Quantidade: {quantities[item.id]}
                    </small>
                  </div>
                  <span className="text-body-secondary">R${(item.price * quantities[item.id]).toFixed(2)}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span>Frete</span>
                </div>
                <span className="text-body-secondary">R${subtotal === 0 ? 0.0 : shipping.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span>Taxa (10%)</span>
                </div>
                <span className="text-body-secondary">R${tax.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total</span>
                <strong>R$ {total.toFixed(2)}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Endereço de entrega</h4>
            <form className="needs-validation" onSubmit={onSubmitHandler}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Digite seu nome..."
                    required
                    name="firstName"
                    onChange={onChangeHandler}
                    value={data.firstName}
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">Sobrenome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Digite seu Sobrenome..."
                    value={data.lastName}
                    onChange={onChangeHandler}
                    name="lastName"
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="meuemail@exemplo.com"
                      required
                      name="email"
                      onChange={onChangeHandler}
                      value={data.email}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="phone" className="form-label">Número de Telefone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="(DDD)999999999"
                    required
                    value={data.phoneNumber}
                    name="phoneNumber"
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="address2" className="form-label">Endereço</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="Rua das Flores, 123"
                    required
                    value={data.address}
                    name="address"
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="state" className="form-label">Estado</label>
                  <select className="form-select" id="state" required name="state" value={data.state} onChange={onChangeHandler}>
                    <option value="">Escolher...</option>
                    {Object.keys(cidadesPorEstado).map(estado => (
                      <option key={estado} value={estado}>{estado}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="city" className="form-label">Cidade</label>
                  <select className="form-select" id="city" required name="city" value={data.city} onChange={onChangeHandler} disabled={!data.state}>
                    <option value="">Escolher...</option>
                    {cidadesDisponiveis.map(cidade => (
                      <option key={cidade} value={cidade}>{cidade}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">CEP</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder="12345-678"
                    required
                    name="zip"
                    value={data.zip}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
              <hr className="my-4" />
              <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={cartItems.length === 0}>
                Finalizar compra
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaceOrder;
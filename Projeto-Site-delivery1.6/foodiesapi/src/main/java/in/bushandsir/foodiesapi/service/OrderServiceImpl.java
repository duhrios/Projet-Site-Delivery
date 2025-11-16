package in.bushandsir.foodiesapi.service;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.payment.PaymentCreateRequest;
import com.mercadopago.client.payment.PaymentPayerRequest;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import com.mercadopago.resources.preference.Preference;
import in.bushandsir.foodiesapi.entity.OrderEntity;
import in.bushandsir.foodiesapi.io.OrderRequest;
import in.bushandsir.foodiesapi.io.OrderResponse;
import in.bushandsir.foodiesapi.repository.CartRepository;
import in.bushandsir.foodiesapi.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CartRepository cartRepository;

    @Value("${mercadopago.access.token}")
    private String mercadopagoToken;


    @Override
    public OrderResponse createOrderWithPayment(OrderRequest request) throws MPException, MPApiException {
        // 1. Salvar pedido no MongoDB (MANTENHA ESTE CÓDIGO)
        OrderEntity newOrder = convertToEntity(request);
        newOrder = orderRepository.save(newOrder);

        // 2. ✅ TROQUE ESTA PARTE - Use preferência em vez de pagamento PIX
        String preferenceId = createMercadoPagoPreference(newOrder);

        // 3. Atualizar pedido com PREFERENCE ID (ALTERE AQUI)
        newOrder.setMercadopagoPreferenceId(preferenceId); // ⚠️ Use preferenceId
        newOrder.setPaymentStatus("pending"); // Status inicial
        newOrder = orderRepository.save(newOrder);

        // 4. Retornar response (MANTENHA ESTE CÓDIGO)
        OrderResponse response = convertToResponse(newOrder);
        response.setMercadopagoPreferenceId(preferenceId); // ⚠️ Adicione esta linha

        return response;
    }

    @Override
    public void verifyPayment(Map<String, String> paymentData, String status) {
        String mercadopagoPaymentId = paymentData.get("mercadopago_payment_id");
        String mercadopagoPreferenceId = paymentData.get("mercadopago_preference_id");
        OrderEntity existingOrder = orderRepository.findByMercadopagoPreferenceId(mercadopagoPreferenceId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado."));
        existingOrder.setPaymentStatus(status);
        existingOrder.setMercadopagoSignature(paymentData.get("mercadopago_signature"));
        existingOrder.setMercadopagoPaymentId("mercadopago_payment_id");
        orderRepository.save(existingOrder);
        if ("pago".equalsIgnoreCase(status)){
            cartRepository.deleteByUserId(existingOrder.getUserId());

        }


    }

    @Override
    public List<OrderResponse> getUserOrders() {
        String loggedInUserId = userService.findByUserId();
        List<OrderEntity> list =  orderRepository.findByUserId(loggedInUserId);
        return list.stream().map(entity -> convertToResponse(entity)).collect(Collectors.toList());
    }

    @Override
    public void removeOrder(String orderId) {
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<OrderResponse> getOrdersOfAllUser() {
        List<OrderEntity> list =  orderRepository.findAll();
        return list.stream().map(entity -> convertToResponse(entity)).collect(Collectors.toList());

    }

    @Override
    public void updateOrderStatus(String orderId, String status) {
        OrderEntity entity = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
        entity.setOrderStatus(status);
        orderRepository.save(entity);

    }

    private OrderResponse convertToResponse(OrderEntity order) {
        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .userAddress(order.getUserAddress())
                .phoneNumber(order.getPhoneNumber())
                .email(order.getEmail())
                .amount(order.getAmount())
                .mercadopagoOrderId(order.getPaymentId())
                .paymentStatus(order.getPaymentStatus())
                .orderStatus(order.getOrderStatus())
                .orderedItems(order.getMercadopagoOrderedItems())
                .build();
    }



    private OrderEntity convertToEntity(OrderRequest request) {
        return OrderEntity.builder()
                .userAddress(request.getUserAddress())
                .amount(request.getAmount())
                .mercadopagoOrderedItems(request.getOrderedItems())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .orderStatus("PENDING") // Definir status inicial
                .userId(userService.findByUserId())
                .build();
    }
    // daqui pra baixo
    @Override
    public void updateOrderPaymentStatus(String mercadopagoPaymentId, String action) {
        try {
            System.out.println("Atualizando status do pagamento: " + mercadopagoPaymentId + ", Action: " + action);

            // 1. Mapear a ação do Mercado Pago para seu status interno
            String internalStatus = mapMercadoPagoActionToStatus(action);

            // 2. Buscar o pedido pelo ID do Mercado Pago
            // Você precisa ter um campo 'mercadopagoPaymentId' na sua entidade Order
            OrderEntity order = orderRepository.findByMercadopagoPaymentId(mercadopagoPaymentId)
                    .orElseThrow(() -> new RuntimeException("Pedido não encontrado para o pagamento: " + mercadopagoPaymentId));

            // 3. Atualizar o status do pedido
            order.setStatus(internalStatus);
            order.setLastUpdate(new Date());

            // 4. Salvar no banco
            orderRepository.save(order);

            System.out.println("Status atualizado para: " + internalStatus + " no pedido: " + order.getId());

        } catch (Exception e) {
            System.err.println("Erro ao atualizar status do pagamento: " + e.getMessage());
            throw new RuntimeException("Falha ao atualizar status do pagamento", e);
        }
    }

    private String mapMercadoPagoActionToStatus(String action) {
        switch (action) {
            case "payment.created":
                return "AGUARDANDO_PAGAMENTO";
            case "payment.approved":
                return "PAGO";
            case "payment.cancelled":
                return "CANCELADO";
            case "payment.refunded":
                return "REEMBOLSADO";
            case "payment.charged_back":
                return "ESTORNADO";
            default:
                return "PENDENTE";




        }}

    // ✅ APENAS ESTE MÉTODO NOVO - criar preferência no Mercado Pago
    private String createMercadoPagoPreference(OrderEntity order) {
        try {
            // Configurar Mercado Pago
            MercadoPagoConfig.setAccessToken(mercadopagoToken);

            // Criar cliente de preferência
            PreferenceClient client = new PreferenceClient();

            // Criar item único (valor total do pedido)
            List<PreferenceItemRequest> items = new ArrayList<>();
            PreferenceItemRequest item = PreferenceItemRequest.builder()
                    .title("Pedido Food Land - " + order.getId())
                    .quantity(1)
                    .currencyId("BRL")
                    .unitPrice(BigDecimal.valueOf(order.getAmount()))
                    .build();
            items.add(item);

            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                    .success("http://localhost:5174/success")
                    .failure("http://localhost:5174/failure")
                    .pending("http://localhost:5174/pending")
                    .build();

            // Criar preferência
            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backUrls)
                    .externalReference(order.getId()) // Seu ID do pedido
                    .notificationUrl("https://seu-ngrok.ngrok.io/api/webhooks/mercadopago") // Webhook URL
                    .build();

            // Criar no Mercado Pago
            Preference preference = client.create(preferenceRequest);

            return preference.getId();

        } catch (Exception e) {
            System.err.println("❌ Erro ao criar preferência: " + e.getMessage());
            throw new RuntimeException("Falha ao criar pagamento", e);
        }
    }



}

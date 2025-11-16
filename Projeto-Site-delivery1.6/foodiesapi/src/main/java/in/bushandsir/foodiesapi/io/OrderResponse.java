package in.bushandsir.foodiesapi.io;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderResponse {
    private String id;
    private String userId;
    private String userAddress;
    private String phoneNumber;
    private String email;
    private double amount;
    private String paymentStatus;
    private String mercadopagoOrderId;
    private String orderStatus;
    private List<OrderItem> orderedItems;
    private String mercadopagoPreferenceId;

    /**
     * Retorna o status do pedido
     * Prioriza orderStatus, se não houver, retorna paymentStatus
     */
    public String getStatus() {
        if (orderStatus != null && !orderStatus.isEmpty()) {
            return orderStatus;
        }
        return paymentStatus;
    }

    /**
     * Retorna informação combinada de status
     */
    public String getFullStatus() {
        return String.format("Pedido: %s | Pagamento: %s",
                orderStatus != null ? orderStatus : "N/A",
                paymentStatus != null ? paymentStatus : "N/A"
        );
    }
}
package in.bushandsir.foodiesapi.entity;

import in.bushandsir.foodiesapi.io.OrderItem;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "orders")
@Data
@Builder
public class OrderEntity {
   @Id
   private String id;
   private String userId;
   private String userAddress;
   private String phoneNumber;
   private String email;
   private List<OrderItem> mercadopagoOrderedItems;
   private double amount;
   private String mercadopagoPaymentId;
   private String orderStatus;
   private String mercadopagoPreferenceId;

   private String status;
   private Date lastUpdate;

   // Campos do Mercado Pago
   private String paymentId;
   private String mercadopagoOrderId;
   private String paymentStatus;
   private String qrCode; // Para PIX
   private String externalReference;
   private String mercadopagoSignature;



}

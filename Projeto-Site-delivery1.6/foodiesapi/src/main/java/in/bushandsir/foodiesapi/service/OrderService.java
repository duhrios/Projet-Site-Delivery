package in.bushandsir.foodiesapi.service;

import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import in.bushandsir.foodiesapi.io.OrderRequest;
import in.bushandsir.foodiesapi.io.OrderResponse;

import java.util.List;
import java.util.Map;

public interface OrderService {

//   public OrderResponse createOrderWithPayment(OrderRequest request);
OrderResponse createOrderWithPayment(OrderRequest request) throws MPException, MPApiException;

  void verifyPayment(Map<String, String> paymentData, String status);

  List<OrderResponse> getUserOrders();

  void removeOrder(String orderId);

  List<OrderResponse> getOrdersOfAllUser();


 void updateOrderStatus(String orderId, String status);

 void updateOrderPaymentStatus(String mercadopagoPaymentId, String action);
}

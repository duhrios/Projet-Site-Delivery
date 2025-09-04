package in.bushandsir.foodiesapi.service;

import com.razorpay.RazorpayException;
import in.bushandsir.foodiesapi.io.OrderRequest;
import in.bushandsir.foodiesapi.io.OrderResponse;

public interface OrderService {

//   public OrderResponse createOrderWithPayment(OrderRequest request);
OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException;

}

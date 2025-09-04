package in.bushandsir.foodiesapi.service;


import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import in.bushandsir.foodiesapi.entity.OrderEntity;
import in.bushandsir.foodiesapi.io.OrderRequest;
import in.bushandsir.foodiesapi.io.OrderResponse;
import in.bushandsir.foodiesapi.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Value;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserService userService;

    @Value("${razorpay_key}")
    private String RAZORPAY_KEY;

    @Value("${razorpay_secret}")
    private String RAZORPAY_SECRET;

    @Override
    public OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException {

         OrderEntity newOrder = convertToEntity(request);
        newOrder = orderRepository.save(newOrder);

        //criar pedidos razorpay

        RazorpayClient razorpayClient = new RazorpayClient(RAZORPAY_KEY, RAZORPAY_SECRET);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount",newOrder.getAmount() * 100);
        orderRequest.put("currency", "BRL");
        orderRequest.put("payment_capture", 1);

       Order razorpayOrder = razorpayClient.orders.create(orderRequest);
       newOrder.setRazorpayOrderId(razorpayOrder.get("id"));
       String loggedInUserId = userService.findByUserId();
       newOrder.setUserId(loggedInUserId);
       newOrder = orderRepository.save(newOrder);
       return convertToResponse(newOrder);

    }

    private OrderResponse convertToResponse(OrderEntity newOrder) {
     return  OrderResponse.builder()
               .id(newOrder.getId())
               .amount(newOrder.getAmount())
               .userAddress(newOrder.getUserAddress())
               .userId(newOrder.getUserId())
               .razorpayOrderId(newOrder.getRazorpayOrderId())
               .paymentStatus(newOrder.getPaymentStatus())
               .orderStatus(newOrder.getOrderStatus())
               .email(newOrder.getEmail())
               .phoneNumber(newOrder.getPhoneNumber())
               .build();

    }

    private OrderEntity convertToEntity(OrderRequest request) {
      return  OrderEntity.builder()
                .userAddress(request.getUserAddress())
                .amount(request.getAmount())
                .orderedItems(request.getOrderedItems())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .orderStatus(request.getOrderStatus())
                .build();

    }

}

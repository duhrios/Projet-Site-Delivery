package in.bushandsir.foodiesapi.controller;

import com.razorpay.RazorpayException;
import in.bushandsir.foodiesapi.io.OrderRequest;
import in.bushandsir.foodiesapi.io.OrderResponse;
import in.bushandsir.foodiesapi.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;


    @PostMapping("/create")
     public OrderResponse createOrderWithPayment(@RequestBody OrderRequest request)throws RazorpayException {
        OrderResponse response = orderService.createOrderWithPayment(request);
        return response;
     }


}

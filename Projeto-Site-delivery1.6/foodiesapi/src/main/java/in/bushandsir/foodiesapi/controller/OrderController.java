package in.bushandsir.foodiesapi.controller;


import in.bushandsir.foodiesapi.io.OrderRequest;
import in.bushandsir.foodiesapi.io.OrderResponse;
import in.bushandsir.foodiesapi.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;


    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrderWithPayment(@RequestBody OrderRequest request)throws Exception {
        OrderResponse response = orderService.createOrderWithPayment(request);
        return response;
    }
    @PostMapping("/verify")
    public void verifyPayment(@RequestBody Map<String, String> paymentDta){
        orderService.verifyPayment(paymentDta, "Pago");

    }

    @GetMapping
    public List<OrderResponse> getOrders(){
        return orderService.getUserOrders();
    }


    @DeleteMapping("/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable String orderId) {
        orderService.removeOrder(orderId);
    }

    // admin panel
    @GetMapping("/all")
    public List<OrderResponse> getOrdersOfAllUsers() {
        return orderService.getOrdersOfAllUser();
    }

    // admin panel
    @PatchMapping("/status/{orderId}")
    public void updatedOrderStatus(@PathVariable String orderId, @RequestParam String status) {
        orderService.updateOrderStatus(orderId, status);
    }
}
package in.bushandsir.foodiesapi.controller;

import in.bushandsir.foodiesapi.io.CartRequest;
import in.bushandsir.foodiesapi.io.CartResponse;
import in.bushandsir.foodiesapi.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    public CartResponse addToCart(@RequestBody CartRequest request){

       String foodId = request.getFoodId();

       if(foodId == null || foodId.isEmpty()){

         throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID do prato não encontrado.");
       }
       return cartService.addToCart(request);

    }


       @GetMapping
       public CartResponse getCart(){
         return cartService.getCart();
       }


       @DeleteMapping
       @ResponseStatus(HttpStatus.NO_CONTENT)
       public void clearCart() {
           cartService.clearCart();
       }
     @PostMapping("/remove")
            public CartResponse removeFromCart(@RequestBody CartRequest request){
               String foodId = request.getFoodId();

               if(foodId == null || foodId.isEmpty()){

                   throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID do prato não encontrado.");
               }
             return  cartService.removeFromCart(request);
           }


            
       }


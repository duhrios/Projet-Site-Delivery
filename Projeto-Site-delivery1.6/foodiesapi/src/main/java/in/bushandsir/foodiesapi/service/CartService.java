package in.bushandsir.foodiesapi.service;

import in.bushandsir.foodiesapi.io.CartRequest;
import in.bushandsir.foodiesapi.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

  CartResponse  removeFromCart(CartRequest cartRequest);
}

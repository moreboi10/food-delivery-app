package in.sanketmore.delivery.app.api.service;


import in.sanketmore.delivery.app.api.io.CartRequest;
import in.sanketmore.delivery.app.api.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest request);

}

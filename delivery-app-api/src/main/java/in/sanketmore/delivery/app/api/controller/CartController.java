package in.sanketmore.delivery.app.api.controller;

import in.sanketmore.delivery.app.api.entity.CartEntity;
import in.sanketmore.delivery.app.api.io.CartRequest;
import in.sanketmore.delivery.app.api.io.CartResponse;
import in.sanketmore.delivery.app.api.repository.CartRepository;
import in.sanketmore.delivery.app.api.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("api/cart")
public class CartController {

    private  final CartService cartService;


    @PostMapping
    public CartResponse addToCart(@RequestBody CartRequest request){
        String foodId = request.getFoodId();
        if(foodId==null || foodId.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"foodId not found");
        }

        return cartService.addToCart(request);
    }

    @GetMapping
    public CartResponse getCart(){
        return cartService.getCart();
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void clearCart(){
         cartService.clearCart();
    }

    @PostMapping("/remove")
    public CartResponse removeFromCart(@RequestBody CartRequest request){
        String foodId = request.getFoodId();
        if(foodId==null || foodId.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"foodId not found");
        }
        return cartService.removeFromCart(request);
    }
}

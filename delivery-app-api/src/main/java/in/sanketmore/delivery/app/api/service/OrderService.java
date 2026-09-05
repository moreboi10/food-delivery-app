package in.sanketmore.delivery.app.api.service;


import com.razorpay.RazorpayException;
import in.sanketmore.delivery.app.api.io.OrderRequest;
import in.sanketmore.delivery.app.api.io.OrderResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


public interface OrderService {

    OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException;

    void verifyPayment(Map<String,String> paymentData , String status);

    List<OrderResponse> getUserOrders();

    void removeOrder(String orderId);

    List<OrderResponse> getOrdersOfAllUsers();

    void updateOrderStatus(String orderId,String status);
}

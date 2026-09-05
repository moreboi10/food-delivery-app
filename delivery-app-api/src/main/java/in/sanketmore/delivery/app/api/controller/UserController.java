package in.sanketmore.delivery.app.api.controller;


import in.sanketmore.delivery.app.api.io.UserRequest;
import in.sanketmore.delivery.app.api.io.UserResponse;
import in.sanketmore.delivery.app.api.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {

    final private UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest request) {
        UserResponse response = userService.registerUser(request);
        return response;
    }
}

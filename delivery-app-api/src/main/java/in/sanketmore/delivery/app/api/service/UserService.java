package in.sanketmore.delivery.app.api.service;

import in.sanketmore.delivery.app.api.io.UserRequest;
import in.sanketmore.delivery.app.api.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    String findByUserId();
}

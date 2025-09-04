package in.bushandsir.foodiesapi.service;

import in.bushandsir.foodiesapi.io.UserRequest;
import in.bushandsir.foodiesapi.io.UserResponse;

public interface UserService {

   UserResponse registerUser(UserRequest request);



   String findByUserId();
}

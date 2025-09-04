package in.bushandsir.foodiesapi.service;


import org.springframework.security.core.Authentication;

public interface AuthenticationFacade {

    Authentication getAuthentication();
}

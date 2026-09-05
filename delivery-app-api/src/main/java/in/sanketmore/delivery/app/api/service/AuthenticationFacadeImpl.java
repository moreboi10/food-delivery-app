package in.sanketmore.delivery.app.api.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class AuthenticationFacadeImpl implements AuthenticationFacade {


    @Override
    public Authentication getAuthentication() {
            return SecurityContextHolder.getContext().getAuthentication();
    }
}

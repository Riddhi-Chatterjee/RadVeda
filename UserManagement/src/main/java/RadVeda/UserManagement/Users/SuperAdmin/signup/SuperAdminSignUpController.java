package RadVeda.UserManagement.Users.SuperAdmin.signup;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.*;
import RadVeda.UserManagement.Users.SuperAdmin.events.SuperAdminSignUpCompleteEvent;
import RadVeda.UserManagement.Users.SuperAdmin.signup.token.SuperAdminVerificationToken;
import RadVeda.UserManagement.Users.SuperAdmin.signup.token.SuperAdminVerificationTokenRepository;
import RadVeda.UserManagement.Users.SuperAdmin.user.SuperAdmin;
import RadVeda.UserManagement.Users.SuperAdmin.user.SuperAdminService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/superadminSignUp")
public class SuperAdminSignUpController {

    private final SuperAdminService superadminService;
    private final ApplicationEventPublisher publisher;
    private final SuperAdminVerificationTokenRepository superadminTokenRepository;

    @PostMapping
    public String registerSuperAdmin(@RequestBody SuperAdminSignUpRequest signUpRequest,
            final HttpServletRequest request) {
        SuperAdmin superadmin = superadminService.registerSuperAdmin(signUpRequest);
        publisher.publishEvent(new SuperAdminSignUpCompleteEvent(superadmin, applicationUrl(request)));
        return "Success!! Please check your email to complete your registration";
    }

    @GetMapping("/verifyEmail")
    public String verifyEmail(@RequestParam("token") String token) {
        SuperAdminVerificationToken theToken = superadminTokenRepository.findByToken(token);
        if (theToken.getSuperadmin().isEnabled()) {
            return "This account has already been verified. Please login!";
        }
        String verificationResult = superadminService.validateToken(token);
        if (verificationResult.equalsIgnoreCase("success")) {
            return "Email verified successfully!! You can now login to your account.";
        }
        return "Please signUp again";
    }

    public String applicationUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }
}

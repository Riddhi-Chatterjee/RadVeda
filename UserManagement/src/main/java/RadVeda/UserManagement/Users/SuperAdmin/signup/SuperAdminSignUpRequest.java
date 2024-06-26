package RadVeda.UserManagement.Users.SuperAdmin.signup;

public record SuperAdminSignUpRequest(
                String firstName,
                String middleName,
                String lastName,
                String addressL1,
                String addressL2,
                String country,
                String state,
                String city,
                String email,
                String password,
                String phoneNumber,
                String orgName,
                String orgAddressL1,
                String orgAddressL2) {
}

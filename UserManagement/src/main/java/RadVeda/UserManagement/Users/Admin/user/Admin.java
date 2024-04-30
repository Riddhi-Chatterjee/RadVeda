package RadVeda.UserManagement.Users.Admin.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import RadVeda.UserManagement.Users.User.User;
import org.hibernate.annotations.NaturalId;

@Getter
@Setter
@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NaturalId
    @Column(unique = true, nullable = false)
    private String orgName;

    private String orgAddressL1;
    private String orgAddressL2;
    private boolean isEmailVerified = false;
    private boolean isAdminVerified = false;

    public Admin() {
        this.setRole("ADMIN");
    }

    public Admin(String firstName, String middleName, String lastName, String addressL1, String addressL2,
            String country, String state, String city, String email, String password, String phoneNumber, String role,
            boolean isEnabled, boolean emailVerified, boolean adminVerified, String orgName, String orgAddressL1, String orgAddressL2) {
        super(firstName, middleName, lastName, addressL1, addressL2, country, state, city, email, password, phoneNumber,
                role, isEnabled);
        this.orgName = orgName;
        this.orgAddressL1 = orgAddressL1;
        this.orgAddressL2 = orgAddressL2;
        this.isEmailVerified = emailVerified;
        this.isAdminVerified = adminVerified;
        this.setRole("ADMIN");
    }
}

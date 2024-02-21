package radveda.usermanagement.Users.SuperAdmin.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import radveda.usermanagement.Users.User.User;

@Getter
@Setter
@Entity
@DiscriminatorValue("SUPERADMIN")
public class SuperAdmin extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orgName;
    private String orgAddressL1;
    private String orgAddressL2;

    public SuperAdmin() {
        this.setRole("SUPERADMIN");
    }

    public SuperAdmin(String firstName, String middleName, String lastName, String addressL1, String addressL2, String country, String state, String city, String email, String password, String phoneNumber, String role, boolean isEnabled, String orgName, String orgAddressL1, String orgAddressL2) {
        super(firstName, middleName, lastName, addressL1, addressL2, country, state, city, email, password, phoneNumber, role, isEnabled);
        this.orgName = orgName;
        this.orgAddressL1 = orgAddressL1;
        this.orgAddressL2 = orgAddressL2;
        this.setRole("SUPERADMIN");
    }
}
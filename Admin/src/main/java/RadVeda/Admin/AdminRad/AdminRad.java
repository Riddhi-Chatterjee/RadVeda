package RadVeda.Admin.AdminRad;

import RadVeda.Admin.Admin.Admin;
import RadVeda.Admin.StorageEncryption.Converters.EncryptedLongConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@DiscriminatorValue("AdminDB")
public class AdminRad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "Admin_ID", referencedColumnName = "id")
    private Admin admin;

    @Convert(converter = EncryptedLongConverter.class)
    private Long radId;
}

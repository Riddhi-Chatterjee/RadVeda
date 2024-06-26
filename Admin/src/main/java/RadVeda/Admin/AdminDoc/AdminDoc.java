//package RadVeda.Admin.AdminDoc;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//import RadVeda.Admin.Admin.Admin;
//
//@Getter
//@Setter
//@Entity
//@DiscriminatorValue("AdminDB")
//public class AdminDoc {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long Id;
//
//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "Admin_ID", referencedColumnName = "Id")
//    private Admin Admin;
//
//    private Long Doc_Id;
//}

package RadVeda.Admin.AdminDoc;

import RadVeda.Admin.Admin.Admin;
import RadVeda.Admin.StorageEncryption.Converters.EncryptedLongConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@DiscriminatorValue("AdminDB")
public class AdminDoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "adminId", referencedColumnName = "id", nullable = false)
    private Admin admin;

    @Column(nullable = false)
    @Convert(converter = EncryptedLongConverter.class)
    private Long docId;
}

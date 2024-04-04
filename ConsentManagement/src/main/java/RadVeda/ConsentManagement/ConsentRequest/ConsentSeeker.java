package RadVeda.ConsentManagement.ConsentRequest;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ConsentSeeker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String consentSeekerType;
    private Long consentSeekerId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "consentRequestId", referencedColumnName = "id")
    private ConsentRequest consentRequest;
}

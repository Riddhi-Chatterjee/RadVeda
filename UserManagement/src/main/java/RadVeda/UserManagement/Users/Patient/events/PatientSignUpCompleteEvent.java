package RadVeda.UserManagement.Users.Patient.events;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;
import RadVeda.UserManagement.Users.Patient.user.Patient;

@Getter
@Setter
public class PatientSignUpCompleteEvent extends ApplicationEvent {
    private Patient patient;
    private String applicationUrl;

    public PatientSignUpCompleteEvent(Patient patient, String applicationUrl) {
        super(patient);
        this.patient = patient;
        this.applicationUrl = applicationUrl;
    }
}

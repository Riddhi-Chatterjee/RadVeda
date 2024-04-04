package RadVeda.ConsentManagement.ConsentRequest;

import RadVeda.ConsentManagement.StringListDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.List;

//consentSeekerType<delimiter>consentSeekerId
public record ConsentRequestForm(
        String consentProviderType,
        Long consentProviderId,
        Long testId,
        String message,
        @JsonDeserialize(using = StringListDeserializer.class)
        List<String> consentSeekers) {
}

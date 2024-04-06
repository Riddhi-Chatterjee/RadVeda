package RadVeda.ConsentManagement.ConsentProviders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DoctorProviderRepository extends JpaRepository<DoctorProvider, Long> {
    @Query(value = "SELECT dp.testId FROM DoctorProvider dp WHERE dp.consentProviderId = :consentProviderId AND dp.notesAllowed = false", nativeQuery = true)
    List<Long> findTestIdsByConsentProviderIdAndNotesAllowedIsFalse(Long consentProviderId);
}
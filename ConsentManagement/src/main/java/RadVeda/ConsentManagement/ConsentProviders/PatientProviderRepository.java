package RadVeda.ConsentManagement.ConsentProviders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientProviderRepository extends JpaRepository<PatientProvider, Long> {
    @Query(value = "SELECT pp.test_id FROM patient_provider pp WHERE pp.consent_provider_id = :consentProviderId AND pp.consent_seeker_type = :consentSeekerType AND pp.consent_seeker_id = :consentSeekerId AND (pp.images_allowed = :status OR pp.report_allowed = :status)", nativeQuery = true)
    List<Long> findTestIdsWithSomeConsentedResources(String consentSeekerType, String consentSeekerId, String consentProviderId, String status);

    Optional<PatientProvider> findByConsentSeekerTypeAndConsentSeekerIdAndConsentProviderIdAndTestId(String consentSeekerType, Long consentSeekerId, Long consentProviderId, Long testId);

    @Transactional
    @Modifying
    void deleteByConsentSeekerTypeAndConsentSeekerId(String consentSeekerType, String consentSeekerId);

    @Transactional
    @Modifying
    void deleteByConsentProviderId(String consentProviderId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE patient_provider p SET p.images_allowed = :imagesAllowed, p.report_allowed = :reportAllowed " +
            "WHERE p.consent_seeker_type = :consentSeekerType " +
            "AND p.consent_seeker_id = :consentSeekerId " +
            "AND p.consent_provider_id = :consentProviderId " +
            "AND p.test_id = :testId", nativeQuery = true)
    int updateIfExists(String consentSeekerType,
                        String consentSeekerId,
                        String consentProviderId,
                        String testId,
                        String imagesAllowed,
                        String reportAllowed);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO patient_provider (consent_seeker_type, consent_seeker_id, consent_provider_id, test_id, images_allowed, report_allowed) " +
            "VALUES (:consentSeekerType, :consentSeekerId, :consentProviderId, :testId, :imagesAllowed, :reportAllowed)", nativeQuery = true)
    void insertEntry(String consentSeekerType,
                           String consentSeekerId,
                           String consentProviderId,
                           String testId,
                           String imagesAllowed,
                           String reportAllowed);

}

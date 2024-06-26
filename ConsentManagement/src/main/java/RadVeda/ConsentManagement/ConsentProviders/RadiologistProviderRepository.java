package RadVeda.ConsentManagement.ConsentProviders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;
import java.util.Optional;

@Repository
public interface RadiologistProviderRepository extends JpaRepository<RadiologistProvider, Long> {
    @Query(value = "SELECT rp.test_id FROM radiologist_provider rp WHERE rp.consent_provider_id = :consentProviderId AND rp.consent_seeker_type = :consentSeekerType AND rp.consent_seeker_id = :consentSeekerId AND (rp.annotations_allowed = :status OR rp.notes_allowed = :status)", nativeQuery = true)
    List<Long> findTestIdsWithSomeConsentedResources(String consentSeekerType, String consentSeekerId, String consentProviderId, String status);

    Optional<RadiologistProvider> findByConsentSeekerTypeAndConsentSeekerIdAndConsentProviderIdAndTestId(String consentSeekerType, Long consentSeekerId, Long consentProviderId, Long testId);

    @Transactional
    @Modifying
    void deleteByConsentSeekerTypeAndConsentSeekerId(String consentSeekerType, String consentSeekerId);

    @Transactional
    @Modifying
    void deleteByConsentProviderId(String consentProviderId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE radiologist_provider r SET r.annotations_allowed = :annotationsAllowed, r.notes_allowed = :notesAllowed " +
            "WHERE r.consent_seeker_type = :consentSeekerType " +
            "AND r.consent_seeker_id = :consentSeekerId " +
            "AND r.consent_provider_id = :consentProviderId " +
            "AND r.test_id = :testId", nativeQuery = true)
    int updateIfExists(String consentSeekerType,
                        String consentSeekerId,
                        String consentProviderId,
                        String testId,
                        String annotationsAllowed,
                        String notesAllowed);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO radiologist_provider (consent_seeker_type, consent_seeker_id, consent_provider_id, test_id, annotations_allowed, notes_allowed) " +
            "VALUES (:consentSeekerType, :consentSeekerId, :consentProviderId, :testId, :annotationsAllowed, :notesAllowed)", nativeQuery = true)
    void insertEntry(String consentSeekerType,
                           String consentSeekerId,
                           String consentProviderId,
                           String testId,
                           String annotationsAllowed,
                           String notesAllowed);

}

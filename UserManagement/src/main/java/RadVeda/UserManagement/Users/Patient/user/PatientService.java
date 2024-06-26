package RadVeda.UserManagement.Users.Patient.user;

import RadVeda.UserManagement.Users.Doctor.signup.DoctorServiceRequest;
import RadVeda.UserManagement.Users.LabStaff.user.LabStaff;
import RadVeda.UserManagement.Users.Patient.signup.PatientServiceRequest;
import RadVeda.UserManagement.Users.Patient.signup.PatientSignUpRequest;
import RadVeda.UserManagement.Users.Patient.signup.token.PatientGuardianVerificationTokenRepository;
import RadVeda.UserManagement.Users.Patient.signup.token.PatientGuardianVerificationToken;
import RadVeda.UserManagement.Users.Patient.signup.token.PatientVerificationToken;
import RadVeda.UserManagement.Users.Patient.signup.token.PatientVerificationTokenRepository;
import RadVeda.UserManagement.Users.Patient.signup.PatientServiceRequest;
import RadVeda.UserManagement.exception.UserAlreadyExistsException;
import RadVeda.UserManagement.security.transitEncryption.EncryptionManager;
import RadVeda.UserManagement.security.transitEncryption.EncryptionRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PatientService implements PatientServiceInterface {
    private final PatientRepository patientRepository;
    private final PatientDocumentsRepository patientdocumentsrepository;
    private final PatientGuardianDocumentsRepository patientguardiandocumentsrepository;
    private final PatientGuardianRepository patientGuardianRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final PatientVerificationTokenRepository patientTokenRepository;
    private final PatientGuardianVerificationTokenRepository patientGuardianTokenRepository;
    private final EncryptionRepository encryptionRepository;

    @Override
    public List<Patient> getPatients() {
        return patientRepository.findAll();
    }

    @Override
    public void cleanUp() {
        List<Patient> allPatients = getPatients();

        for (Patient patient : allPatients) {
            if (!patient.isEnabled()) {
                PatientGuardian patientGuardian = patient.getPatientguardian();
                if(patientGuardian == null) {
                    PatientVerificationToken token = patientTokenRepository.findByPatient_id(patient.getId());
                    Calendar calendar = Calendar.getInstance();
                    if(token == null){          // deleting row if patientid exists in patient table but not in the token table
                        patientdocumentsrepository.delete(patient.getId());
                        patientRepository.delete(patient);            
                    }
                    else if ((token.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {
                        ResponseEntity<String> responseEntity;
                        HttpHeaders headers = new HttpHeaders();
                        RestTemplate restTemplate = new RestTemplate();
                        responseEntity = restTemplate.exchange("http://localhost:9198/patient/" + patient.getId().toString() + "/deletePatient", HttpMethod.DELETE ,new HttpEntity<>(headers), String.class);
                        if (token != null) {
                            patientTokenRepository.delete(token);
                        }
                        if (patient.getId() != null) {
                            patientdocumentsrepository.delete(patient.getId()); // deleting documents uploaded
                        }
                        if (patient != null) {
                            patientRepository.delete(patient);
                        }
                    }
                }
                else
                {
                    // TODO: delete from documents repository as well
                    PatientVerificationToken patientToken = patientTokenRepository.findByPatient_id(patient.getId());
                    PatientGuardianVerificationToken patientGuardianToken = patientGuardianTokenRepository.findByPatientguardian_id(patientGuardian.getId());
                    Calendar calendar = Calendar.getInstance();

                    if (((!patient.isEmailVerified() && patientToken == null)
                            || (!patientGuardian.isEmailVerified() && patientGuardianToken == null))
                            || (patientToken.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0
                            || (patientGuardianToken.getExpirationTime().getTime()
                                    - calendar.getTime().getTime()) <= 0)
                    {
                        ResponseEntity<String> responseEntity;
                        HttpHeaders headers = new HttpHeaders();
                        RestTemplate restTemplate = new RestTemplate();
                        responseEntity = restTemplate.exchange("http://localhost:9198/patient/" + patient.getId().toString() + "/deletePatient", HttpMethod.DELETE ,new HttpEntity<>(headers), String.class);

                        if (patientToken != null) {
                            patientTokenRepository.delete(patientToken);
                        }

                        if (patientGuardianToken != null) {
                            patientGuardianTokenRepository.delete(patientGuardianToken);
                        }

                        if (patient.getId() != null) {
                            patientdocumentsrepository.delete(patient.getId());
                        }

                        if (patientGuardian.getId() != null) {
                            patientguardiandocumentsrepository.delete(patientGuardian.getId());
                        }

                        if (patient != null) {
                            patientRepository.delete(patient);
                        }

                        if (patientGuardian != null) {
                            patientGuardianRepository.delete(patientGuardian);
                        }

                    }
                }
            }
        }
    }

    @Override
    public Patient registerPatient(PatientSignUpRequest request) {
        cleanUp(); // Cleaning up the Patient and PatientVerificationToken tables before a new signup

        EncryptionManager encryptionManager = new EncryptionManager("patient", encryptionRepository);


        Optional<Patient> patient = this.findByEmail(request.email());
        if (patient.isPresent()) {
            throw new UserAlreadyExistsException(
                    "Patient with email " + request.email() + " already exists");
        }

        var newPatient = new Patient();
        newPatient.setFirstName(request.firstName());
        newPatient.setMiddleName(request.middleName());
        newPatient.setLastName(request.lastName());
        newPatient.setAddressL1(request.addressL1());
        newPatient.setAddressL2(request.addressL2());
        newPatient.setCountry(request.country());
        newPatient.setState(request.state());
        newPatient.setCity(request.city());
        newPatient.setEmail(request.email());

        String encodedPassword = passwordEncoder.encode(request.password());
        newPatient.setPassword(encodedPassword);

        newPatient.setPhoneNumber(request.phoneNumber());
        newPatient.setDOB(request.DOB());
        newPatient.setRace(request.race());
        newPatient.setEthnicity(request.ethnicity());
        newPatient.setGender(request.gender());
        newPatient.setMaritalStatus(request.maritalStatus());
        // for( int i = 0; i < request.Documents().length; i++){
        //     var newDocument = new PatientDocuments();
        //     newDocument.setDocuments(request.Documents()[i]);
        //     newDocument.setPatient(newPatient);
        // }
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();
        headers.setContentType(MediaType.APPLICATION_JSON);

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody = "";
        PatientServiceRequest req = new PatientServiceRequest(request.firstName(), request.lastName(), request.email(), request.gender());
        
        try {
            ObjectMapper objectmapper = new ObjectMapper();
            requestBody = objectmapper.writeValueAsString(req);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        try {
            requestBody = encryptionManager.encryptMessage(requestBody);
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        ResponseEntity<String> responseEntity;

        responseEntity = restTemplate.exchange("http://localhost:9198/patient/UMS/addPatient", HttpMethod.POST ,new HttpEntity<>(requestBody, headers), String.class);
        for (String document : request.Documents()){
            var newDocument = new PatientDocuments();
            newDocument.setDocuments(document);
            newDocument.setPatient(newPatient); 
            patientdocumentsrepository.save(newDocument);
        }

        var newPatientGuardian = new PatientGuardian();
        if(request.guardianEmail() == null) //Patient doesn't need a guardian
        {
            newPatientGuardian = null;
            newPatient.setPatientguardian(newPatientGuardian);
        }
        else //Patient needs a guardian
        {
            newPatientGuardian.setFirstName(request.guardianFirstName());
            newPatientGuardian.setMiddleName(request.guardianMiddleName());
            newPatientGuardian.setLastName(request.guardianLastName());
            newPatientGuardian.setAddressL1(request.guardianAddressL1());
            newPatientGuardian.setAddressL2(request.guardianAddressL2());
            newPatientGuardian.setCountry(request.guardianCountry());
            newPatientGuardian.setState(request.guardianState());
            newPatientGuardian.setCity(request.guardianCity());
            newPatientGuardian.setEmail(request.guardianEmail());
            newPatientGuardian.setDOB(request.guardianDOB());
            newPatientGuardian.setGender(request.guardianGender());
            newPatientGuardian.setRelationshipToPatient(request.guardianRelationshipToPatient());
            newPatientGuardian.setPhoneNumber(request.guardianPhoneNumber());
            for (String document : request.Documents()){
                var newDocument = new PatientGuardianDocuments();
                newDocument.setDocuments(document);
                newDocument.setPatientguardian(newPatientGuardian); 
                patientguardiandocumentsrepository.save(newDocument);
            }

            newPatient.setPatientguardian(patientGuardianRepository.save(newPatientGuardian));
        }

        return patientRepository.save(newPatient);
    }

    @Override
    public Optional<Patient> findByEmail(String email) {
        return patientRepository.findByEmail(email);
    }

    @Override
    public void savePatientVerificationToken(Patient thePatient, String token) {
        var verificationToken = new PatientVerificationToken(token, thePatient);
        patientTokenRepository.save(verificationToken);
    }

    @Override
    public void savePatientGuardianVerificationToken(PatientGuardian thePatientGuardian, String token) {
        var verificationToken = new PatientGuardianVerificationToken(token, thePatientGuardian);
        patientGuardianTokenRepository.save(verificationToken);
    }

    @Override
    public String validatePatientToken(String theToken) {
        PatientVerificationToken token = patientTokenRepository.findByToken(theToken);
        if (token == null) {
            return "Invalid verification token";
        }
        Patient patient = token.getPatient();
        PatientGuardian patientGuardian = patient.getPatientguardian();
        Calendar calendar = Calendar.getInstance();
        if ((token.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {
            patientTokenRepository.delete(token);
            patientdocumentsrepository.delete(patient.getId());
            if(patientGuardian != null)
            {
                PatientGuardianVerificationToken patientGuardianToken = patientGuardianTokenRepository.findByPatientguardian_id(patientGuardian.getId());
                ResponseEntity<String> responseEntity;
                HttpHeaders headers = new HttpHeaders();
                RestTemplate restTemplate = new RestTemplate();
                responseEntity = restTemplate.exchange("http://localhost:9198/patient/" + patient.getId().toString() + "/deletePatient", HttpMethod.DELETE ,new HttpEntity<>(headers), String.class);
                patientGuardianTokenRepository.delete(patientGuardianToken);
                patientguardiandocumentsrepository.delete(patientGuardian.getId());
                patientGuardianRepository.delete(patientGuardian);
            }
            patientRepository.delete(patient);
            return "Token already expired";
        }
        patient.setEmailVerified(true);
        boolean enabledFlag = true;
        if(patientGuardian != null && !patientGuardian.isEmailVerified())
        {
            enabledFlag = false;
        }
        if(enabledFlag)
        {
            patient.setEnabled(true);
        }
        patientRepository.save(patient);
        return "valid";
    }

    @Override
    public String validatePatientGuardianToken(String theToken) {
        PatientGuardianVerificationToken token = patientGuardianTokenRepository.findByToken(theToken);
        if (token == null) {
            return "Invalid verification token";
        }
        PatientGuardian patientGuardian = token.getPatientguardian();
        Patient patient = patientRepository.findByPatientguardian_id(patientGuardian.getId()).get();
        Calendar calendar = Calendar.getInstance();
        if ((token.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {
            ResponseEntity<String> responseEntity;
            HttpHeaders headers = new HttpHeaders();
            RestTemplate restTemplate = new RestTemplate();
            responseEntity = restTemplate.exchange("http://localhost:9198/patient/" + patient.getId().toString() + "/deletePatient", HttpMethod.DELETE ,new HttpEntity<>(headers), String.class);
            patientGuardianTokenRepository.delete(token);
            PatientVerificationToken patientToken = patientTokenRepository.findByPatient_id(patient.getId());
            patientTokenRepository.delete(patientToken);
            patientdocumentsrepository.delete(patient.getId());
            patientguardiandocumentsrepository.delete(patientGuardian.getId());
            patientGuardianRepository.delete(patientGuardian);
            patientRepository.delete(patient);
            return "Token already expired";
        }
        patientGuardian.setEmailVerified(true);
        if(patient.isEmailVerified() && patientGuardian.isEmailVerified())
        {
            patient.setEnabled(true);
            patientRepository.save(patient);
        }
        patientGuardianRepository.save(patientGuardian);
        return "valid";
    }

    @Override
    public Optional<Patient> findById(Long id) {
        return patientRepository.findById(id);
    }
}

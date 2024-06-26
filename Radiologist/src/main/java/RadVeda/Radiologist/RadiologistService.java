package RadVeda.Radiologist;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import RadVeda.Radiologist.RadiologistServiceInterface;
import RadVeda.Radiologist.radiologists.*;
import RadVeda.Radiologist.exception.UserNotFoundException;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
import java.util.Random;
import java.time.LocalDate;
import java.util.Date;
import java.time.ZoneId;

import RadVeda.Radiologist.StorageEncryption.EncryptionUtility;
import RadVeda.Radiologist.NotesRequest;

@Service
@RequiredArgsConstructor
public class RadiologistService implements RadiologistServiceInterface {
    private final RadiologistRepository radiologistrepository;
    private final RadiologistTestsRepository radiologisttestsrepository;
    private final ConsultedRadiologistTestsRepository consultedradiologisttestsrepository;
    // private final SuperAdminVerificationTokenRepository superadminTokenRepository;

    @Override
    public User authenticate(String authorizationHeader)
    {
        String jwtToken = "";

        // Checking if the Authorization header is present and not empty
        if (authorizationHeader != null && !authorizationHeader.isEmpty())
        {
            // Extracting JWT bearer token
            jwtToken = authorizationHeader.replace("Bearer ", "");
        }
        else
        {
            // Handling the case where the Authorization header is missing or empty
            return null;
        }

        RestTemplate restTemplate = new RestTemplate();

        // Setting up the request headers with the JWT token
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwtToken);

        List<String> userTypes = new ArrayList<>();
        userTypes.add("ADMIN");
        userTypes.add("DOCTOR");
        userTypes.add("LABSTAFF");
        userTypes.add("PATIENT");
        userTypes.add("RADIOLOGIST");
        userTypes.add("SUPERADMIN");

        List<String> authUrls = new ArrayList<>();
        authUrls.add("http://localhost:9191/admins/profile");
        authUrls.add("http://localhost:9191/doctors/profile");
        authUrls.add("http://localhost:9191/labstaffs/profile");
        authUrls.add("http://localhost:9191/patients/profile");
        authUrls.add("http://localhost:9191/radiologists/profile");
        authUrls.add("http://localhost:9191/superadmins/profile");

        User currentUser = null;

        for(int i=0;i<userTypes.size();i++)
        {
       
            // Sending a GET request to the user management service with the JWT token in the headers
            ResponseEntity<String> responseEntity;
            try{
            responseEntity = restTemplate.exchange(authUrls.get(i), HttpMethod.GET, new HttpEntity<>(headers), String.class);
            } catch (HttpClientErrorException.Forbidden ex){
                continue;
            }
            // Checking if the response status is OK (200)
            if (responseEntity.getStatusCode() == HttpStatus.OK)
            {
                // Creating a new User object
                User user = new User();
                user.setType(userTypes.get(i));

                // Extracting user profile JSON from the response body
                String userProfileJson = responseEntity.getBody();

                // Parsing JSON using Jackson ObjectMapper
                ObjectMapper objectMapper = new ObjectMapper();
                try {
                    // Reading JSON as a tree
                    JsonNode rootNode = objectMapper.readTree(userProfileJson);

                    // Extracting user ID from the JSON
                    Long userId = rootNode.path("id").asLong();
                    user.setId(userId);
                    currentUser = user;
                    break;
                } catch (JsonProcessingException e) {
                    return null;
                }

            }
        }

        return currentUser;

    }
    
    @Override
    public RadiologistTests prescribeTest(RadiologistTestRequest request) throws UserNotFoundException{
        Long radiologistid = request.radiologistID();
        Optional<Radiologist> radiologist = getRadiologist(radiologistid);
        Radiologist newRad = radiologist.orElseThrow(() -> new UserNotFoundException("Radiologist not found"));
        var test = new RadiologistTests();
        test.setRadiologist(newRad);
        test.setTestid(request.testID());
        return radiologisttestsrepository.save(test);
         
    }

    @Override
    public Optional<Radiologist> getRadiologist(Long radiologistid){
        return radiologistrepository.findById(radiologistid);
    }

    @Override
    public List<Long> availableRadiologists() {
        return radiologistrepository.availableLabStaff(EncryptionUtility.encrypt(true));
    }

    @Override
    public Radiologist addRadiologist(RadiologistSignUpRequest request){
        var newRad = new Radiologist();
        newRad.setFirstName(request.firstName());
        newRad.setMiddleName(request.middleName());
        newRad.setLastName(request.lastName());
        newRad.setAddressL1(request.addressL1());
        newRad.setAddressL2(request.addressL2());
        newRad.setCountry(request.country());
        newRad.setState(request.state());
        newRad.setCity(request.city());
        newRad.setEmail(request.email());
        newRad.setOrgName(request.orgName());
        newRad.setOrgAddressL1(request.orgAddressL1());
        newRad.setOrgAddressL2(request.orgAddressL2());
        return radiologistrepository.save(newRad);
    }


    @Override
    public void deleteRadiologist(Long radiologistID){
        radiologistrepository.delete(radiologistID);
        return;
    }

    @Override
    public RadiologistTests addNotes(Long id, NotesRequest notes){
        RadiologistTests test = radiologisttestsrepository.gettestbyid(EncryptionUtility.encrypt(id)).orElseThrow(() -> new EntityNotFoundException("Test not found"));
        test.setRadiologistNotes(notes.notes());
        return radiologisttestsrepository.save(test);
    } 

    @Override
    public String getNotes(Long testID){
        RadiologistTests test = radiologisttestsrepository.gettestbyid(EncryptionUtility.encrypt(testID)).orElseThrow(() -> new EntityNotFoundException("Test not found"));
        return test.getRadiologistNotes();
    }

    @Override
    public void deleteTest(Long testID){
        radiologisttestsrepository.deleteTest(EncryptionUtility.encrypt(testID));
        return;
    }

    @Override
    public List<ConsultedRadiologistTests> getConsultedTests(Long radiologistID){
        return consultedradiologisttestsrepository.getConsultedTests(radiologistID);
    }

    @Override
    public List<ConsultedRadiologistTests> getConsultedRadiologists(Long testID){
        return consultedradiologisttestsrepository.getConsultedRadiologists(EncryptionUtility.encrypt(testID));
    }

    @Override
    public void assignRadiologist(String authHeader, Long patId, Long testId) {
        List<Long> availableRads = radiologistrepository.availableLabStaff(EncryptionUtility.encrypt(true));

        Random random = new Random();
        int index = random.nextInt(availableRads.size());
        Long chosenRad = availableRads.get(index);

        List<String> consentSeekers = new ArrayList<>();
        consentSeekers.add("RADIOLOGIST:_:"+chosenRad);

        StringBuilder message = new StringBuilder();
        message.append("Radiologist ");

        Optional<Radiologist> radRec = getRadiologist(chosenRad);
        Radiologist rad = radRec.orElseThrow();

        message.append(rad.getFirstName()).append(" is requesting consent for Test ");
        message.append(testId);

        ConsentRequestForm form = new ConsentRequestForm(
                "PATIENT",
                patId, testId,
                message.toString(),
                consentSeekers
        );

        String requestBody = "";

        String jwtToken = authHeader.replace("Bearer ", "");
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + jwtToken);
        ResponseEntity<String> responseEntity = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        try {
            ObjectMapper objectmapper = new ObjectMapper();
            requestBody = objectmapper.writeValueAsString(form);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        try {
            responseEntity = restTemplate.exchange("http://localhost:9202/consent/sendConsentRequest",
                    HttpMethod.POST, new HttpEntity<>(requestBody, headers), String.class);
        } catch (RuntimeException e) {
            throw new UserNotFoundException("Unable to obtain consent");
        }


    }
}

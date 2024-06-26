package RadVeda.Doctor;

import java.util.List;

import RadVeda.Doctor.transitEncryption.EncryptionService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import RadVeda.Doctor.doctors.DoctorSignUpRequest;
import RadVeda.Doctor.doctors.DoctorTestRequest;
import RadVeda.Doctor.exception.InvalidInputFormatException;
import RadVeda.Doctor.exception.UserNotFoundException;
import RadVeda.Doctor.exception.UnauthorisedUserException;
// import RadVeda.TestManagement.security.UserManagementDetailsService;

import java.util.Optional;

import javax.print.Doc;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import RadVeda.Doctor.ReportRequest;



@RestController
@RequiredArgsConstructor
@RequestMapping("/doctor")
public class DoctorController {
    private final DoctorService doctorService;
    private final EncryptionService encryptionService;

    @PostMapping("{service}/dummy/{data}")
    public void Dummy(@PathVariable String service, @PathVariable String data, final HttpServletRequest request) {
        try {
            String res = encryptionService.decryptMessage(data, service);
            System.out.println(res);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:9191")
    @PostMapping("/addDoctor")
    public String addDoctor(@RequestBody DoctorSignUpRequest request) {
        doctorService.addDoctor(request);
        return "Success";
    }

    @CrossOrigin(origins = "http://localhost:9191")
    @PostMapping("/updateDoctor/{id}")
    public String updateAdmin(@RequestBody DoctorSignUpRequest doctorSignUpRequest, final HttpServletRequest request,
                              @PathVariable Long id)  throws UnauthorisedUserException{
        doctorService.updateDoctor(doctorSignUpRequest, id);
        return "Success";
    }

    @CrossOrigin(origins = "http://localhost:9192")
    @PostMapping("/prescribe-test")
    public String prescribeTest(@RequestHeader(value = "Authorization", required = false) String authorizationHeader, @RequestBody DoctorTestRequest request)
        throws UnauthorisedUserException {
    
        User user = doctorService.authenticate(authorizationHeader);

        if(user == null) {
            throw new UnauthorisedUserException("Invalid User!");
        }
        doctorService.prescribeTest(request);

        return "Success!! Test has been prescribed";
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{doctorID}/getDoctor")
    public Doctor getDoctor(@RequestHeader(value = "Authorization", required = false) String authorizationHeader, @PathVariable Long doctorID)
            throws UnauthorisedUserException, UserNotFoundException{
        User currentuser = doctorService.authenticate(authorizationHeader);
        if(currentuser == null)
        {
            throw new UnauthorisedUserException("Permission denied!");
        }
        Optional<Doctor> doctor = doctorService.getDoctor(doctorID);
        if(doctor.isEmpty()){
            throw new UserNotFoundException("Unable to fetch test details");
        }
        return doctor.get();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}/addNotes")
    public String addNotes(@PathVariable Long id, @RequestBody NotesRequest notes){
        doctorService.addNotes(id, notes);
        return "Notes successfully updated";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}/getNotes")
    public String getNotes(@RequestHeader(value = "Authorization", required = false) String authorizationHeader, @PathVariable Long id){
        User currentuser = doctorService.authenticate(authorizationHeader);
        if(currentuser == null)
        {
            throw new UnauthorisedUserException("Permission denied!");
        }
        return doctorService.getNotes(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}/addReport")
    public String addNotes(@PathVariable Long id, @RequestBody ReportRequest report){
        doctorService.addReport(id, report);
        return "Report successfully updated";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}/getReport")
    public String getReport(@RequestHeader(value = "Authorization", required = false) String authorizationHeader, @PathVariable Long id){
        User currentuser = doctorService.authenticate(authorizationHeader);
        if(currentuser == null)
        {
            throw new UnauthorisedUserException("Permission denied!");
        }
        return doctorService.getReport(id);
    }

    @CrossOrigin(origins = "http://localhost:9191")
    @DeleteMapping("/deleteDoctor/{id}")
    public String deleteDoctor(@PathVariable Long id)
    {
        doctorService.deleteDoctor(id);
        return "Doctor successfully deleted";
    }
    
    @CrossOrigin(origins = "http://localhost:9192")
    @DeleteMapping("/deleteTest/{testID}")
    public String deleteTest(@RequestHeader(value = "Authorization", required = false) String authorizationHeader, @PathVariable Long testID){

        User user = doctorService.authenticate(authorizationHeader);

        if(user == null) {
            throw new UnauthorisedUserException("Invalid User!");
        }
        doctorService.deleteTest(testID);
        return "Test successfully deleted";
    }

    @CrossOrigin(origins = "http://localhost:9192")
    @GetMapping("/getConsultedTests/{doctorID}")
    public List<ConsultedDoctorTests> getConsultedTests(@RequestHeader(value = "Authorization", required = false) String authorizationHeader, @PathVariable Long doctorID){
        User user = doctorService.authenticate(authorizationHeader);

        if(user == null) {
            throw new UnauthorisedUserException("Invalid User!");
        }
        return doctorService.getConsultedTests(doctorID);        
    }


    @CrossOrigin(origins = "http://localhost:9192")
    @GetMapping("/getConsultedDoctors/{testID}")
    public List<ConsultedDoctorTests> getConsultedDoctors(@RequestHeader(value = "Authorization", required = false) String authorizationHeader, @PathVariable Long testID){
        User user = doctorService.authenticate(authorizationHeader);

        if(user == null) {
            throw new UnauthorisedUserException("Invalid User!");
        }
        return doctorService.getConsultedDoctors(testID);        
    }

}


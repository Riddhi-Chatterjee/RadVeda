package RadVeda.UserManagement.Users.LabStaff.user;

import RadVeda.UserManagement.Users.Admin.user.Admin;
import RadVeda.UserManagement.Users.Doctor.user.Doctor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import RadVeda.UserManagement.exception.InvalidInputFormatException;
import RadVeda.UserManagement.exception.UserNotFoundException;
import RadVeda.UserManagement.security.UserManagementDetailsService;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:9193", "http://localhost:9192", "http://localhost:9194", "http://localhost:9195", "http://localhost:9196", "http://localhost:9197", "http://localhost:9198", "http://localhost:9199", "http://localhost:9200", "http://localhost:9201", "http://localhost:9202"})
@RequestMapping("/labstaffs")
public class LabStaffController {
    private final LabStaffService labStaffService;
    private static String delimiter = ":_:";

    @GetMapping("/profile")
    public LabStaff getProfile(@AuthenticationPrincipal UserDetails userDetails)
            throws InvalidInputFormatException, UserNotFoundException {
        String roleEmail = userDetails.getUsername();

        // Splitting the string based on the leftmost occurrence of the delimiter
        String[] parts = roleEmail.split(UserManagementDetailsService.getDelimiter(), 2);

        String email = "";

        if (parts.length == 2) {
            email = parts[1];
        } else {
            throw new InvalidInputFormatException("Can't extract role and email");
        }

        Optional<LabStaff> labstaff = labStaffService.findByEmail(email);
        if (labstaff.isEmpty()) {
            throw new UserNotFoundException("Unable to fetch user details");
        }

        return labstaff.get();
    }

    @GetMapping("/validateLabStaffId/{id}")
    public boolean validateLabStaffId(@PathVariable Long id)
    {
        Optional<LabStaff> labstaff = labStaffService.findById(id);
        return labstaff.isPresent() && labstaff.get().isEnabled();
    }

    @GetMapping("/getFirstAndLastNamesForLabStaffId/{id}")
    public String getFirstAndLastNamesForLabStaffId(@PathVariable Long id)
    {
        Optional<LabStaff> labstaff = labStaffService.findById(id);
        if(labstaff.isEmpty())
        {
            throw new UserNotFoundException("Invalid labstaff id!");
        }
        if(!labstaff.get().isEnabled())
        {
            throw new UserNotFoundException("Labstaff with given id is not yet enabled!");
        }

        return labstaff.get().getFirstName() + delimiter + labstaff.get().getLastName();
    }
}

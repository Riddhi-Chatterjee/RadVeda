package RadVeda.DoctorService;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;


public interface DoctorTestsRepository extends JpaRepository<DoctorTests, Long> {
    


}

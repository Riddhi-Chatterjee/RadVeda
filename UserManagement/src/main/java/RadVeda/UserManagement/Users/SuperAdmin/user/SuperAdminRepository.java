package RadVeda.UserManagement.Users.SuperAdmin.user;

import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SuperAdminRepository extends JpaRepository<SuperAdmin, Long> {
    Optional<SuperAdmin> findByEmail(String email);
    @NonNull Optional<SuperAdmin> findById(@NonNull Long id);
}

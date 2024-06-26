package RadVeda.Collaboration.Messages;

import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PrivateMessageRepository extends JpaRepository<PrivateMessage, Long> {
    @NonNull Optional<PrivateMessage> findById(@NonNull Long id);
    List<PrivateMessage> findByTestIdAndSenderTypeAndSenderIdAndRecipientTypeAndRecipientId(Long testId, String senderType, Long senderId, String recipientType, Long recipientId);
    List<PrivateMessage> findByTestIdAndSenderTypeAndSenderId(Long testId, String senderType, Long senderId);
    List<PrivateMessage> findByTestIdAndRecipientTypeAndRecipientId(Long testId, String recipientType, Long recipientId);
    List<PrivateMessage> findBySenderTypeAndSenderId(String senderType, Long senderId);
}

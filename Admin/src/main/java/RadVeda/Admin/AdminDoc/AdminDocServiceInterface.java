//package RadVeda.Admin.AdminDoc;
//import RadVeda.Admin.User;
//import RadVeda.Admin.Admin.Admin;
//
//import java.util.List;
//import java.util.Optional;
//
//
//public interface AdminDocServiceInterface {
//        AdminDoc addDocforAdmin(AdminDocRequest request);
//        void deleteRecord(Long Id);
//        List<Long> getDocsOfAdmin(Long Doc_Id);
//        Optional<Doctor> getDocs(Long Doc_id);
//        User authenticate(String AuthorizationHeader);
//    }
//}

package RadVeda.Admin.AdminDoc;

import RadVeda.Admin.User;

import java.util.List;
import java.util.Optional;

public interface AdminDocServiceInterface {
        String addDocforAdmin(Long adminId, Long docId);

        List<Long> getDocsOfAdmin(Long adminID);

        String deleteDoc(Long doc_id);
        User authenticate(String authorizationHeader);
}

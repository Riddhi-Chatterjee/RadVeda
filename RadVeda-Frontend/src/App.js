import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import LabStaffUpdateProfile from "./pages/LabStaffUpdateProfile";
import PatientProfileUpdatePage from "./pages/PatientProfileUpdatePage"; 
import RadUpdateProfile from "./pages/RadUpdateProfile"; 
import DocUpdateProfile from "./pages/DocUpdateProfile"; 
import LabStaffSignup from "./pages/LabStaffSignup";
import LabStaffSignup1 from "./pages/LabStaffSignup1";
import LabStaffSignup2 from "./pages/LabStaffSignup2";
import LabStaffLoginPage from "./pages/LabStaffLoginPage";
import LabStaffTestPending from "./pages/LabStaffTestPending";
import LabStaffDashboard from "./pages/LabStaffDashboard";
import LabStaffRemarksUpload from "./pages/LabStaffRemarksUpload";
import SuLoginPage from "./pages/SuLoginPage";
import SuDashboard from "./pages/SuDashboard";
import SuReviewSignup from "./pages/SuReviewSignup";
import SuReviewDeletion from "./pages/SuReviewDeletion";
import SuReviewModification from "./pages/SuReviewModification";
import SuViewAdmins from "./pages/SuViewAdmins";
import PatientSignup from "./pages/PatientSignup";
import PatientGuardianInfo from "./pages/PatientGuardianInfo";
import PatientSignup1 from "./pages/PatientSignup1";
import PatientGaurdianInfo from "./pages/PatientGaurdianInfo";
import RadConsPFRBDAnnotater from "./pages/RadConsPFRBDAnnotater";
import RadConsPFRBDEditor from "./pages/RadConsPFRBDEditor";
import RadConsPFREditor from "./pages/RadConsPFREditor";
import RadConsPFRBDChat from "./pages/RadConsPFRBDChat";
import RadConsPFRChat from "./pages/RadConsPFRChat";
import RadOwnPatDetails from "./pages/RadOwnPatDetails";
import RadOwnPFRConsRad from "./pages/RadOwnPFRConsRad";
import RadOwnPFRBDConsRad from "./pages/RadOwnPFRBDConsRad";
import RadOwnPfr from "./pages/RadOwnPfr";
import RadOwnPfrDoc from "./pages/RadOwnPfrDoc";
import RadOwnDiagComp from "./pages/RadOwnDiagComp";
import RadOwnPFRAnnotater from "./pages/RadOwnPFRAnnotater";
import RadOwnPFRBDAnnotater from "./pages/RadOwnPFRBDAnnotater";
import RadOwnPFRBDEditor from "./pages/RadOwnPFRBDEditor";
import RadOwnPFREditor from "./pages/RadOwnPFREditor";
import RadOwnPFRBDChat from "./pages/RadOwnPFRBDChat";
import RadOwnPFRChat from "./pages/RadOwnPFRChat";
import RadOwnPfrRadHist from "./pages/RadOwnPfrRadHist";
import RadOwnPfrDocHist from "./pages/RadOwnPfrDocHist";
import RadOwnDiagCompHist from "./pages/RadOwnDiagCompHist";
import DocDashboard from "./pages/DocDashboard";
import DocSignup from "./pages/DocSignup";
import DocSignup1 from "./pages/DocSignup1";
import DocSignup2 from "./pages/DocSignup2";
import DocLoginPage from "./pages/DocLoginPage";
import DocPTVerification from "./pages/DocPTVerification";
import DocPTDetails from "./pages/DocPTDetails";
import DocConsPfr from "./pages/DocConsPfr";
import DocConsDiagComplete from "./pages/DocConsDiagComplete";
import DocConsPfrRadHist from "./pages/DocConsPfrRadHist";
import DocConsPfrDocHist from "./pages/DocConsPfrDocHist";
import DocConsDiagCompHist from "./pages/DocConsDiagCompHist";
import DocConsPFRBREditor from "./pages/DocConsPFRBREditor";
import DocConsPFREditor from "./pages/DocConsPFREditor";
import DocConsOtherDocs from "./pages/DocConsOtherDocs";
import DocConsChat from "./pages/DocConsChat";
import DocOwnPatientDetails from "./pages/DocOwnPatientDetails";
import DocOwnPfrRad from "./pages/DocOwnPfrRad";
import DocOwnPfr from "./pages/DocOwnPfr";
import DocOwnDiagComplete from "./pages/DocOwnDiagComplete";
import DocOwnPFRBREditor from "./pages/DocOwnPFRBREditor";
import DocOwnPFREditor from "./pages/DocOwnPFREditor";
import DocOwnConsultDocs from "./pages/DocOwnConsultDocs";
import DocOwnChatInterface from "./pages/DocOwnChatInterface";
import DocOwnPfrRadHist from "./pages/DocOwnPfrRadHist";
import DocOwnPfrDocHist from "./pages/DocOwnPfrDocHist";
import DocOwnDiagCompHist from "./pages/DocOwnDiagCompHist";
import UserTypeSelection from "./pages/UserTypeSelection";
import PatientSignup2 from "./pages/PatientSignup2";
import PatientLoginPage from "./pages/PatientLoginPage";
import PatientPfrRadiologist from "./pages/PatientPfrRadiologist";
import PatientPfrDoctor from "./pages/PatientPfrDoctor";
import PatientDiagComplete from "./pages/PatientDiagComplete";
import PatientDashboard from "./pages/PatientDashboard";
import AdminSignup from "./pages/AdminSignup";
import AdminSignup1 from "./pages/AdminSignup1";
import AdminSignup2 from "./pages/AdminSignup2";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminViewDoctors from "./pages/AdminViewDoctors";
import AdminViewRadiologists from "./pages/AdminViewRadiologists";
import AdminViewLabStaff from "./pages/AdminViewLabStaff";
import AdminReviewSignup from "./pages/AdminReviewSignup";
import AdminReviewModifications from "./pages/AdminReviewModifications";
import AdminReviewDeletion from "./pages/AdminReviewDeletion";
import RadDashboard from "./pages/RadDashboard";
import RadSignup from "./pages/RadSignup";
import RadSignup1 from "./pages/RadSignup1";
import RadSignup2 from "./pages/RadSignup2";
import RadLoginPage from "./pages/RadLoginPage";
import RadConsPatDetails from "./pages/RadConsPatDetails";
import RadConsPfrConsRad from "./pages/RadConsPfrConsRad";
import RadConsPFRBDConsRad from "./pages/RadConsPFRBDConsRad";
import RadConsPfr from "./pages/RadConsPfr";
import RadConsPfrRadHist from "./pages/RadConsPfrRadHist";
import RadConsPfrDocHist from "./pages/RadConsPfrDocHist";
import RadConsDiagCompHist from "./pages/RadConsDiagCompHist";
import RadConsPfrDoc from "./pages/RadConsPfrDoc";
import RadConsDiagComp from "./pages/RadConsDiagComp";
import RadConsPFRAnnotater from "./pages/RadConsPFRAnnotater";
import DocConsPatDetails from "./pages/DocConsPatDetails";
import DocConsPfrRad from "./pages/DocConsPfrRad";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/labstaff-signup-3":
        title = "";
        metaDescription = "";
        break;
      case "/labstaff-signup-2":
        title = "";
        metaDescription = "";
        break;
      case "/labstaff-login-page":
        title = "";
        metaDescription = "";
        break;
      case "/labstaff-test-pending":
        title = "";
        metaDescription = "";
        break;
      case "/labstaff-dashboard":
        title = "";
        metaDescription = "";
        break;
      case "/labstaff-remarks-upload":
        title = "";
        metaDescription = "";
        break;
      case "/su-login-page":
        title = "";
        metaDescription = "";
        break;
      case "/su-dashboard":
        title = "";
        metaDescription = "";
        break;
      case "/su-review-signup":
        title = "";
        metaDescription = "";
        break;
      case "/su-review-deletion":
        title = "";
        metaDescription = "";
        break;
      case "/su-review-modification":
        title = "";
        metaDescription = "";
        break;
      case "/su-view-admins":
        title = "";
        metaDescription = "";
        break;
      case "/patient-signup-1":
        title = "";
        metaDescription = "";
        break;
      case "/patient-guardian-info-1":
        title = "";
        metaDescription = "";
        break;
      case "/patient-signup-3":
        title = "";
        metaDescription = "";
        break;
      case "/patient-gaurdian-info-2":
        title = "";
        metaDescription = "";
        break;
      case "/rad-cons-pfrbd-annotater":
        title = "";
        metaDescription = "";
        break;
      case "/rad-cons-pfrbd-editor":
        title = "";
        metaDescription = "";
        break;
      case "/rad-cons-pfr-editor":
        title = "";
        metaDescription = "";
        break;
      case "/rad-cons-pfrbd-chat":
        title = "";
        metaDescription = "";
        break;
      case "/rad-cons-pfr-chat":
        title = "";
        metaDescription = "";
        break;
      case "/rad-own-pat-details":
        title = "";
        metaDescription = "";
        break;
      case "/rad-own-pfr-cons-rad":
        title = "";
        metaDescription = "";
        break;
      case "/rad-own-pfrbd-cons-rad":
        title = "";
        metaDescription = "";
        break;
      case "/rad-own-pfr":
        title = "";
        metaDescription = "";
        break;
      case "/rad-own-pfr-doc":
        title = "";
        metaDescription = "";
        break;
      case "/rad-own-diag-comp":
        title = "";
        metaDescription = "";
        break;
      case "/rad-own-pfr-annotater":
        title = "";
        metaDescription = "";
        break;
      case "/rad-own-pfrbd-annotater":
        title = "";
        metaDescription = "";
        break;
      case "/rad-own-pfrbd-editor":
        title = "";
        metaDescription = "";
        break;
      case "/rad-own-pfr-editor":
        title = "";
        metaDescription = "";
        break;
      case "/rad-own-pfrbd-chat":
        title = "";
        metaDescription = "";
        break;
      case "/rad-own-pfr-chat":
        title = "";
        metaDescription = "";
        break;
      case "/rad-own-pfr-rad-hist":
        title = "";
        metaDescription = "";
        break;
      case "/rad-own-pfr-doc-hist":
        title = "";
        metaDescription = "";
        break;
      case "/rad-own-diag-comp-hist":
        title = "";
        metaDescription = "";
        break;
      case "/doc-dashboard":
        title = "";
        metaDescription = "";
        break;
      case "/doc-signup-1":
        title = "";
        metaDescription = "";
        break;
      case "/doc-signup-3":
        title = "";
        metaDescription = "";
        break;
      case "/doc-signup-2":
        title = "";
        metaDescription = "";
        break;
      case "/doc-login-page":
        title = "";
        metaDescription = "";
        break;
      case "/doc-pt-verification":
        title = "";
        metaDescription = "";
        break;
      case "/doc-pt-details":
        title = "";
        metaDescription = "";
        break;
      case "/doc-cons-pfr":
        title = "";
        metaDescription = "";
        break;
      case "/doc-cons-diag-complete":
        title = "";
        metaDescription = "";
        break;
      case "/doc-cons-pfr-rad-hist":
        title = "";
        metaDescription = "";
        break;
      case "/doc-cons-pfr-doc-hist":
        title = "";
        metaDescription = "";
        break;
      case "/doc-cons-diag-comp-hist":
        title = "";
        metaDescription = "";
        break;
      case "/doc-cons-pfrbr-editor":
        title = "";
        metaDescription = "";
        break;
      case "/doc-cons-pfr-editor":
        title = "";
        metaDescription = "";
        break;
      case "/doc-cons-other-docs":
        title = "";
        metaDescription = "";
        break;
      case "/doc-cons-chat":
        title = "";
        metaDescription = "";
        break;
      case "/doc-own-patient-details":
        title = "";
        metaDescription = "";
        break;
      case "/doc-own-pfr-rad":
        title = "";
        metaDescription = "";
        break;
      case "/doc-own-pfr":
        title = "";
        metaDescription = "";
        break;
      case "/doc-own-diag-complete":
        title = "";
        metaDescription = "";
        break;
      case "/doc-own-pfrbr-editor":
        title = "";
        metaDescription = "";
        break;
      case "/doc-own-pfr-editor":
        title = "";
        metaDescription = "";
        break;
      case "/doc-own-consult-docs":
        title = "";
        metaDescription = "";
        break;
      case "/doc-own-chat-interface":
        title = "";
        metaDescription = "";
        break;
      case "/doc-own-pfr-rad-hist":
        title = "";
        metaDescription = "";
        break;
      case "/doc-own-pfr-doc-hist":
        title = "";
        metaDescription = "";
        break;
      case "/doc-own-diag-comp-hist":
        title = "";
        metaDescription = "";
        break;
      case "/user-type-selection":
        title = "";
        metaDescription = "";
        break;
      case "/patient-signup-2":
        title = "";
        metaDescription = "";
        break;
      case "/patient-login-page":
        title = "";
        metaDescription = "";
        break;
      case "/patient-pfr-radiologist":
        title = "";
        metaDescription = "";
        break;
      case "/patient-pfr-doctor":
        title = "";
        metaDescription = "";
        break;
      case "/patient-diag-complete":
        title = "";
        metaDescription = "";
        break;
      case "/patient-dashboard":
        title = "";
        metaDescription = "";
        break;
      case "/admin-signup-1":
        title = "";
        metaDescription = "";
        break;
      case "/admin-signup-3":
        title = "";
        metaDescription = "";
        break;
      case "/admin-signup-2":
        title = "";
        metaDescription = "";
        break;
      case "/admin-login-page":
        title = "";
        metaDescription = "";
        break;
      case "/admin-dashboard":
        title = "";
        metaDescription = "";
        break;
      case "/admin-view-doctors":
        title = "";
        metaDescription = "";
        break;
      case "/admin-view-radiologists":
        title = "";
        metaDescription = "";
        break;
      case "/admin-view-labstaff":
        title = "";
        metaDescription = "";
        break;
      case "/admin-review-signup":
        title = "";
        metaDescription = "";
        break;
      case "/admin-review-modifications":
        title = "";
        metaDescription = "";
        break;
      case "/admin-review-deletion":
        title = "";
        metaDescription = "";
        break;
      case "/rad-dashboard":
        title = "";
        metaDescription = "";
        break;
      case "/rad-signup-1":
        title = "";
        metaDescription = "";
        break;
      case "/rad-signup-3":
        title = "";
        metaDescription = "";
        break;
      case "/rad-signup-2":
        title = "";
        metaDescription = "";
        break;
      case "/rad-login-page":
        title = "";
        metaDescription = "";
        break;
      case "/rad-cons-pat-details":
        title = "";
        metaDescription = "";
        break;
      case "/rad-cons-pfr-cons-rad":
        title = "";
        metaDescription = "";
        break;
      case "/rad-cons-pfrbd-cons-rad":
        title = "";
        metaDescription = "";
        break;
      case "/rad-cons-pfr":
        title = "";
        metaDescription = "";
        break;
      case "/rad-cons-pfr-rad-hist":
        title = "";
        metaDescription = "";
        break;
      case "/rad-cons-pfr-doc-hist":
        title = "";
        metaDescription = "";
        break;
      case "/rad-cons-diag-comp-hist":
        title = "";
        metaDescription = "";
        break;
      case "/rad-cons-pfr-doc":
        title = "";
        metaDescription = "";
        break;
      case "/rad-cons-diag-comp":
        title = "";
        metaDescription = "";
        break;
      case "/rad-cons-pfr-annotater":
        title = "";
        metaDescription = "";
        break;
      case "/doc-cons-pat-details":
        title = "";
        metaDescription = "";
        break;
      case "/doc-cons-pfr-rad":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes >
      <Route path="/labstaff-signup" element={<LabStaffSignup />} />
      <Route path="/labstaff-signup-1" element={<LabStaffSignup1 />} />
      <Route path="/labstaff-signup-2" element={<LabStaffSignup2 />} />
      <Route path="/labstaff-login-page" element={<LabStaffLoginPage />} />
      <Route path="/labstaff-test-pending" element={<LabStaffTestPending />} />
      <Route path="/labstaff-dashboard" element={<LabStaffDashboard />} />
      <Route path="/labstaff/profile/update" element={<LabStaffUpdateProfile />} />
      <Route
        path="/labstaff-remarks-upload"
        element={<LabStaffRemarksUpload />}
      />
      <Route path="/su-login-page" element={<SuLoginPage />} />
      <Route path="/su-dashboard" element={<SuDashboard />} />
      <Route path="/su-review-signup" element={<SuReviewSignup />} />
      <Route path="/su-review-deletion" element={<SuReviewDeletion />} />
      <Route
        path="/su-review-modification"
        element={<SuReviewModification />}
      />
      <Route path="/su-view-admins" element={<SuViewAdmins />} />
      <Route path="/patient-signup-1" element={<PatientSignup />} />
      <Route
        path="/patient-guardian-info-1"
        element={<PatientGuardianInfo />}
      />
      <Route path="/patient-signup-3" element={<PatientSignup1 />} />
      <Route
        path="/patient-gaurdian-info-2"
        element={<PatientGaurdianInfo />}
      />
      <Route
        path="/rad-cons-pfrbd-annotater"
        element={<RadConsPFRBDAnnotater />}
      />
      <Route path="/rad-cons-pfrbd-editor" element={<RadConsPFRBDEditor />} />
      <Route path="/rad-cons-pfr-editor" element={<RadConsPFREditor />} />
      <Route path="/rad-cons-pfrbd-chat" element={<RadConsPFRBDChat />} />
      <Route path="/rad-cons-pfr-chat" element={<RadConsPFRChat />} />
      <Route path="/rad-own-pat-details" element={<RadOwnPatDetails />} />
      <Route path="/rad-own-pfr-cons-rad" element={<RadOwnPFRConsRad />} />
      <Route path="/rad-own-pfrbd-cons-rad" element={<RadOwnPFRBDConsRad />} />
      <Route path="/rad-own-pfr" element={<RadOwnPfr />} />
      <Route path="/rad-own-pfr-doc" element={<RadOwnPfrDoc />} />
      <Route path="/rad-own-diag-comp" element={<RadOwnDiagComp />} />
      <Route path="/rad-own-pfr-annotater" element={<RadOwnPFRAnnotater />} />
      <Route
        path="/rad-own-pfrbd-annotater"
        element={<RadOwnPFRBDAnnotater />}
      />
      <Route path="/rad-own-pfrbd-editor" element={<RadOwnPFRBDEditor />} />
      <Route path="/rad-own-pfr-editor" element={<RadOwnPFREditor />} />
      <Route path="/rad-own-pfrbd-chat" element={<RadOwnPFRBDChat />} />
      <Route path="/rad-own-pfr-chat" element={<RadOwnPFRChat />} />
      <Route path="/rad-own-pfr-rad-hist" element={<RadOwnPfrRadHist />} />
      <Route path="/rad-own-pfr-doc-hist" element={<RadOwnPfrDocHist />} />
      <Route path="/rad-own-diag-comp-hist" element={<RadOwnDiagCompHist />} />
      <Route path="/doc-dashboard" element={<DocDashboard />} />
      <Route path="/doc-update-profile" element={<DocUpdateProfile />} />
      <Route path="/doc-signup-1" element={<DocSignup />} />
      <Route path="/doc-signup-3" element={<DocSignup1 />} />
      <Route path="/doc-signup-2" element={<DocSignup2 />} />
      <Route path="/doc-login-page" element={<DocLoginPage />} />
      <Route path="/doc-pt-verification" element={<DocPTVerification />} />
      <Route path="/doc-pt-details" element={<DocPTDetails />} />
      <Route path="/doc-cons-pfr" element={<DocConsPfr />} />
      <Route path="/doc-cons-diag-complete" element={<DocConsDiagComplete />} />
      <Route path="/doc-cons-pfr-rad-hist" element={<DocConsPfrRadHist />} />
      <Route path="/doc-cons-pfr-doc-hist" element={<DocConsPfrDocHist />} />
      <Route
        path="/doc-cons-diag-comp-hist"
        element={<DocConsDiagCompHist />}
      />
      <Route path="/doc-cons-pfrbr-editor" element={<DocConsPFRBREditor />} />
      <Route path="/doc-cons-pfr-editor" element={<DocConsPFREditor />} />
      <Route path="/doc-cons-other-docs" element={<DocConsOtherDocs />} />
      <Route path="/doc-cons-chat" element={<DocConsChat />} />
      <Route
        path="/doc-own-patient-details"
        element={<DocOwnPatientDetails />}
      />
      <Route path="/doc-own-pfr-rad" element={<DocOwnPfrRad />} />
      <Route path="/doc-own-pfr" element={<DocOwnPfr />} />
      <Route path="/doc-own-diag-complete" element={<DocOwnDiagComplete />} />
      <Route path="/doc-own-pfrbr-editor" element={<DocOwnPFRBREditor />} />
      <Route path="/doc-own-pfr-editor" element={<DocOwnPFREditor />} />
      <Route path="/doc-own-consult-docs" element={<DocOwnConsultDocs />} />
      <Route path="/doc-own-chat-interface" element={<DocOwnChatInterface />} />
      <Route path="/doc-own-pfr-rad-hist" element={<DocOwnPfrRadHist />} />
      <Route path="/doc-own-pfr-doc-hist" element={<DocOwnPfrDocHist />} />
      <Route path="/doc-own-diag-comp-hist" element={<DocOwnDiagCompHist />} />
      <Route path="/" element={<UserTypeSelection />} />
      <Route path="/patient-signup-2" element={<PatientSignup2 />} />
      <Route path="/patient-login-page" element={<PatientLoginPage />} />
      <Route
        path="/patient-pfr-radiologist"
        element={<PatientPfrRadiologist />}
      />
      <Route path="/patient-pfr-doctor" element={<PatientPfrDoctor />} />
      <Route path="/patient-diag-complete" element={<PatientDiagComplete />} />
      <Route path="/profile/update" element={<PatientProfileUpdatePage />} />
      {/* <Route path="/patient-profile-update" element={<PatientProfileUpdatePage />} /> */}
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/admin-signup-1" element={<AdminSignup />} />
      <Route path="/admin-signup-3" element={<AdminSignup1 />} />
      <Route path="/admin-signup-2" element={<AdminSignup2 />} />
      <Route path="/admin-login-page" element={<AdminLoginPage />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-view-doctors" element={<AdminViewDoctors />} />
      <Route
        path="/admin-view-radiologists"
        element={<AdminViewRadiologists />}
      />
      <Route path="/admin-view-labstaff" element={<AdminViewLabStaff />} />
      <Route path="/admin-review-signup" element={<AdminReviewSignup />} />
      <Route
        path="/admin-review-modifications"
        element={<AdminReviewModifications />}
      />
      <Route path="/admin-review-deletion" element={<AdminReviewDeletion />} />
      <Route path="/rad-dashboard" element={<RadDashboard />} />
      <Route path="/rad-signup-1" element={<RadSignup />} />
      <Route path="/rad-signup-3" element={<RadSignup1 />} />
      <Route path="/rad-signup-2" element={<RadSignup2 />} />
      <Route path="/rad-login-page" element={<RadLoginPage />} />
      <Route path="/rad-cons-pat-details" element={<RadConsPatDetails />} />
      <Route path="rad-dashboard/rad/profile/update" element={<RadUpdateProfile />} />
      <Route path="/rad-cons-pfr-cons-rad" element={<RadConsPfrConsRad />} />
      <Route
        path="/rad-cons-pfrbd-cons-rad"
        element={<RadConsPFRBDConsRad />}
      />
      <Route path="/rad-cons-pfr" element={<RadConsPfr />} />
      <Route path="/rad-cons-pfr-rad-hist" element={<RadConsPfrRadHist />} />
      <Route path="/rad-cons-pfr-doc-hist" element={<RadConsPfrDocHist />} />
      <Route
        path="/rad-cons-diag-comp-hist"
        element={<RadConsDiagCompHist />}
      />
      <Route path="/rad-cons-pfr-doc" element={<RadConsPfrDoc />} />
      <Route path="/rad-cons-diag-comp" element={<RadConsDiagComp />} />
      <Route path="/rad-cons-pfr-annotater" element={<RadConsPFRAnnotater />} />
      <Route path="/doc-cons-pat-details" element={<DocConsPatDetails />} />
      <Route path="/doc-cons-pfr-rad" element={<DocConsPfrRad />} />
    </Routes>
  );
}
export default App;

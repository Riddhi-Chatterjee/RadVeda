import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { request, getAuthToken} from "../axios_helper";
import "./PatientGuardianInfo.css";

const PatientGuardianInfo = () => {
  const navigate = useNavigate();

  if(getAuthToken() !== null && getAuthToken() !== "null")
  {
    request(
      "GET",
      "/admins/profile",
      {},
      true
      ).then(response => {
        navigate("/admin-dashboard");
      }).catch(error => {
        
      })

    request(
      "GET",
      "/superadmins/profile",
      {},
      true
      ).then(response => {
        navigate("/su-dashboard");
      }).catch(error => {
        
      })
    
    request(
      "GET",
      "/doctors/profile",
      {},
      true
      ).then(response => {
        navigate("/doc-dashboard");
      }).catch(error => {
        
      })

    request(
      "GET",
      "/radiologists/profile",
      {},
      true
      ).then(response => {
        navigate("/rad-dashboard");
      }).catch(error => {
        
      })

    request(
      "GET",
      "/patients/profile",
      {},
      true
      ).then(response => {
        navigate("/patient-dashboard");
      }).catch(error => {
        
      })
    
    request(
      "GET",
      "/labstaffs/profile",
      {},
      true
      ).then(response => {
        navigate("/labstaff-dashboard");
      }).catch(error => {
        
      })

  }
  

  const onRectangleClick = useCallback(() => {
    navigate("/patient-login-page");
  }, [navigate]);

  const onRectangle1Click = useCallback(() => {
    navigate("/patient-gaurdian-info-2");
  }, [navigate]);

  const onRectangle2Click = useCallback(() => {
    navigate("/patient-signup-2");
  }, [navigate]);

  return (
    <div className="patient-guardian-info-1">
      <img className="vector-icon34" alt="" />
      <div className="patient-guardian-info-1-child" />
      <div className="patient-guardian-info-1-item" />
      <img
        className="users-background-5-icon2"
        alt=""
        src="/users-background-5@2x.png"
      />
      <div className="patient-guardian-info-1-inner" />
      <div className="patient-guardian-info-1-child1" />
      <div className="patient-guardian-info-1-child2" />
      <div
        className="patient-guardian-info-1-child3"
        onClick={onRectangleClick}
      />
      <b onClick={onRectangleClick} className="login6">Login</b>
      <div className="already-have-an4"> Already have an account?</div>
      <div className="text-fieldoutlined30">
        <div className="input30">
          <div className="content34">
            <div className="min-height30" />
            <input className="label30" placeholder="First name"></input>
          </div>
        </div>
        <div className="helpertext30">
          <div className="helper-text30">Helper text</div>
        </div>
      </div>
      <div className="text-fieldoutlined31">
        <div className="input30">
          <div className="content34">
            <div className="min-height30" />
            <input className="label30" placeholder="Middle name"></input>
          </div>
        </div>
        <div className="helpertext30">
          <div className="helper-text30">Helper text</div>
        </div>
      </div>
      <div className="text-fieldoutlined32">
        <div className="input30">
          <div className="content34">
            <div className="min-height30" />
            <input className="label30" placeholder="Last name"></input>
          </div>
        </div>
        <div className="helpertext30">
          <div className="helper-text30">Helper text</div>
        </div>
      </div>
      <div className="text-fieldoutlined33">
        <div className="input30">
          <div className="content34">
            <div className="min-height30" />
            <input className="label30" placeholder="Address line 1"></input>
          </div>
        </div>
        <div className="helpertext30">
          <div className="helper-text30">Helper text</div>
        </div>
      </div>
      <div className="text-fieldoutlined34">
        <div className="input30">
          <div className="content34">
            <div className="min-height30" />
            <input type="email" className="label30" placeholder="Email address"></input>
          </div>
        </div>
        <div className="helpertext30">
          <div className="helper-text30">Helper text</div>
        </div>
      </div>
      <div className="text-fieldoutlined35">
        <div className="input30">
          <div className="content34">
            <div className="min-height30" />
            <input className="label30" placeholder="Address line 2"></input>
          </div>
        </div>
        <div className="helpertext30">
          <div className="helper-text30">Helper text</div>
        </div>
      </div>
      <div className="text-fieldoutlined36">
        <div className="input30">
          <div className="content34">
            <div className="min-height30" />
            <input className="label30" placeholder="Country"></input>
          </div>
        </div>
        <div className="helpertext30">
          <div className="helper-text30">Helper text</div>
        </div>
      </div>
      <img
        className="iconsregularchevron-down-s7"
        alt=""
        src="/iconsregularchevrondowns.svg"
      />
      <div className="text-fieldoutlined37">
        <div className="input30">
          <div className="content34">
            <div className="min-height30" />
            <input className="label30" placeholder="State"></input>
          </div>
        </div>
        <div className="helpertext30">
          <div className="helper-text30">Helper text</div>
        </div>
      </div>
      <img
        className="iconsregularchevron-down-s8"
        alt=""
        src="/iconsregularchevrondowns.svg"
      />
      <div className="text-fieldoutlined38">
        <div className="input30">
          <div className="content34">
            <div className="min-height30" />
            <input className="label30" placeholder="City"></input>
          </div>
        </div>
        <div className="helpertext30">
          <div className="helper-text30">Helper text</div>
        </div>
      </div>
      <img
        className="iconsregularchevron-down-s9"
        alt=""
        src="/iconsregularchevrondowns.svg"
      />
      <div className="guardian-info">Guardian info</div>
      <div
        className="patient-guardian-info-1-child4"
        onClick={onRectangle1Click}
      />
      <b onClick={onRectangle1Click} className="next3">Next</b>
      <div
        className="patient-guardian-info-1-child5"
        onClick={onRectangle2Click}
      />
      <b onClick={onRectangle2Click} className="back12">Back</b>
    </div>
  );
};

export default PatientGuardianInfo;

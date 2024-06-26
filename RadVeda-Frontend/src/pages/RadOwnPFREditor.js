import { request, getAuthToken} from "../axios_helper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RadOwnPFREditor.css";

const RadOwnPFREditor = () => {
  const navigate = useNavigate();

  if(getAuthToken() !== null && getAuthToken() !== "null")
  {
    request(
      "GET",
      "/radiologists/profile",
      {},
      true
      ).then(response => {
        
      }).catch(error => {
        navigate("/rad-login-page");
      })
  }
  else
  {
    useEffect(() => {navigate("/rad-login-page");}) 
  }

  return (
    <div className="rad-own-pfr-editor">
      <img className="image-13-icon3" alt="" src="/image-13@2x.png" />
      <div className="rad-own-pfr-editor-inner">
        <div className="back-wrapper16">
          <div className="back27">Back</div>
        </div>
      </div>
    </div>
  );
};

export default RadOwnPFREditor;

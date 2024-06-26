import { useState, useCallback, useRef } from "react";

import NPUserOptions from "../components/NPUserOptions";
import PortalPopup from "../components/PortalPopup";
import RadOwnDocNotes from "../components/RadOwnDocNotes";
import RadOwnNotes from "../components/RadOwnNotes";
import RadOwnOtherRadNotes from "../components/RadOwnOtherRadNotes";
import { useNavigate } from "react-router-dom";
import { request, getAuthToken} from "../axios_helper";
import { useEffect } from "react";

import "./RadOwnPfr.css";
import DicomViewer from "./DicomViewer";
import cornerstone from "cornerstone-core";
import dicomParser from "dicom-parser";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";

import * as cornerstoneTools from '@cornerstonejs/tools';
import html2canvas from 'html2canvas';
import {
  RenderingEngine,
  Types,
  Enums,
  getRenderingEngine,
} from '@cornerstonejs/core';

import initDemo from './helpers/helpers/initDemo';
import createImageIdsAndCacheMetaData from './helpers/helpers/createImageIdsAndCacheMetaData';
import setTitleAndDescription from './helpers/helpers/setTitleAndDescription';
import addDropDownToToolbar from './helpers/helpers/addDropdownToToolbar';
import addButtonToToolbar from './helpers/helpers/addButtonToToolbar';

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
const RadOwnPfr = () => {
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

  const [isNPUserOptionsOpen, setNPUserOptionsOpen] = useState(false);
  const [isRadOwnDocNotesOpen, setRadOwnDocNotesOpen] = useState(false);
  const [isRadOwnNotesOpen, setRadOwnNotesOpen] = useState(false);
  const [isEditorOpen, setEditorOpen] = useState(false);

  const [isRadOwnOtherRadNotesOpen, setRadOwnOtherRadNotesOpen] =
    useState(false);
  const [isDicomViewerOpen, setDicomViewerOpen] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const divRef = useRef(null);

  
  // useEffect(() => {
  //   request(
  //     "GET",
  //     "http://localhost:9200/images/" + localStorage.getItem("testID") + "/getImageOriginal",
  //     {},
  //     true
  //   ).then((response) => {
  //     setImageURL(response.data.imageURL)
  //     console.log(response.data)
  //   })
  // }, []);

  useEffect(() => {


    request(
      "GET",
      "http://localhost:9200/images/" + localStorage.getItem("testID") + "/getImageOriginal",
      {},
      true
    ).then((response) => {
      setImageURL(response.data[0].imageURL)
      console.log(imageURL)
    
    const particularDiv = document.getElementsByClassName('xray1-1-icon')[0];
    
    // Set divRef.current to the particular div
    const image_url = "wadouri:" + response.data[0].imageURL
    divRef.current = particularDiv;
    cornerstone.enable(divRef.current);
    cornerstone
    .loadImage(
      image_url
    )
    .then(image => {

      console.log(image);
      const viewport = {
        invert: false,
        pixelReplication: false,
        voi: {
          windowWidth: 279,
          windowCenter: 200
        },
        scale: 0.4
        ,
        translation: {
          x: 0,
          y: 0
        }
        // colormap: "hot"
      };

      cornerstone.displayImage(divRef.current, image, viewport);

      // run();

      // cornerstone.setViewport(divRef.current, viewport);
      // cornerstone.updateImage(divRef.current);
    }).catch((error) => {
      console.log(error.response.data.error)
    })
    });
  }, [imageURL]);
  
//   function downloadImage(data, filename = 'untitled.jpeg') {
//     var a = document.createElement('a');
//     a.href = data;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
// }
function downloadImage(image, filename) {
  // Create a link element
  const link = document.createElement('a');
  link.href = image;
  link.download = filename;

  // Append the link to the body
  document.body.appendChild(link);

  // Trigger click event to start download
  link.click();

  // Remove the link from the body
  document.body.removeChild(link);
}
function downloadMergedImage() {
  const element = document.getElementById('cornerstone-element');

  // Use html2canvas to capture the entire element
  html2canvas(element).then(function (canvas) {
    // Convert the canvas to a data URL
    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

    // Trigger download
    downloadImage(image, 'annotated_image.png');
  });
}

  const openNPUserOptions = useCallback(() => {
    setNPUserOptionsOpen(true);
  }, []);

  const closeNPUserOptions = useCallback(() => {
    setNPUserOptionsOpen(false);
  }, []);

  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  const [allChatNotifs, setAllChatNotifs] = useState([]);
  const [allChatNotifsID, setAllChatNotifsID] = useState([]);

  const [allConsentRequestNotifications, setAllConsentRequestNotifications] = useState([]);
  const [allConsentRequestNotificationsID, setAllConsentRequestNotificationsID] = useState([]);

  const [allOneWayNotifications, setAllOneWayNotifications] = useState([]);
  const [allOneWayNotificationsID, setAllOneWayNotificationsID] = useState([]);
  const [notes, setNotes] = useState("");

  // useEffect(() => {
  //   request(
  //     "GET",
  //     "http://localhost:9201/radiologist/" + localStorage.getItem("testID") + "/getNotes",
  //     {},
  //     true
  //   ).then((response) => {
  //     console.log(response.data)
  //     setNotes(response.data)
  //   })
  // }, [notes]);
  
  // const saveNotes = useCallback(() => {
  //   // Send 'notes' to the backend
  //   console.log("Saving notes:", notes);
  //   request(
  //     "PUT",
  //     "http://localhost:9201/radiologist/" + localStorage.getItem("testID") + "/addNotes",
  //     {
  //       "notes": notes
  //     },
  //     true
  //   ).then((response) => {
  //     console.log(response)
  //   })
  //
  //   // Close the editor overlay
  //   closeRadOwnNotes();
  // }, [notes, closeRadOwnNotes]);

  const deleteChatID = (index) => {
    // console.log(res);
    console.log("index is", index);
    console.log("Chat ID is", allChatNotifsID[index]);
    let idToDelete = allChatNotifsID[index];
    request(
      "DELETE",
      "http://localhost:9193/notifications/deleteChatNotification/" + String(idToDelete), 
      {
        
      },
      true
      ).then(
        () => {
          
          console.log("SUCCESS");
          alert("Chat Notification deleted successfully");
        }
      ).catch(
        (error) => {
          // alert(error.response.data.error);
          console.log("ERROR in deleting")
        }
      )
  }

  const deleteAllChatNotifs = () => {
    request(
      "DELETE",
      "http://localhost:9193/notifications/deleteAllChatNotifications", 
      {

      },
      true
      ).then(
        () => {
          
          console.log("SUCCESS");
          alert("Chat Notifications deleted successfully");
        }
      ).catch(
        (error) => {
          // alert(error.response.data.error);
          console.log("ERROR in deleting")
        }
      )
  }

  const openNotifications = useCallback(() => {
    console.log("CLICKED NOTIFICATIONS")
    request(
      "GET",
      "http://localhost:9193/notifications/getAllChatNotifications", 
      {

      },
      true
      ).then(
        (response) => {
          
          console.log(response.data);
          
          setAllChatNotifs([]);
          let arr = []
          let arrID = []
          for (let i = 0; i < response.data.length; i++) {

            arr.push(response.data[i].message);
            arrID.push(response.data[i].id);
          }

          setAllChatNotifs(arr);
          setAllChatNotifsID(arrID);
        }
      ).catch(
        (error) => {
          // alert(error.response.data.error);
          console.log("ERROR1")
        }
      )

      request(
        "GET",
        "http://localhost:9193/notifications/getAllConsentRequestNotifications", 
        {
  
        },
        true
        ).then(
          (response) => {
            
            console.log(response.data[0].message);
            
            setAllConsentRequestNotifications([]);
            let arr = []
            let arrID = []
            for (let i = 0; i < response.data.length; i++) {
  
              arr.push(response.data[i].message);
              arrID.push(response.data[i].id);
            }
  
            setAllConsentRequestNotifications(arr);
            setAllConsentRequestNotificationsID(arrID);
            
          }
        ).catch(
          (error) => {
            // alert(error.response.data.error);
            console.log("ERROR2")
          }
        )

        request(
          "GET",
          "http://localhost:9193/notifications/getAllOneWayNotifications", 
          {
    
          },
          true
          ).then(
            (response) => {
              
              console.log(response.data[0].message);
              
              setAllOneWayNotifications([]);
              let arr = []
              let arrID = []
              for (let i = 0; i < response.data.length; i++) {
    
                arr.push(response.data[i].message);
                arrID.push(response.data[i].id);
              }
    
              setAllOneWayNotifications(arr);
              setAllOneWayNotificationsID(arrID);
              
            }
          ).catch(
            (error) => {
              // alert(error.response.data.error);
              console.log("ERROR3")
            }
          )


    setNotificationsOpen(true);
  }, []);

  const closeNotifications = useCallback(() => {
    setNotificationsOpen(false);
  }, []);

  const openRadOwnDocNotes = useCallback(() => {
    setRadOwnDocNotesOpen(true);
  }, []);

  const closeRadOwnDocNotes = useCallback(() => {
    setRadOwnDocNotesOpen(false);
  }, []);

  const onFrameContainer1Click = useCallback(() => {
    navigate("/rad-own-pfr-annotater");
  }, [navigate]);

  const onFrameContainer12Click = useCallback(() => {
    navigate("/rad-own-pat-details");
  }, [navigate]);

  const onFrameContainer2Click = useCallback(() => {
    navigate("/rad-own-pfr-editor");
  }, [navigate]);

  const openRadOwnNotes = useCallback(() => {
    setRadOwnNotesOpen(true);
  }, []);

  const closeRadOwnNotes = useCallback(() => {
    setRadOwnNotesOpen(false);
  }, []);

  const onFrameContainer4Click = useCallback(() => {
    navigate("/rad-own-pfr-chat");
  }, [navigate]);

  const onFrameContainer5Click = useCallback(() => {
    navigate("/rad-own-pfr-cons-rad");
  }, [navigate]);

  const openRadOwnOtherRadNotes = useCallback(() => {
    setRadOwnOtherRadNotesOpen(true);
  }, []);



  const closeRadOwnOtherRadNotes = useCallback(() => {
    setRadOwnOtherRadNotesOpen(false);
  }, []);

  const onFrameContainer7Click = useCallback(() => {
    navigate("/rad-own-pat-details");
  }, [navigate]);

  const openDicomViewer = useCallback(() => {
    setDicomViewerOpen(true);
  }, [])

  const closeDicomViewer = useCallback(() => {
    // downloadMergedImage();
    setDicomViewerOpen(false);
  }, [])

  const imageUrl = "https://radveda.s3.ap-south-1.amazonaws.com/0002.DCM"



  return (
    <>
      <div className="rad-own-pfr">
        <div className="rad-own-pfr-child" />
        <img className="vector-icon49" alt="" />
        <img
          className="rad-own-pfr-item"
          alt=""
          src="/frame-53.svg"
          onClick={openNPUserOptions}
        />
        <div className="iconnotification-bing10">
          <img className="vector-icon50" alt="" src="/vector.svg" onClick={openNotifications}/>
          <img className="vector-icon51" alt="" src="/vector.svg" onClick={openNotifications}/>
          <img className="vector-icon52" alt="" onClick={openNotifications}/>
          <div className="iconnotification-bing-child8" onClick={openNotifications}/>
          <div className="div30">03</div>
        </div>
        <img className="need-help-icon10" alt="" src="/need-help.svg" />
        <div className="rad-own-pfr-inner" />
        <div className="rad-own-pfr-child1" />
        <div className="frame-parent17">
          <div className="group-wrapper34" onClick={openRadOwnDocNotes}>
            <div className="view-doctors-notes-wrapper">
              <div className="view-doctors-notes">View Doctor’s Impressions</div>
            </div>
          </div>
          <img className="rectangle-icon" alt="" src="/rectangle-5907.svg" />
          <b className="self-annotated-image">Self Annotated Image</b>
          <div className="frame-child41" />
          <b className="test-details2">Test Details</b>
          <div className="frame-child42" />
          <div className="frame-child43" />
          <div className="frame-child41" />
          <b className="original-image">Original Image</b>
          <div className="xray1-1-icon"/>
          <div
            className="annotely-image-1-icon"
          />
          <div className="group-wrapper35" onClick = {openDicomViewer}>
            <div className="add-further-annotations-wrapper">
              <div className="view-doctors-notes">Add annotations</div>
            </div>
          </div>
          <div className="group-wrapper36">
            <div className="view-personnel-info-wrapper">
              <div className="view-doctors-notes">View Personnel Info</div>
            </div>
          </div>
          <div className="frame-child45" />
          <div className="frame-child46" />
          <img className="frame-child47" alt="" src="/rectangle-5913.svg" />
          <img className="polygon-icon" alt="" src="/polygon-5.svg" />
          <img className="frame-child48" alt="" src="/polygon-6.svg" />
          <div className="frame-child49" />
        </div>
        <div className="rad-own-pfr-inner1" onClick={onFrameContainer12Click}>
          <div className="finish-review-wrapper">
            <div className="view-doctors-notes">Finish review</div>
          </div>
        </div>
        <div className="rad-own-pfr-inner2" onClick={onFrameContainer2Click}>
          <div className="add-notes-wrapper">
            <div className="view-doctors-notes">Add Impressions</div>
          </div>
        </div>
        <div className="rad-own-pfr-inner3" onClick={openRadOwnNotes}>
          <div className="view-own-notes-wrapper">
            <div className="view-doctors-notes">View own Impressions</div>
          </div>
        </div>
        <img className="rad-own-pfr-child2" alt="" src="/rectangle-5907.svg" />
        <div className="rad-own-pfr-inner4" onClick={onFrameContainer4Click}>
          <div className="collaborate-with-authorized-re-wrapper">
            <div className="view-doctors-notes">
              Collaborate with Authorized Reps
            </div>
          </div>
        </div>
        <div className="rad-own-pfr-inner5" onClick={onFrameContainer5Click}>
          <div className="consult-other-radiologists-wrapper">
            <div className="view-doctors-notes">Consult Other Radiologists</div>
          </div>
        </div>
        <div className="rad-own-pfr-inner6" onClick={openRadOwnOtherRadNotes}>
          <div className="view-other-radiologists-notes-wrapper">
            <div className="view-doctors-notes">
              View Other Radiologist’s Impressions
            </div>
          </div>
        </div>
        <b className="annotations-by-other">
          Annotations by other Radiologists
        </b>
        <img
          className="annotely-image-1-1"
          alt=""
          src="/annotely-image-1-1@2x.png"
        />
        <div className="rad-own-pfr-inner7" onClick={onFrameContainer7Click}>
          <div className="back-wrapper10">
            <div className="view-doctors-notes">Back</div>
          </div>
        </div>
        <div className="rad-own-pfr-child3" />
        <div className="rad-own-pfr-child4" />
        <img className="rad-own-pfr-child5" alt="" src="/rectangle-5913.svg" />
        <img className="rad-own-pfr-child6" alt="" src="/polygon-5.svg" />
        <img className="rad-own-pfr-child7" alt="" src="/polygon-6.svg" />
        <div className="rad-own-pfr-child8" />
        <div className="rad-own-pfr-inner8">
          <div className="view-other-radiologists-detai-wrapper">
            <div className="view-doctors-notes">
              View Other Radiologist’s Details
            </div>
          </div>
        </div>

      </div>
        
      {isDicomViewerOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeDicomViewer}
        >
          <DicomViewer 
            imagelink ={imageURL}
          />
        </PortalPopup>
      )}
      {isNPUserOptionsOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeNPUserOptions}
        >
          <NPUserOptions onClose={closeNPUserOptions} />
        </PortalPopup>
      )}
      {isRadOwnDocNotesOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeRadOwnDocNotes}
        >
          <RadOwnDocNotes onClose={closeRadOwnDocNotes} />
        </PortalPopup>
      )}
      {isRadOwnNotesOpen && (
        <div className="overlay">
          <div className="editorContainer">
            <textarea
              className="editorTextarea"
              placeholder="Type your notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <button className="saveBtn" onClick={saveNotes}>Save</button>
            <button className="closeBtn" onClick={closeRadOwnNotes}>Close</button>
          </div>
        </div>
      )}
      {isRadOwnOtherRadNotesOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeRadOwnOtherRadNotes}
        >
          <RadOwnOtherRadNotes onClose={closeRadOwnOtherRadNotes} />
        </PortalPopup>
      )}

{isNotificationsOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Top right"
          onOutsideClick={closeNotifications}
        >
          <div className="notification-container">
            <h2 className="notification-heading">Notifications</h2>
            <div className="message-container">
                {allChatNotifs.map((message, index) => (
                    <div className="message" key={index}>
                        <div className="message-content">{message}</div>
                        <div className="buttons-container">
                            <button className="reply-button">Reply</button>
                            <button className="ignore-button">Ignore</button>
                            <button className="clear-button" onClick={() => deleteChatID(index)}>Clear</button>
                        </div>
                    </div>
                
                ))}
                {allConsentRequestNotifications.map((message, index) => (
                    <div className="message" key={index}>
                        <div className="message-content">{message}</div>
                        <div className="buttons-container">
                            <button className="reply-button">Fill Consent Form</button>
                            <button className="clear-button">Clear</button>
                        </div>
                    </div>
                ))}
                {allOneWayNotifications.map((message, index) => (
                    <div className="message" key={index}>
                        <div className="message-content">{message}</div>
                        <div className="buttons-container">
                            <button className="clear-button">Clear</button>
                        </div>
                    </div>
                ))}
                <button className="clear-button"onClick={deleteAllChatNotifs}>Clear All Chat Notifications</button>

            </div>
        </div>
          
        </PortalPopup>
      )}
    </>
  );
};

export default RadOwnPfr;

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation for accessing route data
import "./EditTemplate.css";

const CampaignBuilder = () => {
  const [emailContent, setEmailContent] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const navigate = useNavigate();

  const location = useLocation(); // Use useLocation to get data from the selected template
  // Use useEffect to set the email content if template data is provided
  useEffect(() => {
    if (location.state && location.state.template) {
      setEmailContent(location.state.template.content); // Assuming your template has a 'content' property
    }
  }, [location.state]);

  const handleSave = () => {
    setShowSaveModal(true);
  };

  const handlePreview = () => {
    setPreviewContent(emailContent);
  };

  const handleDelete = () => {
    setEmailContent("");
    setShowDeleteModal(false);
    console.log("Template deleted successfully!");
  };

  const handleShowDeleteModal = () => {
    if (emailContent) {
      setShowDeleteModal(true);
    } else {
      setNotificationMessage(
        "No template to delete. Please add a template first."
      );
      setShowNotificationModal(true);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleCloseNotificationModal = () => {
    setShowNotificationModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCloseSaveModal = () => {
    setShowSaveModal(false);
  };

  return (
    <div className="campaign-builder">
      <header className="campaign-builder-header">
        <h2 style={{ color: "orange" }}>Campaign Builder</h2>
        <div className="header-buttons">
          <button className="nav-button" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="nav-button" onClick={handleShowDeleteModal}>
            Delete
          </button>
          <button className="nav-button" onClick={handleSave}>
            Save
          </button>
          <button className="nav-button" onClick={handlePreview}>
            Preview
          </button>
        </div>
      </header>

      <div className="builder-container">
        <div className="email-builder">
          <h3 style={{ color: "orange" }}>Email Builder</h3>
          <CKEditor
            editor={ClassicEditor}
            data={emailContent}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEmailContent(data);
            }}
            config={{
              ckfinder: {
                uploadUrl: "your/upload/endpoint", // Your upload endpoint
              },
              image: {
                toolbar: [
                  "imageTextAlternative",
                  "imageStyle:alignLeft",
                  "imageStyle:alignCenter",
                  "imageStyle:alignRight",
                ],
              },
            }}
          />
        </div>

        <div className="personalization-options">
          <h3 style={{ color: "orange" }}>Preview:</h3>
          <div dangerouslySetInnerHTML={{ __html: emailContent }} />
        </div>
      </div>

      <h3 style={{ color: "orange" }}>Real-Time Preview Pane</h3>
      <div className="preview-pane">
        <div className="email-preview">
          <div
            className="email-preview-content"
            dangerouslySetInnerHTML={{
              __html: previewContent || "<p>No content to preview</p>",
            }}
          />
        </div>
      </div>

      {/* Confirmation Modal for Delete */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Confirm Delete</h4>
            <p>Are you sure you want to delete this template?</p>
            <button className="modal-button" onClick={handleDelete}>
              Yes, Delete
            </button>
            <button className="modal-button" onClick={handleCloseDeleteModal}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notification Modal for No Template */}
      {showNotificationModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Notification</h4>
            <p>{notificationMessage}</p>
            <button
              className="modal-button"
              onClick={handleCloseNotificationModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Edit Mode</h4>
            <p>Edit mode enabled!</p>
            <button className="modal-button" onClick={handleCloseEditModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Save Successful</h4>
            <p>Campaign saved successfully!</p>
            <button className="modal-button" onClick={handleCloseSaveModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignBuilder;

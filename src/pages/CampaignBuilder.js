import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState } from "react";
import "./CampaignBuilder.css";

const CampaignBuilder = () => {
  const [emailContent, setEmailContent] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const templates = [
    {
      id: 1,
      name: "Template 1",
      content:
        "<h1>Welcome to Our Newsletter!</h1><p>This is the content for Template 1.</p>",
    },
    {
      id: 2,
      name: "Template 2",
      content:
        "<h1>Special Offer Just for You!</h1><p>This is the content for Template 2.</p>",
    },
    {
      id: 3,
      name: "Template 3",
      content:
        "<h1>Stay Updated!</h1><p>This is the content for Template 3.</p>",
    },
  ];

  const handleEdit = () => {
    setShowEditModal(true);
  };

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

  const handleTemplateClick = (templateContent) => {
    setEmailContent(templateContent);
  };

  return (
    <>
      <div className="campaign-builder">
        <header className="campaign-builder-header">
          <h2 style={{ color: "orange" }}>Campaign Builder</h2>
          <div className="header-buttons">
            <button className="nav-button" onClick={handleEdit}>
              Edit
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
            />
          </div>

          <div className="personalization-options">
            <h3 style={{ color: "orange" }}>Personalization Options</h3>
            <div className="personalization-preview">
              <h4 style={{ color: "orange" }}>Preview:</h4>
              <div dangerouslySetInnerHTML={{ __html: emailContent }} />
            </div>
          </div>
        </div>

        <h3 style={{ color: "orange" }}>Real-Time Preview Pane</h3>
        <div className="preview-pane">
          <div className="email-preview">
            <div
              className="email-preview-content" // Added a class for potential further styling
              dangerouslySetInnerHTML={{
                __html: previewContent || "<p>No content to preview</p>",
              }}
            />
          </div>
        </div>

        <div className="template-gallery">
          <h3 style={{ color: "orange" }}>Template Gallery</h3>
          <div className="templates">
            {templates.map((template) => (
              <div
                key={template.id}
                className="template"
                onClick={() => handleTemplateClick(template.content)}
                style={{ cursor: "pointer" }}
              >
                {template.name}
              </div>
            ))}
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
    </>
  );
};

export default CampaignBuilder;

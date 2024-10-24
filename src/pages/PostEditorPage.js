import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { saveDraft, saveDraftAndSendForReview } from "../api/contentService";
// import {savaDraft, saveDraftAndSendForReview} from "../api/contentService";
function PostEditorPage() {
  const location = useLocation();
  const { contentData } = location.state || {};

  const [postTitle, setPostTitle] = useState(contentData?.title || "");
  const [postBody, setPostBody] = useState(contentData?.body || "");
  const [contentType, setContentType] = useState(contentData?.content_type || 1);
  const [category, setCategory] = useState(contentData?.category || "Business");
  const [tags, setTags] = useState(contentData?.tags || "");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(contentData?.image || "");
  const [metaTitle, setMetaTitle] = useState(contentData?.meta_title || "");
  const [metaDescription, setMetaDescription] = useState(
    contentData?.meta_description || ""
  );
  const [metaKeywords, setMetaKeywords] = useState(
    contentData?.meta_keywords || ""
  );
  const [draftId, setDraftId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleSaveAsDraft = () => {
    setIsModalOpen(true);
  };

  const handleSaveDraft = async () => {
    const draftData = {
      title: postTitle,
      category,
      tags: tags,
      content_body: postBody,
      banner_image: imageFile,
      meta_title: metaTitle,
      meta_description: metaDescription,
      meta_keywords: metaKeywords,
      content_type_id: contentType,  // Pass the content type to the backend (1 for Blog, 2 for Case Study)
    };

    try {
      const response = await saveDraft(draftData);
      setDraftId(response.id);
      navigate("/unpublished-content");
    } catch (error) {
      console.error("Failed to save draft", error);
      alert("Failed to save draft");
    }
  };

  const handleSaveDraftAndSendForReview = async () => {
    const draftData = {
      title: postTitle,
      category,
      tags: tags,
      content_body: postBody,
      banner_image: imageFile,
      meta_title: metaTitle,
      meta_description: metaDescription,
      meta_keywords: metaKeywords,
      review_status: "in_review",
      content_type_id: contentType, // Pass the content type to the backend
    };

    try {
      const response = await saveDraftAndSendForReview(draftData);
      setDraftId(response.id);
      navigate("/unpublished-content");
    } catch (error) {
      console.error("Failed to save draft and send for review", error);
      alert("Failed to save draft and send for review");
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate("/")}>
          &#x2190;
        </button>
        <h1 style={styles.headerTitle}>Edit Post</h1>
      </div>

      <div style={styles.editorContainer}>
        <div style={styles.editorContent}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={styles.input}
            >
              <option value="Business">Business</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          {/* Content Type Selector */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Content Type</label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value === "1" ? 1 : 2)} // 1 for Blog, 2 for Case Study
              style={styles.input}
            >
              <option value="1">Blog</option>
              <option value="2">Case Study</option>
            </select>
          </div>


          <div style={styles.formGroup}>
            <label style={styles.label}>Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Add tags, separated by commas..."
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Banner/Thumbnail Image</label>
            <div {...getRootProps({ style: styles.dropzone })}>
              <input {...getInputProps()} />
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={styles.imagePreview}
                />
              ) : (
                <p style={styles.dropzoneText}>Drop or open an image</p>
              )}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Content Body</label>
            <div style={styles.editorWrapper}>
              <CKEditor
                editor={ClassicEditor}
                data={postBody}
                onChange={(event, editor) => setPostBody(editor.getData())}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    "blockQuote",
                    "|",
                    "bulletedList",
                    "numberedList",
                    "indent",
                    "outdent",
                    "|",
                    "link",
                    "insertTable",
                    "|",
                    "undo",
                    "redo",
                  ],
                }}
              />
            </div>
          </div>
        </div>

        <div style={styles.rightSidebar}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Meta Title</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Meta Description</label>
            <input
              type="text"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Meta Keywords</label>
            <input
              type="text"
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <button onClick={handleCancel} style={styles.cancelButton}>
          Cancel
        </button>
        <button onClick={handleSaveAsDraft} style={styles.saveDraftButton}>
          Save
        </button>
      </div>

      {isModalOpen && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContainer}>
            <div style={styles.modalActions}>
              <button onClick={handleSaveDraft} style={styles.modalButton}>
                Save as Draft
              </button>
              <button
                onClick={handleSaveDraftAndSendForReview}
                style={styles.modalButton}
              >
                Save Draft and send for Review
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                style={styles.modalCloseButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "200px", // Adjusts based on side navigation
    padding: "40px",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxWidth: "1200px",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "1px solid #ddd",
  },
  backButton: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#FF6F00",
  },
  headerTitle: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "24px",
    color: "#FF6F00",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  editorContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "1200px",
    marginRight: "0px", // Removed extra padding/margin
    flexWrap: "wrap", // Allows wrapping of editorContent and rightSidebar
  },
  editorContent: {
    flex: 2,
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginRight: "20px", // Ensure some right margin for large screens
    minWidth: "300px", // Min width for responsiveness
  },
  rightSidebar: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    minWidth: "300px", // Min width for responsiveness
    marginTop: "20px", // Added margin for small screens
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "2px solid #FF6F00",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  dropzone: {
    border: "2px dashed #FF6F00",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  dropzoneText: {
    color: "#888",
  },
  imagePreview: {
    maxWidth: "100%",
    maxHeight: "200px",
    borderRadius: "4px",
  },
  editorWrapper: {
    marginTop: "10px",
    border: "1px solid #FF6F00",
    borderRadius: "4px",
    padding: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "1200px",
    marginTop: "20px",
    flexWrap: "wrap", // Stack buttons if necessary
  },
  cancelButton: {
    backgroundColor: "#f44336",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    marginBottom: "10px", // Ensure spacing on smaller screens
  },
  saveDraftButton: {
    backgroundColor: "green",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    marginBottom: "10px", // Ensure spacing on smaller screens
  },
  // Modal styles
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // Dark transparent background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensure it's on top of other elements
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Deeper shadow for modal
    width: "90%", // Responsive width
    maxWidth: "500px", // Limit modal width on large screens
    textAlign: "center",
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  modalButton: {
    backgroundColor: "#FF6F00",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  modalCloseButton: {
    backgroundColor: "#f44336",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  // Responsive adjustments with media queries
  "@media (max-width: 1024px)": {
    pageContainer: {
      marginLeft: "0", // Remove margin for side navigation on smaller screens
      padding: "20px",
    },
    editorContainer: {
      flexDirection: "column", // Stack editor and sidebar vertically
    },
    editorContent: {
      marginRight: "0", // No margin needed in stacked layout
    },
    rightSidebar: {
      marginTop: "0", // Align right sidebar with editor on smaller screens
    },
    buttonContainer: {
      flexDirection: "column", // Stack buttons vertically on small screens
    },
  },
  "@media (max-width: 768px)": {
    editorContainer: {
      flexDirection: "column", // Stack editor and sidebar vertically on smaller screens
    },
    rightSidebar: {
      width: "100%", // Full width for sidebar on small screens
    },
    buttonContainer: {
      justifyContent: "center", // Center buttons on smaller screens
    },
    cancelButton: {
      width: "100%", // Full width buttons on small screens
    },
    saveDraftButton: {
      width: "100%", // Full width buttons on small screens
    },
  },
};

export default PostEditorPage;

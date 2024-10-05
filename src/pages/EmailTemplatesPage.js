import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import emailTemplates from "./emailTemplatesData.json"; // Import JSON data
import "./EmailTemplatesPage.css"; // Import styles

const EmailTemplatesPage = () => {
  const navigate = useNavigate(); // Create navigate function
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [themeFilter, setThemeFilter] = useState("");
  const [designFilter, setDesignFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const templatesPerPage = 15;

  // Filter logic
  const filteredTemplates = emailTemplates.filter((template) => {
    return (
      (searchTerm === "" ||
        template.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (themeFilter === "" || template.theme === themeFilter) &&
      (designFilter === "" || template.design === designFilter)
    );
  });

  // Pagination logic
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = filteredTemplates.slice(
    indexOfFirstTemplate,
    indexOfLastTemplate
  );
  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);

  const handleEditTemplate = () => {
    if (selectedTemplate) {
      // Navigate to the edit-template page and pass the selected template's data
      navigate("/edit-template", { state: { template: selectedTemplate } });

      setSelectedTemplate(null); // Deselect template after navigating
    }
  };

  const handleDeleteTemplate = () => {
    console.log("Template deleted:", selectedTemplate);
    setShowDeleteConfirmation(false);
    setSelectedTemplate(null); // Close modal after deletion
  };

  return (
    <>
      <div className="email-template-container">
        <h1 className="header">Email Templates Gallery</h1>

        {/* Search and Filter Section */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />

          <select
            value={themeFilter}
            onChange={(e) => setThemeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Themes</option>
            <option value="Promotional">Promotional</option>
            <option value="Corporate">Corporate</option>
            <option value="Event">Event</option>
          </select>

          <select
            value={designFilter}
            onChange={(e) => setDesignFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Designs</option>
            <option value="Creative">Creative</option>
            <option value="Minimal">Minimal</option>
            <option value="Elegant">Elegant</option>
          </select>
        </div>

        {/* Email Templates Gallery */}
        <div className="template-grid">
          {currentTemplates.map((template) => (
            <div
              key={template.id}
              className="template-card"
              onClick={() => {
                setSelectedTemplate(template); // Open template detail
              }}
            >
              <img
                src={template.imageUrl}
                alt={template.name}
                className="template-img"
              />
              <h3>{template.name}</h3>
              <p>Theme: {template.theme}</p>
              <p>Design: {template.design}</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {/* Template Detail Modal */}
        {selectedTemplate && (
          <div className="template-detail-modal">
            <div>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="close-btn"
              >
                Close
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(true)}
                className="delete-btn"
              >
                Delete
              </button>
              <button className="edit-btn" onClick={handleEditTemplate}>
                Edit
              </button>
              <h1>{selectedTemplate.name}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: selectedTemplate.content }}
              />
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirmation && (
          <div className="delete-confirmation-modal">
            <div>
              <h2>Are you sure you want to delete this template?</h2>
              <button
                onClick={handleDeleteTemplate}
                className="confirm-delete-btn"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="cancel-delete-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmailTemplatesPage;

// *****************************LAst wotking code***********************************************************

// import React, { useState } from "react";
// import emailTemplates from "./emailTemplatesData.json"; // Import JSON data
// import "../styles/EmailTemplatesPage.css"; // Import styles

// const EmailTemplatesPage = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [themeFilter, setThemeFilter] = useState("");
//   const [designFilter, setDesignFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const templatesPerPage = 15;

//   // Filter logic
//   const filteredTemplates = emailTemplates.filter((template) => {
//     return (
//       (searchTerm === "" ||
//         template.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
//       (themeFilter === "" || template.theme === themeFilter) &&
//       (designFilter === "" || template.design === designFilter)
//     );
//   });

//   // Pagination logic
//   const indexOfLastTemplate = currentPage * templatesPerPage;
//   const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
//   const currentTemplates = filteredTemplates.slice(
//     indexOfFirstTemplate,
//     indexOfLastTemplate
//   );
//   const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);

//   return (
//     <div className="email-template-container">
//       <h1 className="header">Email Templates Gallery</h1>

//       {/* Search and Filter Section */}
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-bar"
//         />

//         <select
//           value={themeFilter}
//           onChange={(e) => setThemeFilter(e.target.value)}
//           className="filter-select"
//         >
//           <option value="">All Themes</option>
//           <option value="Promotional">Promotional</option>
//           <option value="Corporate">Corporate</option>
//           <option value="Event">Event</option>
//         </select>

//         <select
//           value={designFilter}
//           onChange={(e) => setDesignFilter(e.target.value)}
//           className="filter-select"
//         >
//           <option value="">All Designs</option>
//           <option value="Creative">Creative</option>
//           <option value="Minimal">Minimal</option>
//           <option value="Elegant">Elegant</option>
//         </select>
//       </div>

//       {/* Email Templates Gallery */}
//       <div className="template-grid">
//         {currentTemplates.map((template) => (
//           <div
//             key={template.id}
//             className="template-card"
//             onClick={() => setSelectedTemplate(template)} // Open template detail
//           >
//             <img
//               src={template.imageUrl}
//               alt={template.name}
//               className="template-img"
//             />
//             <h3>{template.name}</h3>
//             <p>Theme: {template.theme}</p>
//             <p>Design: {template.design}</p>
//           </div>
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       <div className="pagination-controls">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Prev
//         </button>
//         <span>{`Page ${currentPage} of ${totalPages}`}</span>
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>

//       {/* Template Detail Modal */}
//       {selectedTemplate && (
//         <div className="template-detail-modal">
//           <button
//             onClick={() => setSelectedTemplate(null)}
//             className="close-btn"
//           >
//             Close
//           </button>

//           <h1>{selectedTemplate.name}</h1>
//           <div dangerouslySetInnerHTML={{ __html: selectedTemplate.content }} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmailTemplatesPage;

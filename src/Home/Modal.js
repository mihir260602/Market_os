// // // import React from 'react';
// // // import './Modal.css'; // Make sure to import your modal styles

// // // const Modal = ({ isOpen, onClose, blog }) => {
// // //   if (!isOpen || !blog) return null; // Don't render anything if not open

// // //   const downloadContent = () => {
// // //     const blob = new Blob([`Title: ${blog.title}\n\nDescription: ${blog.description}\n\nContent:\n${blog.content}`], {
// // //       type: 'text/plain',
// // //     });
// // //     const link = document.createElement('a');
// // //     link.href = URL.createObjectURL(blob);
// // //     link.download = `${blog.title}.txt`; // Name the file with the blog title
// // //     link.click();
// // //   };

// // //   const handleOverlayClick = (e) => {
// // //     // Check if the click is outside the modal content
// // //     if (e.target.classList.contains('modal-overlay')) {
// // //       onClose();
// // //     }
// // //   };
// // //   const raiseTicket = () => {
// // //     // Logic for raising a ticket (e.g., open a form, redirect to another page, or send data)
// // //     alert('Ticket raised successfully!');
// // //     onClose(); // Close the modal after raising the ticket
// // //   };
// // //   return (
// // //     <div className="modal-overlay" onClick={onClose}>
// // //     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// // //       <h2 className="modal-title">{blog.title}</h2>
// // //       <img src={blog.image} alt={blog.title} className="modal-image" />
// // //       <div className="modal-description">{blog.content}</div> {/* Display full content here */}
// // //       <div className="modal-meta">
// // //         <span className="modal-date">{blog.date}</span>
// // //         <span className="modal-author">{blog.author}</span>
// // //         <span className="modal-category">{blog.category}</span>
// // //         <span className="download-icon" onClick={downloadContent}>
// // //           <i className="fas fa-download"></i> Download
// // //         </span>
// // //       </div>
// // //       <div className="modal-footer">
// // //           <button className="raise-ticket-button" onClick={raiseTicket}>
// // //             Raise Ticket
// // //           </button>
// // //         </div>
// // //     </div>
// // //   </div>
// // //   );
// // // };

// // // export default Modal;

// // import React from 'react';
// // import './Modal.css';

// // const Modal = ({ isOpen, onClose, blog }) => {
// //   if (!isOpen || !blog) return null; // Don't render anything if not open

// //   const downloadContent = () => {
// //     const blob = new Blob([`Title: ${blog.title}\n\nDescription: ${blog.description}\n\nContent:\n${blog.content_body}`], {
// //       type: 'text/plain',
// //     });
// //     const link = document.createElement('a');
// //     link.href = URL.createObjectURL(blob);
// //     link.download = `${blog.title}.txt`; // Name the file with the blog title
// //     link.click();
// //   };

// //   const handleOverlayClick = (e) => {
// //     if (e.target.classList.contains('modal-overlay')) {
// //       onClose();
// //     }
// //   };

// //   return (
// //     <div className="modal-overlay" onClick={handleOverlayClick}>
// //       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //         <h2 className="modal-title">{blog.title}</h2>
// //         <img src={blog.banner_image} alt={blog.title} className="modal-image" />
// //         <div className="modal-description">{blog.content_body}</div> {/* Display full content here */}
// //         <div className="modal-meta">
// //           <span className="modal-date">{new Date(blog.created_at).toLocaleDateString()}</span>
// //           <span className="modal-author">{blog.author_name}</span>
// //           <span className="modal-category">{blog.category}</span>
// //           <span className="download-icon" onClick={downloadContent}>
// //             <i className="fas fa-download"></i> Download
// //           </span>
// //         </div>
// //         <div className="modal-footer">
// //           <button className="raise-ticket-button" onClick={() => alert('Ticket raised successfully!')}>Raise Ticket</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Modal;

// import React from 'react';
// import './Modal.css';
// import {getPostImageUrl} from "../api/contentService";

// const Modal = ({ isOpen, onClose, blog }) => {
//   if (!isOpen || !blog) return null; // Don't render anything if not open

//   // const defaultImageUrl = 'https://img.freepik.com/free-vector/abstract-realistic-particle-background_23-2148409681.jpg?uid=R166381745&ga=GA1.1.216503604.1725175554&semt=ais_hybrid';

//   const downloadContent = () => {
//     const blob = new Blob([`Title: ${blog.title}\n\nDescription: ${blog.description}\n\nContent:\n${blog.content_body}`], {
//       type: 'text/plain',
//     });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = `${blog.title}.txt`; // Name the file with the blog title
//     link.click();
//   };

//   const handleOverlayClick = (e) => {
//     if (e.target.classList.contains('modal-overlay')) {
//       onClose();
//     }
//   };

//   const isImageValid = (url) => {
//     return url && (url.startsWith('http://') || url.startsWith('https://')); // Check if URL is valid
//   };

//   return (
//     <div className="modal-overlay" onClick={handleOverlayClick}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <h2 className="modal-title">{blog.title}</h2>
//         {/* Use isImageValid to check if banner_image is valid */}
//         <img
//           src={isImageValid(blog.banner_image) ? blog.banner_image : defaultImageUrl}
//           alt={blog.title}
//           className="modal-image"
//         />
//         <div className="modal-description">{blog.content_body}</div> {/* Display full content here */}
//         <div className="modal-meta">
//           <span className="modal-date">{new Date(blog.created_at).toLocaleDateString()}</span>
//           <span className="modal-author">{blog.author_name}</span>
//           <span className="modal-category">{blog.category}</span>
//           <span className="download-icon" onClick={downloadContent}>
//             <i className="fas fa-download"></i> Download
//           </span>
//         </div>
//         {/* <div className="modal-footer">
//           <button className="raise-ticket-button" onClick={() => alert('Ticket raised successfully!')}>Raise Ticket</button>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React from "react";
import { getPostImageUrl } from "../api/contentService"; // Import the function to get image URL
import "./Modal.css";

const Modal = ({ isOpen, onClose, blog }) => {
  if (!isOpen || !blog) return null; // Don't render anything if not open

  // Function to download content as a text file
  const downloadContent = () => {
    const blob = new Blob(
      [
        `Title: ${blog.title}\n\nDescription: ${blog.description}\n\nContent:\n${blog.content_body}`,
      ],
      {
        type: "text/plain",
      }
    );
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${blog.title}.txt`; // Name the file with the blog title
    link.click();
  };

  // Handle closing the modal when clicking outside the content area
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  // Check if the image URL is valid (starts with http or https)
  const isImageValid = (url) => {
    return url && (url.startsWith("http://") || url.startsWith("https://"));
  };

  // Fetch the image URL from the blog data
  const imageUrl = getPostImageUrl(blog); // Assuming blog has a 'banner_image' field

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{blog.title}</h2>
        {/* Check if image URL is valid before rendering the image */}
        {isImageValid(imageUrl) ? (
          <img src={imageUrl} alt={blog.title} className="modal-image" />
        ) : (
          <div className="modal-no-image">No Image Available</div>
        )}
        <div className="modal-description">{blog.content_body}</div>{" "}
        {/* Display full content here */}
        <div className="modal-meta">
          <span className="modal-date">
            {new Date(blog.created_at).toLocaleDateString()}
          </span>
          <span className="modal-author">{blog.author_name}</span>
          <span className="modal-category">{blog.category}</span>
          <span className="download-icon" onClick={downloadContent}>
            <i className="fas fa-download"></i> Download
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;

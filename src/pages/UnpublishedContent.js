// // import React, { useEffect, useState } from "react";
// // import Card from "@mui/material/Card";
// // import Box from "@mui/material/Box";
// // import Typography from "@mui/material/Typography";
// // import { useNavigate } from "react-router-dom";
// // import { useTable, usePagination } from "react-table";
// // import {
// //   fetchDrafts,
// //   deleteContent,
// //   fetchDraftById,
// //   updateDraft,
// // } from "../api/contentService"; // Ensure deleteContent is imported
// // import "./UnpublishedContent.css"; // Import the CSS file

// // // Import Material-UI Dialog components
// // import Dialog from "@mui/material/Dialog";
// // import DialogTitle from "@mui/material/DialogTitle";
// // import DialogContent from "@mui/material/DialogContent";
// // import DialogActions from "@mui/material/DialogActions";
// // import Button from "@mui/material/Button";
// // import { format } from "date-fns";

// // function UnpublishedContent() {
// //   const [contentList, setContentList] = useState([]); // Hold the content list data
// //   const [open, setOpen] = useState(false); // State for the modal visibility
// //   const [contentIdToDelete, setContentIdToDelete] = useState(null); // ID of the content to delete
// //   const navigate = useNavigate();
// //   const formatDate = (isoString) => {
// //     return format(new Date(isoString), "MMMM dd, yyyy, hh:mm:ss a");
// //   };

// //   useEffect(() => {
// //     const getUnpublishedContentList = async () => {
// //       try {
// //         const response = await fetchDrafts();
// //         console.log("API Response:", response);

// //         // Check if the response is an array or if it's wrapped in an object
// //         if (Array.isArray(response)) {
// //           setContentList(response); // Directly set response if it's an array
// //         } else if (response && response.results) {
// //           setContentList(response.results); // Handle cases where data is inside "results"
// //         } else {
// //           console.error("Unexpected response structure", response);
// //           setContentList([]); // Set an empty array if no valid data is found
// //         }
// //       } catch (error) {
// //         console.error("Error fetching unpublished content list:", error);
// //       }
// //     };
// //     getUnpublishedContentList();
// //   }, []);

// //   // Handle edit action
// //   const handleEdit = async (contentId) => {
// //     const content = await fetchDraftById(contentId);
// //     navigate(`/edit-unpublish-content/${contentId}`, {
// //       state: {
// //         contentData: {
// //           title: content.title, // Pass the selected title
// //           body: content.content_body, // Pass the generated content
// //           category: content.category,
// //           tags: content.tags,
// //           meta_title: content.meta_title,
// //           meta_description: content.meta_description,
// //           image: content.banner_image,
// //           meta_keywords: content.meta_keywords,
// //         },
// //       },
// //     });
// //   };

// //   // Open the delete confirmation modal
// //   const handleDeleteClick = (contentId) => {
// //     setContentIdToDelete(contentId);
// //     setOpen(true);
// //   };

// //   // Confirm deletion
// //   const handleConfirmDelete = async () => {
// //     try {
// //       await deleteContent(contentIdToDelete); // Call your delete API function
// //       setContentList((prevList) =>
// //         prevList.filter((content) => content.id !== contentIdToDelete)
// //       ); // Remove the deleted content from the list
// //       setOpen(false); // Close the modal
// //     } catch (error) {
// //       console.error("Error deleting content:", error);
// //     }
// //   };

// //   const handlePublish = async (contentId) => {
// //     // const content = await fetchDraftById(contentId);
// //     const draftData = {
// //       status: "published",
// //       review_status: "reviewed",
// //     };

// //     try {
// //       const response = await updateDraft(contentId, draftData);
// //       navigate("/unpublished-content");
// //     } catch (error) {
// //       console.error("Failed to publish draft", error);
// //       alert("Failed to publish draft");
// //     }
// //   };

// //   // Cancel deletion
// //   const handleCancelDelete = () => {
// //     setOpen(false); // Close the modal without deleting
// //   };

// //   // Define columns for the DataTable
// //   const columns = React.useMemo(
// //     () => [
// //       {
// //         Header: "Title",
// //         accessor: "title",
// //         Cell: ({ row }) => (
// //           <Typography variant="caption" className="table-title">
// //             {row.original.title}
// //           </Typography>
// //         ),
// //       },
// //       {
// //         Header: "Author",
// //         accessor: "author_name",
// //         Cell: ({ value }) => (
// //           <Typography className="table-data">{value || "—"}</Typography>
// //         ),
// //       },
// //       {
// //         Header: "Status",
// //         accessor: "review_status",
// //         Cell: ({ value }) => (
// //           <Typography className="table-data">{value || "—"}</Typography>
// //         ),
// //       },
// //       {
// //         Header: "Updated Date",
// //         accessor: "updated_at",
// //         Cell: ({ value }) => (
// //           <Typography className="table-data">
// //             {formatDate(value) || "—"}
// //           </Typography>
// //         ),
// //       },
// //       {
// //         Header: "Actions",
// //         Cell: ({ row }) => (
// //           <div className="table-actions">
// //             <button
// //               className="edit-btn"
// //               onClick={() => handleEdit(row.original.id)}
// //             >
// //               Edit
// //             </button>
// //             <button
// //               className="edit-btn"
// //               onClick={() => handlePublish(row.original.id)}
// //             >
// //               Publish
// //             </button>
// //             <button
// //               className="delete-btn"
// //               onClick={() => handleDeleteClick(row.original.id)} // Open modal on delete click
// //             >
// //               Delete
// //             </button>
// //           </div>
// //         ),
// //       },
// //     ],
// //     []
// //   );

// //   const {
// //     getTableProps,
// //     getTableBodyProps,
// //     headerGroups,
// //     prepareRow,
// //     page,
// //     nextPage,
// //     previousPage,
// //     canNextPage,
// //     canPreviousPage,
// //     state: { pageIndex, pageSize },
// //   } = useTable(
// //     {
// //       columns,
// //       data: contentList,
// //       initialState: { pageIndex: 0, pageSize: 4 }, // Show 10 results at a time
// //     },
// //     usePagination
// //   );

// //   return (
// //     <div>
// //       <div className="main-content">
// //         <Card className="card-container">
// //           <Box className="header-container">
// //             <Typography variant="h6" gutterBottom>
// //               Unpublished Contents
// //             </Typography>
// //           </Box>
// //           <Box className="table-container">
// //             <table {...getTableProps()} className="styled-table">
// //               <thead>
// //                 {headerGroups.map((headerGroup) => (
// //                   <tr
// //                     {...headerGroup.getHeaderGroupProps()}
// //                     className="table-header"
// //                   >
// //                     {headerGroup.headers.map((column) => (
// //                       <th {...column.getHeaderProps()}>
// //                         {column.render("Header")}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 ))}
// //               </thead>
// //               <tbody {...getTableBodyProps()}>
// //                 {page.map((row) => {
// //                   prepareRow(row);
// //                   return (
// //                     <tr {...row.getRowProps()} className="table-row">
// //                       {row.cells.map((cell) => {
// //                         return (
// //                           <td {...cell.getCellProps()}>
// //                             {cell.render("Cell")}
// //                           </td>
// //                         );
// //                       })}
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </Box>
// //           {/* Pagination Controls */}
// //           <Box className="pagination-controls">
// //             <Button
// //               onClick={previousPage}
// //               disabled={!canPreviousPage}
// //               variant="contained"
// //               color="primary"
// //             >
// //               Previous
// //             </Button>
// //             <Typography>
// //               Page {pageIndex + 1} of {Math.ceil(contentList.length / pageSize)}
// //             </Typography>
// //             <Button
// //               onClick={nextPage}
// //               disabled={!canNextPage}
// //               variant="contained"
// //               color="primary"
// //             >
// //               Next
// //             </Button>
// //           </Box>
// //         </Card>
// //       </div>

// //       {/* Confirmation Modal */}
// //       <Dialog open={open} onClose={handleCancelDelete}>
// //         <DialogTitle>Confirm Deletion</DialogTitle>
// //         <DialogContent>
// //           <Typography>Are you sure you want to delete this content?</Typography>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleCancelDelete} color="primary">
// //             Cancel
// //           </Button>
// //           <Button onClick={handleConfirmDelete} color="secondary">
// //             Delete
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </div>
// //   );
// // }

// // export default UnpublishedContent;

// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import Typography from "@mui/material/Typography";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { usePagination, useTable } from "react-table";
// import {
//   deleteContent,
//   fetchDraftById,
//   fetchDrafts,
//   updateDraft,
// } from "../api/contentService"; // Ensure deleteContent is imported
// import "./UnpublishedContent.css"; // Import the CSS file

// // Import Material-UI Dialog components
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import { format } from "date-fns";

// function UnpublishedContent() {
//   const [contentList, setContentList] = useState([]); // Hold the content list data
//   const [open, setOpen] = useState(false); // State for the modal visibility
//   const [contentIdToDelete, setContentIdToDelete] = useState(null); // ID of the content to delete
//   const navigate = useNavigate();
//   const formatDate = (isoString) => {
//     return format(new Date(isoString), "MMMM dd, yyyy, hh:mm:ss a");
//   };

//   useEffect(() => {
//     const getUnpublishedContentList = async () => {
//       try {
//         const response = await fetchDrafts();
//         console.log("API Response:", response);

//         // Check if the response is an array or if it's wrapped in an object
//         if (Array.isArray(response)) {
//           setContentList(response); // Directly set response if it's an array
//         } else if (response && response.results) {
//           setContentList(response.results); // Handle cases where data is inside "results"
//         } else {
//           console.error("Unexpected response structure", response);
//           setContentList([]); // Set an empty array if no valid data is found
//         }
//       } catch (error) {
//         console.error("Error fetching unpublished content list:", error);
//       }
//     };
//     getUnpublishedContentList();
//   }, []);

//   // Handle edit action
//   const handleEdit = async (contentId) => {
//     const content = await fetchDraftById(contentId);
//     navigate(`/post-editor`, {
//       state: {
//         contentData: {
//           title: content.title, // Pass the selected title
//           body: content.content_body, // Pass the generated content
//           category: content.category,
//           tags: content.tags,
//           meta_title: content.meta_title,
//           meta_description: content.meta_description,
//           image: content.banner_image,
//           meta_keywords: content.meta_keywords,
//         },
//       },
//     });
//   };

//   // Open the delete confirmation modal
//   const handleDeleteClick = (contentId) => {
//     setContentIdToDelete(contentId);
//     setOpen(true);
//   };

//   // Confirm deletion
//   const handleConfirmDelete = async () => {
//     try {
//       await deleteContent(contentIdToDelete); // Call your delete API function
//       setContentList((prevList) =>
//         prevList.filter((content) => content.id !== contentIdToDelete)
//       ); // Remove the deleted content from the list
//       setOpen(false); // Close the modal
//     } catch (error) {
//       console.error("Error deleting content:", error);
//     }
//   };

//   const handlePublish = async (contentId) => {
//     const draftData = {
//       status: "published",
//       review_status: "reviewed",
//     };

//     try {
//       await updateDraft(contentId, draftData);
//       navigate("/unpublished-content");
//     } catch (error) {
//       console.error("Failed to publish draft", error);
//       alert("Failed to publish draft");
//     }
//   };

//   // Cancel deletion
//   const handleCancelDelete = () => {
//     setOpen(false); // Close the modal without deleting
//   };

//   // Define columns for the DataTable
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Title",
//         accessor: "title",
//         Cell: ({ row }) => (
//           <Typography variant="caption" className="table-title">
//             {row.original.title}
//           </Typography>
//         ),
//       },
//       {
//         Header: "Author",
//         accessor: "author_name",
//         Cell: ({ value }) => (
//           <Typography className="table-data">{value || "—"}</Typography>
//         ),
//       },
//       {
//         Header: "Status",
//         accessor: "review_status",
//         Cell: ({ value }) => (
//           <Typography className="table-data">{value || "—"}</Typography>
//         ),
//       },
//       {
//         Header: "Updated Date",
//         accessor: "updated_at",
//         Cell: ({ value }) => (
//           <Typography className="table-data">
//             {formatDate(value) || "—"}
//           </Typography>
//         ),
//       },
//       {
//         Header: "Actions",
//         Cell: ({ row }) => (
//           <div className="table-actions">
//             <button
//               className="edit-btn"
//               onClick={() => handleEdit(row.original.id)}
//             >
//               Edit
//             </button>
//             <button
//               className="edit-btn"
//               onClick={() => handlePublish(row.original.id)}
//             >
//               Publish
//             </button>
//             <button
//               className="delete-btn"
//               onClick={() => handleDeleteClick(row.original.id)} // Open modal on delete click
//             >
//               Delete
//             </button>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     prepareRow,
//     page,
//     nextPage,
//     previousPage,
//     canNextPage,
//     canPreviousPage,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data: contentList,
//       initialState: { pageIndex: 0, pageSize: 4 }, // Show 10 results at a time
//     },
//     usePagination
//   );

//   return (
//     <div>
//       <div className="main-content">
//         <Card className="card-container">
//           <Box className="header-container">
//             <Typography variant="h6" gutterBottom>
//               Unpublished Contents
//             </Typography>
//           </Box>
//           <Box className="table-container">
//             <table {...getTableProps()} className="styled-table">
//               <thead>
//                 {headerGroups.map((headerGroup) => (
//                   <tr
//                     {...headerGroup.getHeaderGroupProps()}
//                     className="table-header"
//                   >
//                     {headerGroup.headers.map((column) => (
//                       <th {...column.getHeaderProps()}>
//                         {column.render("Header")}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>
//               <tbody {...getTableBodyProps()}>
//                 {page.map((row) => {
//                   prepareRow(row);
//                   return (
//                     <tr {...row.getRowProps()} className="table-row">
//                       {row.cells.map((cell) => {
//                         return (
//                           <td {...cell.getCellProps()}>
//                             {cell.render("Cell")}
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </Box>
//           {/* Pagination Controls */}
//           <Box className="pagination-controls">
//             <Button
//               onClick={previousPage}
//               disabled={!canPreviousPage}
//               variant="contained"
//               color="primary"
//             >
//               Previous
//             </Button>
//             <Typography>
//               Page {pageIndex + 1} of {Math.ceil(contentList.length / pageSize)}
//             </Typography>
//             <Button
//               onClick={nextPage}
//               disabled={!canNextPage}
//               variant="contained"
//               color="primary"
//             >
//               Next
//             </Button>
//           </Box>
//         </Card>
//       </div>

//       {/* Confirmation Modal */}
//       <Dialog open={open} onClose={handleCancelDelete}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this content?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCancelDelete} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmDelete} color="secondary">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default UnpublishedContent;

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePagination, useTable } from "react-table";
import {
  deleteContent,
  fetchDraftById,
  fetchDrafts,
  updateDraft,
} from "../api/contentService";
import "./UnpublishedContent.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { format } from "date-fns";
import { raiseContentTicket } from "../api/ticketService";

function UnpublishedContent() {
  const [contentList, setContentList] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [contentIdToDelete, setContentIdToDelete] = useState(null);
  const [suggestion, setSuggestion] = useState(""); // State for suggestion input
  const navigate = useNavigate();
  const formatDate = (isoString) => format(new Date(isoString), "MMMM dd, yyyy, hh:mm:ss a");

  useEffect(() => {
    const getUnpublishedContentList = async () => {
      try {
        const response = await fetchDrafts();
        if (Array.isArray(response)) {
          setContentList(response);
        } else if (response && response.results) {
          setContentList(response.results);
        } else {
          console.error("Unexpected response structure", response);
          setContentList([]);
        }
      } catch (error) {
        console.error("Error fetching unpublished content list:", error);
      }
    };
    getUnpublishedContentList();
  }, []);

  const handleEdit = async (contentId) => {
    const content = await fetchDraftById(contentId);
    navigate(`/post-editor`, {
      state: {
        contentData: {
          title: content.title,
          body: content.content_body,
          category: content.category,
          tags: content.tags,
          meta_title: content.meta_title,
          meta_description: content.meta_description,
          image: content.banner_image,
          meta_keywords: content.meta_keywords,
        },
      },
    });
  };

  const handleDeleteClick = (contentId) => {
    setContentIdToDelete(contentId);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteContent(contentIdToDelete);
      setContentList((prevList) => prevList.filter((content) => content.id !== contentIdToDelete));
      setOpenDelete(false);
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  const handlePublish = async (contentId) => {
    const draftData = { status: "published", review_status: "reviewed" };
    try {
      await updateDraft(contentId, draftData);
      navigate("/unpublished-content");
    } catch (error) {
      console.error("Failed to publish draft", error);
      alert("Failed to publish draft");
    }
  };

  const handleCancelDelete = () => {
    setOpenDelete(false);
  };

  // New function to open the suggestion form
  const handleOpenSuggestion = (contentId) => {
    setContentIdToDelete(contentId); // Store the content ID to raise a ticket
    setOpenSuggestion(true); // Open the suggestion modal
  };

  // Handle suggestion submission
  const handleSubmitSuggestion = async () => {
    const ticketData = {
      title: "Suggestion",
      description: suggestion,
    };

    try {
      await raiseContentTicket(contentIdToDelete, ticketData); // Call the ticket creation API
      alert("Suggestion raised successfully!");
      setSuggestion(""); // Reset suggestion input
      setOpenSuggestion(false); // Close the suggestion modal
    } catch (error) {
      console.error("Failed to raise a suggestion", error);
      alert("Failed to raise a suggestion: " + error.response?.data?.detail || error.message);
    }
  };

  const handleCancelSuggestion = () => {
    setOpenSuggestion(false); // Close the suggestion modal without submission
    setSuggestion(""); // Clear the suggestion input
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ row }) => <Typography variant="caption" className="table-title">{row.original.title}</Typography>,
      },
      {
        Header: "Author",
        accessor: "author_name",
        Cell: ({ value }) => <Typography className="table-data">{value || "—"}</Typography>,
      },
      {
        Header: "Status",
        accessor: "review_status",
        Cell: ({ value }) => <Typography className="table-data">{value || "—"}</Typography>,
      },
      {
        Header: "Updated Date",
        accessor: "updated_at",
        Cell: ({ value }) => <Typography className="table-data">{formatDate(value) || "—"}</Typography>,
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="table-actions">
            <button className="edit-btn" onClick={() => handleEdit(row.original.id)}>Edit</button>
            <button className="edit-btn" onClick={() => handlePublish(row.original.id)}>Publish</button>
            <button className="delete-btn" onClick={() => handleDeleteClick(row.original.id)}>Delete</button>
            <button className="ticket-btn" onClick={() => handleOpenSuggestion(row.original.id)}>Raise Ticket</button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: contentList,
      initialState: { pageIndex: 0, pageSize: 4 },
    },
    usePagination
  );

  return (
    <div>
      <div className="main-content">
        <Card className="card-container">
          <Box className="header-container">
            <Typography variant="h6" gutterBottom>Unpublished Contents</Typography>
          </Box>
          <Box className="table-container">
            <table {...getTableProps()} className="styled-table">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="table-header">
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="table-row">
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
          <Box className="pagination-controls">
            <Button onClick={previousPage} disabled={!canPreviousPage} variant="contained" color="primary">Previous</Button>
            <Typography>Page {pageIndex + 1} of {Math.ceil(contentList.length / pageSize)}</Typography>
            <Button onClick={nextPage} disabled={!canNextPage} variant="contained" color="primary">Next</Button>
          </Box>
        </Card>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={openDelete} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this content?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Suggestion Modal */}
      <Dialog open={openSuggestion} onClose={handleCancelSuggestion}>
        <DialogTitle>Submit Suggestion</DialogTitle>
        <DialogContent>
          <Typography>Provide your suggestion:</Typography>
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            rows="4"
            style={{ width: "100%", marginTop: "8px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSuggestion} color="primary">Cancel</Button>
          <Button onClick={handleSubmitSuggestion} color="secondary">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UnpublishedContent;

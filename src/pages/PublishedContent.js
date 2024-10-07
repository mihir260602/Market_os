import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePagination, useTable } from "react-table";
import {
  deleteContent,
  fetchContentList,
  fetchDraftById, // Fetch published content by ID
} from "../api/contentService"; // Ensure deleteContent is imported
import "./PublishedContent.css"; // Import the CSS file

// Import Material-UI Dialog components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { format } from "date-fns";

function PublishedContent() {
  const [contentList, setContentList] = useState([]); // Hold the content list data
  const [open, setOpen] = useState(false); // State for the modal visibility
  const [contentIdToDelete, setContentIdToDelete] = useState(null); // ID of the content to delete
  const navigate = useNavigate();
  const formatDate = (isoString) => {
    return format(new Date(isoString), "MMMM dd, yyyy, hh:mm:ss a");
  };

  useEffect(() => {
    const getPublishedContentList = async () => {
      try {
        const response = await fetchContentList();
        console.log("API Response:", response);

        if (Array.isArray(response)) {
          setContentList(response); // Directly set response if it's an array
        } else if (response && response.results) {
          setContentList(response.results); // Handle cases where data is inside "results"
        } else {
          console.error("Unexpected response structure", response);
          setContentList([]); // Set an empty array if no valid data is found
        }
      } catch (error) {
        console.error("Error fetching published content list:", error);
      }
    };
    getPublishedContentList();
  }, []);

  // Handle edit action
  const handleEdit = async (contentId) => {
    const content = await fetchDraftById(contentId);
    navigate(`/edit-unpublish-content/${contentId}`, {
      state: {
        contentData: {
          title: content.title, // Pass the selected title
          body: content.content_body, // Pass the generated content
          category: content.category,
          tags: content.tags,
          meta_title: content.meta_title,
          meta_description: content.meta_description,
          // image: content.banner_image,
          banner_image: content.banner_image,
          meta_keywords: content.meta_keywords,
        },
      },
    });
  };

  const handleDeleteClick = (contentId) => {
    setContentIdToDelete(contentId);
    setOpen(true);
  };

  // Confirm deletion
  const handleConfirmDelete = async () => {
    try {
      await deleteContent(contentIdToDelete); // Call your delete API function
      setContentList((prevList) =>
        prevList.filter((content) => content.id !== contentIdToDelete)
      ); // Remove the deleted content from the list
      setOpen(false); // Close the modal
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setOpen(false); // Close the modal without deleting
  };

  // Define columns for the DataTable
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ row }) => (
          <Typography variant="caption" className="table-title">
            {row.original.title}
          </Typography>
        ),
      },
      {
        Header: "Author",
        accessor: "author_name",
        Cell: ({ value }) => (
          <Typography className="table-data">{value || "—"}</Typography>
        ),
      },
      {
        Header: "Published Date",
        accessor: "created_at",
        Cell: ({ value }) => (
          <Typography className="table-data">
            {formatDate(value) || "—"}
          </Typography>
        ),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="table-actions">
            <button
              className="edit-btn"
              onClick={() => handleEdit(row.original.id)}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDeleteClick(row.original.id)} // Open modal on delete click
            >
              Delete
            </button>
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
      initialState: { pageIndex: 0, pageSize: 4 }, // Show 4 results at a time
    },
    usePagination
  );

  return (
    <div>
      <div className="main-content">
        <Card className="card-container">
          <Box className="header-container">
            <Typography variant="h6" gutterBottom>
              Published Contents
            </Typography>
          </Box>
          <Box className="table-container">
            <table {...getTableProps()} className="styled-table">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    className="table-header"
                  >
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="table-row">
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
          {/* Pagination Controls */}
          <Box className="pagination-controls">
            <Button
              onClick={previousPage}
              disabled={!canPreviousPage}
              variant="contained"
              color="primary"
            >
              Previous
            </Button>
            <Typography>
              Page {pageIndex + 1} of {Math.ceil(contentList.length / pageSize)}
            </Typography>
            <Button
              onClick={nextPage}
              disabled={!canNextPage}
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          </Box>
        </Card>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={open} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this content?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PublishedContent;

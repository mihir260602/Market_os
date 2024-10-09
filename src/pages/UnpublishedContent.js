import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { usePagination, useTable } from "react-table";
import {
  deleteContent,
  fetchDraftById,
  fetchDrafts,
  updateDraft,
} from "../api/contentService";
import { raiseContentTicket } from "../api/ticketService";
import "./UnpublishedContent.css";

function UnpublishedContent() {
  const [contentList, setContentList] = useState([]);
  const [filteredContentList, setFilteredContentList] = useState([]); // Add filtered list state
  const [filterStatus, setFilterStatus] = useState(""); // Track filter status
  const [openDelete, setOpenDelete] = useState(false);
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [contentIdToDelete, setContentIdToDelete] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const navigate = useNavigate();

  const formatDate = (isoString) =>
    format(new Date(isoString), "MMMM dd, yyyy, hh:mm:ss a");

  useEffect(() => {
    const getUnpublishedContentList = async () => {
      try {
        const response = await fetchDrafts();
        console.log("Response--> ", response);
        if (Array.isArray(response)) {
          setContentList(response);
          setFilteredContentList(response); // Set the filtered list initially
        } else if (response && response.results) {
          setContentList(response.results);
          setFilteredContentList(response.results); // Set the filtered list initially
        } else {
          console.error("Unexpected response structure", response);
          setContentList([]);
          setFilteredContentList([]);
        }
      } catch (error) {
        console.error("Error fetching unpublished content list:", error);
      }
    };
    getUnpublishedContentList();
  }, []);

  // Filter content based on status
  useEffect(() => {
    if (filterStatus === "") {
      setFilteredContentList(contentList);
    } else {
      setFilteredContentList(
        contentList.filter((content) => content.review_status === filterStatus)
      );
    }
  }, [filterStatus, contentList]);

  const handleEdit = async (contentId) => {
    const content = await fetchDraftById(contentId);
    navigate(`/edit-unpublish-content/${contentId}`, {
      state: {
        contentData: {
          title: content.title,
          body: content.content_body,
          category: content.category,
          tags: content.tags,
          meta_title: content.meta_title,
          meta_description: content.meta_description,
          banner_image: content.banner_image,
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
      setContentList((prevList) =>
        prevList.filter((content) => content.id !== contentIdToDelete)
      );
      setOpenDelete(false);
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  const handlePublish = async (contentId) => {
    const draftData = { status: "published", review_status: "reviewed" };
    try {
      await updateDraft(contentId, draftData);
      navigate("/published-content");
    } catch (error) {
      console.error("Failed to publish draft", error);
      alert("Failed to publish draft");
    }
  };

  const handleCancelDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenSuggestion = (contentId) => {
    setContentIdToDelete(contentId);
    setOpenSuggestion(true);
  };

  const handleSubmitSuggestion = async () => {
    const ticketData = {
      title: "Suggestion",
      description: suggestion,
    };

    try {
      await raiseContentTicket(contentIdToDelete, ticketData);
      alert("Suggestion raised successfully!");
      setSuggestion("");
      setOpenSuggestion(false);
    } catch (error) {
      console.error("Failed to raise a suggestion", error);
      alert(
        "Failed to raise a suggestion: " + error.response?.data?.detail ||
          error.message
      );
    }
  };

  const handleCancelSuggestion = () => {
    setOpenSuggestion(false);
    setSuggestion("");
  };

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
        Header: "Status",
        accessor: "review_status",
        Cell: ({ value }) => (
          <Typography className="table-data">{value || "—"}</Typography>
        ),
      },
      {
        Header: "Updated Date",
        accessor: "updated_at",
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
              className="edit-btn"
              onClick={() => handlePublish(row.original.id)}
            >
              Publish
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDeleteClick(row.original.id)}
            >
              Delete
            </button>
            <button
              className="ticket-btn"
              onClick={() => handleOpenSuggestion(row.original.id)}
            >
              Raise Ticket
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
      data: filteredContentList, // Use filtered data instead of full content list
      initialState: { pageIndex: 0, pageSize: 4 },
    },
    usePagination
  );

  return (
    <div>
      <div className="main-content">
        <Card className="card-container">
          <Box className="header-container">
            <Typography variant="h6" gutterBottom>
              Unpublished Contents
            </Typography>

            {/* Status Filter Dropdown */}
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              displayEmpty
              style={{ marginBottom: "20px", minWidth: "200px" }}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="pending_review">Pending Review</MenuItem>
              <MenuItem value="in_review">In Review</MenuItem>
              <MenuItem value="reviewed">Reviewed</MenuItem>
            </Select>
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
            <Button
              onClick={previousPage}
              disabled={!canPreviousPage}
              className="pagination-button"
            >
              Previous
            </Button>
            <Button
              onClick={nextPage}
              disabled={!canNextPage}
              className="pagination-button"
            >
              Next
            </Button>
          </Box>
        </Card>
      </div>

      <Dialog open={openDelete} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this content?
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

      <Dialog open={openSuggestion} onClose={handleCancelSuggestion}>
        <DialogTitle>Raise a Suggestion</DialogTitle>
        <DialogContent>
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Write your suggestion here..."
            rows={4}
            style={{ width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitSuggestion} color="primary">
            Submit
          </Button>
          <Button onClick={handleCancelSuggestion} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UnpublishedContent;

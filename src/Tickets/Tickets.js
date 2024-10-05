// import {
//   Card,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// // import Sidebar from "../Dashboard/Sidebar";
// // import Header from "../Dashboard/Header";
// import "./Tickets.css"; // Ensure you have this CSS file for styles

// // Dummy data for tickets raised, opened, and resolved
// const ticketsRaisedData = [
//   { title: "Ticket 1", description: "Issue with login", raisedBy: "User A", assignedTo: "Agent 1", actions: "Mark as Resolved" },
//   { title: "Ticket 2", description: "Page not found error", raisedBy: "User B", assignedTo: "Agent 2", actions: "Mark as Resolved" },
//   // Add more ticket data as needed
// ];

// const ticketsOpenedData = [
//   { title: "Ticket 3", description: "Payment not processed", raisedBy: "User C", assignedTo: "Agent 1", actions: "Mark as Resolved" },
//   // Add more ticket data as needed
// ];

// const ticketsResolvedData = [
//   { title: "Ticket 4", description: "Account verification issue", raisedBy: "User D", assignedTo: "Agent 3", actions: "Mark as Resolved" },
//   // Add more ticket data as needed
// ];

// function SimplePage() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [tableVisible, setTableVisible] = useState({ raised: false, opened: false, resolved: false });

//   const toggleTable = (tableName) => {
//     setTableVisible((prev) => ({ ...prev, [tableName]: !prev[tableName] }));
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleMarkAsResolved = (index, table) => {
//     // Implement logic to mark ticket as resolved
//     // console.log(Ticket ${index + 1} from ${table} marked as resolved.);
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       {/* <Sidebar /> */}
//       <div style={{ marginLeft: "250px", padding: "20px", flexGrow: 1 }}>
//         {/* <Header /> */}

//         {/* Cards for Total Tickets */}
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={4}>
//             <Card className="info-card">
//               <Typography variant="h5">Total Tickets Raised</Typography>
//               <Typography variant="h6">{ticketsRaisedData.length}</Typography>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Card className="info-card">
//               <Typography variant="h5">Total Tickets Opened</Typography>
//               <Typography variant="h6">{ticketsOpenedData.length}</Typography>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Card className="info-card">
//               <Typography variant="h5">Total Tickets Resolved</Typography>
//               <Typography variant="h6">{ticketsResolvedData.length}</Typography>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Tickets Raised Table */}
//         <Grid container spacing={2} style={{ marginTop: "20px" }}>
//           <Grid item xs={12}>
//             <Card>
//               <Typography
//                 variant="h6"
//                 className="table-header"
//                 onClick={() => toggleTable("raised")}
//                 style={{ cursor: "pointer", padding: "16px" }}
//               >
//                 Tickets Raised
//               </Typography>
//               {tableVisible.raised && (
//                 <>
//                   <TableContainer>
//                     <Table style={{ minWidth: 650 }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell className="table-cell">Title</TableCell>
//                           <TableCell className="table-cell">Description</TableCell>
//                           <TableCell className="table-cell">Raised By</TableCell>
//                           <TableCell className="table-cell">Assigned To</TableCell>
//                           <TableCell className="table-cell">Actions</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {ticketsRaisedData
//                           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                           .map((row, index) => (
//                             <TableRow key={index}>
//                               <TableCell className="table-cell">{row.title}</TableCell>
//                               <TableCell className="table-cell">{row.description}</TableCell>
//                               <TableCell className="table-cell">{row.raisedBy}</TableCell>
//                               <TableCell className="table-cell">{row.assignedTo}</TableCell>
//                               <TableCell className="table-cell">
//                                 <button onClick={() => handleMarkAsResolved(index, "raised")}>{row.actions}</button>
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                   <TablePagination
//                     rowsPerPageOptions={[10, 25, 50]}
//                     component="div"
//                     count={ticketsRaisedData.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                   />
//                 </>
//               )}
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Repeat similar structure for Tickets Opened and Tickets Resolved */}
//         <Grid container spacing={2} style={{ marginTop: "20px" }}>
//           <Grid item xs={12}>
//             <Card>
//               <Typography
//                 variant="h6"
//                 className="table-header"
//                 onClick={() => toggleTable("opened")}
//                 style={{ cursor: "pointer", padding: "16px" }}
//               >
//                 Tickets Opened
//               </Typography>
//               {tableVisible.opened && (
//                 <>
//                   <TableContainer>
//                     <Table style={{ minWidth: 650 }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell className="table-cell">Title</TableCell>
//                           <TableCell className="table-cell">Description</TableCell>
//                           <TableCell className="table-cell">Raised By</TableCell>
//                           <TableCell className="table-cell">Assigned To</TableCell>
//                           <TableCell className="table-cell">Actions</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {ticketsOpenedData
//                           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                           .map((row, index) => (
//                             <TableRow key={index}>
//                               <TableCell className="table-cell">{row.title}</TableCell>
//                               <TableCell className="table-cell">{row.description}</TableCell>
//                               <TableCell className="table-cell">{row.raisedBy}</TableCell>
//                               <TableCell className="table-cell">{row.assignedTo}</TableCell>
//                               <TableCell className="table-cell">
//                                 <button onClick={() => handleMarkAsResolved(index, "opened")}>{row.actions}</button>
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                   <TablePagination
//                     rowsPerPageOptions={[10, 25, 50]}
//                     component="div"
//                     count={ticketsOpenedData.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                   />
//                 </>
//               )}
//             </Card>
//           </Grid>
//         </Grid>

//         <Grid container spacing={2} style={{ marginTop: "20px" }}>
//           <Grid item xs={12}>
//             <Card>
//               <Typography
//                 variant="h6"
//                 className="table-header"
//                 onClick={() => toggleTable("resolved")}
//                 style={{ cursor: "pointer", padding: "16px" }}
//               >
//                 Tickets Resolved
//               </Typography>
//               {tableVisible.resolved && (
//                 <>
//                   <TableContainer>
//                     <Table style={{ minWidth: 650 }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell className="table-cell">Title</TableCell>
//                           <TableCell className="table-cell">Description</TableCell>
//                           <TableCell className="table-cell">Raised By</TableCell>
//                           <TableCell className="table-cell">Assigned To</TableCell>
//                           <TableCell className="table-cell">Actions</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {ticketsResolvedData
//                           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                           .map((row, index) => (
//                             <TableRow key={index}>
//                               <TableCell className="table-cell">{row.title}</TableCell>
//                               <TableCell className="table-cell">{row.description}</TableCell>
//                               <TableCell className="table-cell">{row.raisedBy}</TableCell>
//                               <TableCell className="table-cell">{row.assignedTo}</TableCell>
//                               <TableCell className="table-cell">
//                                 <button onClick={() => handleMarkAsResolved(index, "resolved")}>{row.actions}</button>
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                   <TablePagination
//                     rowsPerPageOptions={[10, 25, 50]}
//                     component="div"
//                     count={ticketsResolvedData.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                   />
//                 </>
//               )}
//             </Card>
//           </Grid>
//         </Grid>
//       </div>
//     </div>
//   );
// }

// export default SimplePage;

import {
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { getAuthorTickets, markTicketResolved } from "../api/ticketService"; // Ensure correct path to your API functions
import "./Tickets.css"; // Ensure you have this CSS file for styles

function TicketsPage() {
  const [ticketsData, setTicketsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableVisible, setTableVisible] = useState({ raised: false, resolved: false });

  // Fetch tickets when component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getAuthorTickets();
        console.log("Tickets Response Data:", data); // Log the response data
        setTicketsData(data); // Set all tickets data
      } catch (error) {
        console.error("Error fetching tickets:", error.message);
      }
    };
    fetchTickets();
  }, []);

  const toggleTable = (tableName) => {
    setTableVisible((prev) => ({ ...prev, [tableName]: !prev[tableName] }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMarkAsResolved = async (ticketId) => {
    try {
      await markTicketResolved(ticketId);
      // Re-fetch tickets after marking as resolved
      const data = await getAuthorTickets();
      setTicketsData(data); // Update tickets data
    } catch (error) {
      console.error("Error marking ticket as resolved:", error.message);
    }
  };

  // Filter tickets based on their status
  const raisedTickets = ticketsData.filter(ticket => ticket.status === "open");
  const resolvedTickets = ticketsData.filter(ticket => ticket.status === "resolved");

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginLeft: "250px", padding: "20px", flexGrow: 1 }}>
        {/* Cards for Total Tickets */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card className="info-card">
              <Typography variant="h5">Total Tickets Raised</Typography>
              <Typography variant="h6">{raisedTickets.length}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className="info-card">
              <Typography variant="h5">Total Tickets Resolved</Typography>
              <Typography variant="h6">{resolvedTickets.length}</Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Tickets Raised Table */}
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={12}>
            <Card>
              <Typography
                variant="h6"
                className="table-header"
                onClick={() => toggleTable("raised")}
                style={{ cursor: "pointer", padding: "16px" }}
              >
                Tickets Raised
              </Typography>
              {tableVisible.raised && (
                <>
                  <TableContainer>
                    <Table style={{ minWidth: 650 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell className="table-cell">Title</TableCell>
                          <TableCell className="table-cell">Description</TableCell>
                          <TableCell className="table-cell">Raised By</TableCell>
                          <TableCell className="table-cell">Assigned To</TableCell>
                          <TableCell className="table-cell">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {raisedTickets
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((ticket, index) => (
                            <TableRow key={ticket.id}>
                              <TableCell className="table-cell">{ticket.title || "N/A"}</TableCell>
                              <TableCell className="table-cell">{ticket.description || "N/A"}</TableCell>
                              <TableCell className="table-cell">{ticket.raised_by_name || "N/A"}</TableCell>
                              <TableCell className="table-cell">{ticket.assigned_to_name || "N/A"}</TableCell>
                              <TableCell className="table-cell">
                                <button onClick={() => handleMarkAsResolved(ticket.id)}>Mark as Resolved</button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={raisedTickets.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              )}
            </Card>
          </Grid>
        </Grid>

        {/* Tickets Resolved Table */}
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={12}>
            <Card>
              <Typography
                variant="h6"
                className="table-header"
                onClick={() => toggleTable("resolved")}
                style={{ cursor: "pointer", padding: "16px" }}
              >
                Tickets Resolved
              </Typography>
              {tableVisible.resolved && (
                <>
                  <TableContainer>
                    <Table style={{ minWidth: 650 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell className="table-cell">Title</TableCell>
                          <TableCell className="table-cell">Description</TableCell>
                          <TableCell className="table-cell">Raised By</TableCell>
                          <TableCell className="table-cell">Assigned To</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {resolvedTickets
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((ticket, index) => (
                            <TableRow key={ticket.id}>
                              <TableCell className="table-cell">{ticket.title || "N/A"}</TableCell>
                              <TableCell className="table-cell">{ticket.description || "N/A"}</TableCell>
                              <TableCell className="table-cell">{ticket.raised_by_name || "N/A"}</TableCell>
                              <TableCell className="table-cell">{ticket.assigned_to_name || "N/A"}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={resolvedTickets.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default TicketsPage;

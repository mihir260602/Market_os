import { Button, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import Papa from 'papaparse'; // CSV parser
import React, { useState } from 'react';
import './ContactList.css'; // Import CSS file

// Initial dummy contacts
const initialContacts = [
  { name: 'John Doe', email: 'john@example.com', status: 'Hot', location: 'New York' },
  { name: 'Jane Smith', email: 'jane@example.com', status: 'Cold', location: 'San Francisco' },
];

const statuses = ['All', 'Hot', 'Warm', 'Cold']; // Filter options for lead status

const ContactList = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterLocation, setFilterLocation] = useState('');

  // Handle CSV file import
  const handleCSVImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const importedContacts = results.data.map((contact) => ({
            name: contact.Name,
            email: contact.Email,
            status: contact.Status,
            location: contact.Location,
          }));
          console.log("Imported Contacts: ", importedContacts); // Debugging
          setContacts((prevContacts) => [...prevContacts, ...importedContacts]);
        },
      });
    }
  };

  // Filter contacts based on status and location
  const filteredContacts = contacts.filter((contact) => {
    return (
      (filterStatus === 'All' || contact.status === filterStatus) &&
      (filterLocation === '' || contact.location.toLowerCase().includes(filterLocation.toLowerCase()))
    );
  });

  return (
    <div className="contact-list-container">
      <h2>Unified Contact Database</h2>
      <div className="actions">
        <Button variant="contained" component="label" color="primary">
          Import Contacts (CSV)
          <input type="file" accept=".csv" hidden onChange={handleCSVImport} />
        </Button>

        {/* Filter by status */}
        <TextField
          select
          label="Filter by Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          variant="outlined"
          className="filter-field"
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>

        {/* Filter by location */}
        <TextField
          label="Filter by Location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          variant="outlined"
          className="filter-field"
        />
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredContacts.map((contact, index) => (
            <TableRow key={index}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.status}</TableCell>
              <TableCell>{contact.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactList;

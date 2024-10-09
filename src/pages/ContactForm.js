// src/components/ContactForm.js
import React, { useState } from "react";
import "./ContactForm.css"; // Import the CSS file for styles
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [message, setMessage] = useState(""); // State for message
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowModal(true);

    // Clear the form
    setFullName("");
    setEmailAddress("");
    setMessage(""); // Clear the message field
  };

  return (
    <div id="mauticform_wrapper_subscribeform" className="mauticform_wrapper">
      <h1 className="mauticform-title">Get In Touch</h1>
      <p className="mauticform-subtitle">We would love to hear from you!</p>
      <form
        autoComplete="off"
        role="form"
        onSubmit={handleSubmit}
        id="mauticform_subscribeform"
        className="mauticform-innerform"
      >
        <div
          className="mauticform-error"
          id="mauticform_subscribeform_error"
        ></div>
        <div
          className="mauticform-message"
          id="mauticform_subscribeform_message"
        ></div>
        <div className="mauticform-innerform">
          <div
            className="mauticform-page-wrapper mauticform-page-1"
            data-mautic-form-page="1"
          >
            <div
              id="mauticform_subscribeform_full_name"
              className="mauticform-row mauticform-text mauticform-field-1"
            >
              <label
                id="mauticform_label_subscribeform_full_name"
                htmlFor="mauticform_input_subscribeform_full_name"
                className="mauticform-label"
              >
                Full Name
              </label>
              <input
                id="mauticform_input_subscribeform_full_name"
                name="full_name"
                value={fullName}
                placeholder="Eg. John Doe"
                className="mauticform-input"
                type="text"
                onChange={(e) => setFullName(e.target.value)}
              />
              <span
                className="mauticform-errormsg"
                style={{ display: "none" }}
              ></span>
            </div>

            <div
              id="mauticform_subscribeform_email_address"
              className="mauticform-row mauticform-email mauticform-field-2"
            >
              <label
                id="mauticform_label_subscribeform_email_address"
                htmlFor="mauticform_input_subscribeform_email_address"
                className="mauticform-label"
              >
                Email Address
              </label>
              <input
                id="mauticform_input_subscribeform_email_address"
                name="email_address"
                value={emailAddress}
                placeholder="Eg. johndoe@example.com"
                className="mauticform-input"
                type="email"
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              <span
                className="mauticform-errormsg"
                style={{ display: "none" }}
              ></span>
            </div>

            <div
              id="mauticform_subscribeform_message"
              className="mauticform-row mauticform-textarea mauticform-field-3"
            >
              <label
                id="mauticform_label_subscribeform_message"
                htmlFor="mauticform_input_subscribeform_message"
                className="mauticform-label"
              >
                Message
              </label>
              <textarea
                id="mauticform_input_subscribeform_message"
                name="message"
                value={message}
                placeholder="Write your message here..."
                className="mauticform-input"
                onChange={(e) => setMessage(e.target.value)}
              />
              <span
                className="mauticform-errormsg"
                style={{ display: "none" }}
              ></span>
            </div>

            <div
              id="mauticform_subscribeform_submit"
              className="mauticform-row mauticform-button-wrapper mauticform-field-4"
            >
              <button type="submit" className="mauticform-button">
                Connect
              </button>
            </div>
          </div>
        </div>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => navigate("/")}>
              &times;
            </span>
            <p>Your information has been stored in our database!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;

// src/components/MauticForm.js
import React from "react";
import "./MauticForm.css"; // Import the CSS file for styles

const MauticForm = () => {
  return (
    <div id="mauticform_wrapper_subscribeform" className="mauticform_wrapper">
      <h1 className="mauticform-title">Subscribe to Our Newsletter</h1>
      <p className="mauticform-subtitle">
        Stay updated with our latest news and offers!
      </p>
      <form
        autoComplete="off"
        role="form"
        method="post"
        action="http://165.22.11.185:8081/form/submit?formId=2"
        id="mauticform_subscribeform"
        data-mautic-form="subscribeform"
        encType="multipart/form-data"
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
                name="mauticform[full_name]"
                placeholder="Eg. John Doe"
                className="mauticform-input"
                type="text"
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
                name="mauticform[email_address]"
                placeholder="Eg. johndoe@example.com"
                className="mauticform-input"
                type="email"
              />
              <span
                className="mauticform-errormsg"
                style={{ display: "none" }}
              ></span>
            </div>

            <div
              id="mauticform_subscribeform_submit"
              className="mauticform-row mauticform-button-wrapper mauticform-field-3"
            >
              <button
                type="submit"
                name="mauticform[submit]"
                className="mauticform-button"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <input type="hidden" name="mauticform[formId]" value="2" />
        <input type="hidden" name="mauticform[return]" value="" />
        <input
          type="hidden"
          name="mauticform[formName]"
          value="subscribeform"
        />
      </form>
    </div>
  );
};

export default MauticForm;

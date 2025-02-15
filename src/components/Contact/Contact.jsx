import React, { useState } from "react";
import "./Contact.css"; // Your CSS file for styling

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement your logic to handle the form submission, such as sending the data to a server or displaying a confirmation message
    setSubmitted(true);
  };

  return (
    <div className="outer-container pt-20 pb-20">
      <div className="contact-container">
        <h1 className="contact-heading">Contact Us</h1>
        {submitted ? (
          <div className="confirmation-message">
            Thank you for your message. We'll get back to you soon!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input

                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message:
              </label>
              <textarea
                id="message"
                value={message}
                placeholder="Enter your message"
                onChange={(e) => setMessage(e.target.value)}
                className="form-textarea"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;

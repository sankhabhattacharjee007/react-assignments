import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section className="section-container" id="contact">
      <div className="section-header">
        <span className="section-tag">&lt;connect /&gt;</span>
        <h2 className="section-title">
          Get In <span className="red-text">Touch</span>
        </h2>
        <p className="section-subtitle">
          Interested in discussing technology, coding opportunities, or academic projects? Feel free to reach out!
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info-list">
          <div className="contact-card">
            <div className="contact-icon-bubble">@</div>
            <div>
              <div className="contact-meta-label">Email Address</div>
              <a
                href="mailto:sankhabhattacharjee@gmail.com"
                className="contact-meta-val"
              >
                sankhabhattacharjee@gmail.com
              </a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon-bubble">TIU</div>
            <div>
              <div className="contact-meta-label">University & Location</div>
              <span className="contact-meta-val">
                Techno India University, Kolkata, India
              </span>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon-bubble">BCA</div>
            <div>
              <div className="contact-meta-label">Academic Status</div>
              <span className="contact-meta-val">
                4th Year Finalist &bull; Available for Opportunities
              </span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
          {submitted && (
            <div className="form-success-banner" id="form-success-msg">
              ✓ Thank you! Your message has been recorded. I'll get back to you shortly.
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="contact-name">
              Your Name
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              className="form-input"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact-email">
              Your Email
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              className="form-input"
              placeholder="e.g. john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact-subject">
              Subject
            </label>
            <input
              type="text"
              id="contact-subject"
              name="subject"
              className="form-input"
              placeholder="Project Collaboration / Opportunity"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              className="form-textarea"
              placeholder="Write your message or inquiry here..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="form-btn" id="contact-submit-btn">
            Send Message ➔
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

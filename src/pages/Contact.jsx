import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import './Contact.css';
import SEO from '../components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch("https://formsubmit.co/ajax/feartox@gmail.com", {
      method: "POST",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: formData.interest,
          message: formData.message,
          _subject: "New Contact Form Submission - Silent Guard Acoustics"
      })
    })
    .then(response => response.json())
    .then(data => {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
      }, 6000);
    })
    .catch(error => {
      console.error("Form error:", error);
      alert("An error occurred while sending the message. Please try again.");
    });
  };

  return (
    <div className="contact-page animate-fade-in">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Silent Guard Acoustics for a free consultation on silentguardacoustics your residential or commercial space." 
      />

      <section className="contact-header bg-light py-5 text-center">
        <div className="container">
          <div className="contact-header text-center mb-4 animate-fade-in-up">
            <h1 className="section-title"><span>Contact Us</span></h1>
            <p className="contact-subtitle">Get in touch with our silentguardacoustics experts for a free consultation or general inquiries.</p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="contact-layout animate-fade-in-up delay-200">
          {/* Contact Information */}
          <div className="contact-info-panel">
            <h3>Get In Touch</h3>
            <p>Our team is ready to help you find the perfect acoustic solution for your space.</p>
            
            <div className="info-items mt-3">
              <div className="info-item">
                <div className="info-icon"><MapPin size={24} /></div>
                <div className="info-text">
                  <h4>Visit Us</h4>
                  <p>93 Commerce St, Garfield, NJ 07026</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon"><Phone size={24} /></div>
                <div className="info-text">
                  <h4>Call Us</h4>
                  <p><a href="tel:+15514559345">+1 (551) 455 9345</a></p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon"><Mail size={24} /></div>
                <div className="info-text">
                  <h4>Email Us</h4>
                  <p><a href="mailto:info@silentguardacousticspro.com">info@silentguardacousticspro.com</a></p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><Clock size={24} /></div>
                <div className="info-text">
                  <h4>Business Hours</h4>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM<br/>Sat - Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-panel">
            <h3>Send us a Message</h3>
            {submitted ? (
              <div className="success-message animate-fade-in-up">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <h4>Message Sent!</h4>
                <p>Thank you for reaching out. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                </div>
                
                <div className="form-row">
                  <div className="form-group half">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                  </div>
                  <div className="form-group half">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="interest">What are you looking to silentguardacoustics?</label>
                  <select id="interest" name="interest" value={formData.interest} onChange={handleChange} required>
                    <option value="" disabled>Select an option</option>
                    <option value="walls">Walls</option>
                    <option value="floors">Floors</option>
                    <option value="ceilings">Ceilings</option>
                    <option value="doors">Doors</option>
                    <option value="windows">Windows</option>
                    <option value="commercial">Commercial Space / Studio</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="4" placeholder="Tell us about your project..."></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit Inquiry</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

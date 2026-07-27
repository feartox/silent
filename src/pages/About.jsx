import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero animate-fade-in-up">
        <div className="container">
          <h1>About Soundproofing Los Angeles</h1>
          <p>Your trusted partner in noise control and acoustic solutions.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-5 animate-fade-in-up delay-200">
        <div className="about-content">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              At Soundproofing Los Angeles, we specialize in resolving noise challenges with the most advanced and effective soundproofing and acoustic treatment solutions available. We proudly help homeowners, builders, and businesses transform their spaces into quieter, more comfortable environments.
            </p>
            <p>
              Whether you are dealing with noisy neighbors, looking to build a professional recording studio, or simply wanting to create a peaceful sanctuary in your home, our team has the expertise and the right products to make it happen. We carry a full line of soundproofing and noise reduction materials from leading manufacturers, ensuring we can supply you for whatever project you are working on.
            </p>
            
            <h2 className="mt-4">Why Choose Us?</h2>
            <ul className="about-features">
              <li>
                <strong>Expert Consultations:</strong> Our experienced sound specialists will visit your location, assess your acoustic needs, and provide a tailored project estimate based on your specific concerns.
              </li>
              <li>
                <strong>Premium Materials:</strong> We source only the best, industry-standard soundproofing materials that are proven to deliver measurable results.
              </li>
              <li>
                <strong>Local Support:</strong> As a local Los Angeles business, our warehouse is open for pickups, and our customer service team is readily available to answer your questions.
              </li>
            </ul>
          </div>

          <div className="about-image">
            <img src="/images/hero-acoustic.jpg" alt="Soundproofing Installation" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta animate-fade-in-up delay-400">
        <div className="container text-center">
          <h2>Ready to get started?</h2>
          <p>Give us a call today or send us a message to schedule your on-site consultation.</p>
          <div className="cta-buttons mt-3">
             <Link to="/contact" className="btn btn-primary">Contact Us</Link>
             <a href="tel:+15514559345" className="btn btn-outline btn-outline-light">Call: +1 (551) 455 9345</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

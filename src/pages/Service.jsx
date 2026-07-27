import { useParams, Link } from 'react-router-dom';
import { services } from '../data/services';
import './Service.css';

const Service = () => {
  const { id } = useParams();
  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <div className="container py-5 text-center">
        <h2>Service Not Found</h2>
        <Link to="/" className="btn btn-primary mt-3">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="service-page">
      {/* Hero Section */}
      <div 
        className="service-hero" 
        style={{ backgroundImage: `url(${service.featureImage !== '/images/categories/placeholder.jpg' ? service.featureImage : '/images/hero-acoustic.jpg'})` }}
      >
        <div className="service-hero-overlay"></div>
        <div className="container service-hero-content">
          <h1 className="animate-fade-in-up">{service.title}</h1>
        </div>
      </div>

      <div className="container py-5">
        <div className="service-layout">
          {/* Main Content */}
          <div className="service-main-content animate-fade-in-up delay-200">
            <div className="service-main-image">
              <img src={service.featureImage !== '/images/categories/placeholder.jpg' ? service.featureImage : '/images/hero-acoustic.jpg'} alt={service.title} />
            </div>
            
            {service.content.map((block, index) => {
              // Ignore the hardcoded address paragraph to put it in the sidebar instead
              if (block.type === 'paragraph' && block.content.includes('93 Commerce St')) {
                return null;
              }

              if (block.type === 'heading') {
                return <h2 key={index} className="service-heading">{block.content}</h2>;
              }
              if (block.type === 'paragraph') {
                return <p key={index} className="service-paragraph">{block.content}</p>;
              }
              if (block.type === 'image') {
                return (
                  <div key={index} className="service-inline-image">
                    <img src={block.src} alt={`${service.title} detail`} />
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Sidebar CTA */}
          <div className="service-sidebar animate-fade-in-up delay-300">
            <div className="service-cta-card">
              <h3>Need Soundproofing?</h3>
              <p>Contact us today for a free consultation and project estimate.</p>
              
              <div className="service-contact-info">
                <p><strong>Address:</strong><br />93 Commerce St,<br />Garfield, NJ 07026</p>
                <p><strong>Phone:</strong><br /><a href="tel:+18889277495">888-927-7495</a></p>
              </div>

              <Link to="/contact" className="btn btn-primary btn-block mt-3">Request Consultation</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;

import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { services } from '../data/services';
import './Service.css';

const faqs = [
  {
    question: "How do I start the Silent Guard Acoustics process?",
    answer: "After an initial consultation, we assess your space and noise concerns. Based on that, we offer a tailored plan that fits your needs, timeline, and budget."
  },
  {
    question: "How much does Silent Guard Acoustics cost?",
    answer: "Pricing depends on the scope of work, the materials used, and the surfaces to be treated (walls, windows, floors, etc.). We provide a detailed quote after evaluating your space."
  },
  {
    question: "Can you Silent Guard Acoustics existing structures?",
    answer: "Yes! We specialize in retrofitting Silent Guard Acoustics solutions without the need for major renovations. We work around your existing walls, doors, windows, and finishes."
  },
  {
    question: "How long does installation take?",
    answer: "Most residential Silent Guard Acoustics projects are completed within 1–3 days, depending on the size and complexity. Commercial spaces may require additional time."
  }
];

const Service = () => {
  const { id } = useParams();
  const service = services.find(s => s.id === id);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="service-page">
      <SEO 
        title={`${service.title} Services`} 
        description={service.description} 
      />

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
              <h3>Need Silent Guard Acoustics?</h3>
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

      {/* FAQ Section */}
      <div className="container pb-5 animate-fade-in-up delay-400">
        <div className="service-faq-section">
          <h2>Frequently asked questions</h2>
          <p className="faq-subtitle">Find answers to the most common questions about our Silent Guard Acoustics services. From installation timelines to compatibility with your current space, we cover everything you need to know about creating a quieter environment.</p>
          
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={index} className="faq-item" name="faq-accordion">
                <summary className="faq-question">
                  {faq.question}
                  <span className="faq-icon"></span>
                </summary>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;

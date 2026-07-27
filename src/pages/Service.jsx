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
        <Link to="/" className="btn btn-primary mt-2">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="service-page py-5">
      <div className="container">
        <h1 className="section-title"><span>{service.title}</span></h1>
        
        <div className="service-layout mt-3">
          <div className="service-feature-image">
            <img src={service.featureImage} alt={service.title} />
          </div>
          
          <div className="service-content">
            {service.content.map((block, index) => {
              if (block.type === 'heading') {
                return <h2 key={index} className="service-heading">{block.content}</h2>;
              }
              if (block.type === 'paragraph') {
                return <p key={index} className="service-paragraph">{block.content}</p>;
              }
              if (block.type === 'image') {
                return (
                  <div key={index} className="service-inline-image">
                    <img src={block.src} alt="Service Detail" />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        
        <div className="service-actions mt-3 text-center">
           <Link to="/contact" className="btn btn-primary">Request this Service</Link>
        </div>
      </div>
    </div>
  );
};

export default Service;

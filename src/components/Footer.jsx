import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      {/* Newsletter Bar */}
      <div className="footer-newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>Stay Updated</h3>
              <p>Sign up for our newsletter to receive expert soundproofing tips and exclusive offers.</p>
            </div>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" aria-label="Email" />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="container footer-content">
        <div className="footer-col">
          <h3>Silent Guard Acoustics</h3>
          <p>We specialize in high-performance sound insulation solutions tailored for a wide range of environments. From homes to studios, see how we bring silence to life.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="Youtube" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"/></svg>
            </a>
          </div>
        </div>
        
        <div className="footer-col">
          <h3>Explore</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/category/walls">Wall Silent Guard Acoustics</Link></li>
            <li><Link to="/category/floors">Floor Silent Guard Acoustics</Link></li>
            <li><Link to="/category/ceilings">Ceiling Silent Guard Acoustics</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h3>Contact Us</h3>
          <div className="footer-contact">
            <p>
              <MapPin size={18} />
              <span>93 Commerce St, Garfield, NJ 07026</span>
            </p>
            <p>
              <Phone size={18} />
              <a href="tel:+15514559345">+1 (551) 455 9345</a>
            </p>
            <p>
              <Mail size={18} />
              <a href="mailto:info@silentguardacousticspro.com">info@silentguardacousticspro.com</a>
            </p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>Silent Guard Acoustics LLC © {new Date().getFullYear()} All Rights Reserved.</p>
          <div className="footer-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms & Services</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

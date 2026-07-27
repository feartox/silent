import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { categories } from '../data/catalog';
import { services } from '../data/services';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
    setMobileAccordion(null);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="contact-info">
            <Link to="/contact" className="contact-item">
              <span>SEND A MESSAGE</span>
            </Link>
          </div>
          <div className="slogan">We keep quiet.</div>
        </div>
      </div>
      
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="main-header container">
        {/* Mobile Toggle */}
        <button className="mobile-menu-toggle icon-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="header-actions desktop-only">
          <a href="tel:+18889277495" className="header-phone-btn">
            <Phone size={18} />
            <span>1-888-927-7495</span>
          </a>
        </div>

        <div className="logo center-logo">
          <Link to="/">
            <img src="/images/logo.png" alt="Silent Guard Acoustics" />
          </Link>
        </div>
        
        <nav className="main-nav desktop-only">
          <ul>
            <li className="nav-item has-dropdown">
              <Link to="/#" style={{ whiteSpace: 'nowrap' }}>Categories</Link>
              <div className="dropdown">
                <ul>
                  {categories.map(cat => (
                    <li key={cat.id} className={cat.subcategories && cat.subcategories.length > 0 ? "has-subdropdown" : ""}>
                      <Link to={`/category/${cat.id}`}>{cat.name}</Link>
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <div className="subdropdown">
                          <ul>
                            {cat.subcategories.map(sub => (
                              <li key={sub.id}>
                                <Link to={`/subcategory/${sub.id}`}>{sub.name}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            
            <li className="nav-item has-dropdown">
              <Link to="/#" style={{ whiteSpace: 'nowrap' }}>Services</Link>
              <div className="dropdown">
                <ul>
                  {services.map(srv => (
                    <li key={srv.id}>
                      <Link to={`/service/${srv.id}`}>{srv.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            
            <li className="nav-item">
              <Link to="/contact" style={{ whiteSpace: 'nowrap' }}>Contact</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Full-Screen Mobile Menu Modal */}
      <div className={`mobile-menu-modal ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-modal-header">
          <img src="/images/logo.png" alt="Silent Guard Acoustics" className="mobile-modal-logo" />
          <button className="icon-btn close-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={28} />
          </button>
        </div>
        
        <div className="mobile-modal-body">
          <div className="mobile-accordion">
            
            {/* Categories Accordion */}
            <div className={`accordion-item ${mobileAccordion === 'categories' ? 'active' : ''}`}>
              <button 
                className="accordion-header" 
                onClick={() => setMobileAccordion(mobileAccordion === 'categories' ? null : 'categories')}
              >
                Categories
                <span className="accordion-icon"></span>
              </button>
              <div className="accordion-content">
                <ul>
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <Link to={`/category/${cat.id}`} className="cat-link">{cat.name}</Link>
                      {cat.subcategories && (
                        <ul className="subcat-list">
                          {cat.subcategories.map(sub => (
                            <li key={sub.id}>
                              <Link to={`/subcategory/${sub.id}`}>— {sub.name}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Services Accordion */}
            <div className={`accordion-item ${mobileAccordion === 'services' ? 'active' : ''}`}>
              <button 
                className="accordion-header" 
                onClick={() => setMobileAccordion(mobileAccordion === 'services' ? null : 'services')}
              >
                Services
                <span className="accordion-icon"></span>
              </button>
              <div className="accordion-content">
                <ul>
                  {services.map(srv => (
                    <li key={srv.id}>
                      <Link to={`/service/${srv.id}`}>{srv.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Contact Link */}
            <div className="accordion-item">
              <Link to="/contact" className="accordion-header direct-link">
                Contact
              </Link>
            </div>

          </div>
        </div>

        <div className="mobile-modal-footer">
          <a href="tel:+18889277495" className="btn btn-primary btn-block" style={{display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center'}}>
            <Phone size={20} /> Call Us: 1-888-927-7495
          </a>
          <Link to="/contact" className="btn btn-outline btn-block" style={{display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center'}}>
             Send a Message
          </Link>
        </div>
      </div>
      </header>
    </>
  );
};

export default Header;

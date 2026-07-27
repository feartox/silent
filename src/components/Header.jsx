import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { categories } from '../data/catalog';
import { services } from '../data/services';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="contact-info">
            <span className="contact-item">
              <span>CALL: 1-888-927-7495</span>
            </span>
            <a href="mailto:info@silentguardacoustics.com" className="contact-item">
              <span>SEND A MESSAGE</span>
            </a>
          </div>
          <div className="slogan">We keep quiet.</div>
        </div>
      </div>
      
      <div className="main-header container">
        {/* Mobile Toggle */}
        <button className="mobile-menu-toggle icon-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
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
        
        <div className="logo center-logo">
          <Link to="/">
            <img src="/images/logo.png" alt="Silent Guard Acoustics" />
          </Link>
        </div>
        
        <div className="header-actions">
          <button className="icon-btn" aria-label="Search">
            <Search size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

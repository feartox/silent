import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { products } from '../data/catalog';
import './Home.css';

const Home = () => {
  const categories = [
    { id: 'floors', title: 'Floors', image: '/images/home-cat-floor.webp', link: '/category/floors' },
    { id: 'walls', title: 'Walls', image: '/images/home-cat-wall.webp', link: '/category/walls' },
    { id: 'ceilings', title: 'Ceilings', image: '/images/home-cat-ceiling2.webp', link: '/category/ceilings' },
    { id: 'accessories', title: 'Accessories', image: '/images/home-cat-access.webp', link: '/category/accessories' },
  ];



  return (
    <div className="home-page">
      {/* Full Width Hero Section */}
      <section className="animate-fade-in-up">
        <div className="hero hero-slide hero-video-wrapper">
          <iframe 
            className="hero-video-bg"
            src="https://www.youtube.com/embed/jU0gXUWMVGo?autoplay=1&mute=1&controls=0&loop=1&playlist=jU0gXUWMVGo&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1" 
            frameBorder="0" 
            allow="autoplay; encrypted-media" 
            allowFullScreen
          ></iframe>
          <div className="hero-gradient"></div>
          <div className="hero-content">
            <h1>Silence Is Not a Luxury — It's a Necessity</h1>
            <p>Noise steals comfort — reclaim your quiet. Explore our smart and affordable soundproofing solutions.</p>
          </div>
        </div>
      </section>

      {/* Welcome / SEO Section */}
      <section className="container py-5 animate-fade-in-up delay-200">
        <div className="home-seo-text">
          <h2>Welcome to your source for Soundproofing</h2>
          <p>Enhance your living or working environment with our tailored soundproofing services — designed to block unwanted noise and boost comfort. From walls to windows, ceilings to floors, we deliver seamless solutions that match your space and acoustic needs.</p>
        </div>
      </section>

      {/* Main Categories Grid */}
      <section className="container py-4">
        <h2 className="section-title animate-fade-in-up delay-300">Shop By Category</h2>
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <Link to={cat.link} key={cat.id} className={`category-card animate-fade-in-up delay-${(index % 5 + 1) * 100}`}>
              <img src={cat.image} alt={cat.title} />
              <h3>{cat.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="container py-5">
        <h2 className="section-title animate-fade-in-up delay-400">Our Products</h2>
        <div className="products-carousel">
          {products.slice(0, 10).map((product, index) => (
            <div key={product.id} className={`product-card animate-fade-in-up delay-${(index % 4 + 1) * 100}`}>
              <div className="product-image">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
              </div>
              <div className="product-info">
                <Link to={`/product/${product.id}`} className="product-name">
                  {product.name}
                </Link>

                <div className="product-actions mt-1">
                  <Link to={`/product/${product.id}`} className="btn btn-outline btn-block">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Showcase */}
      <section className="container py-5 animate-fade-in-up delay-500">
        <h2 className="section-title">Our Services</h2>
        <div className="services-showcase">
          {services.map((service, index) => (
            <Link to={`/service/${service.id}`} key={service.id} className={`service-card animate-fade-in-up delay-${(index % 3 + 1) * 100}`}>
              <div className="service-card-image">
                <img src={service.featureImage} alt={service.title} />
              </div>
              <div className="service-card-body">
                <h3>{service.title}</h3>
                <p>{service.content && service.content.find(b => b.type === 'paragraph')?.content}</p>
                <span className="service-link">Learn more →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section animate-fade-in-up">
        <div className="container text-center">
          <h2>Ready to Soundproof Your Space?</h2>
          <p>Get expert advice and a free consultation from our specialists.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">Get a Free Consultation</Link>
            <a href="tel:+15514559345" className="btn btn-outline btn-outline-light">Call: +1 (551) 455 9345</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

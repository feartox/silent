import { Link } from 'react-router-dom';
import { services } from '../data/services';
import './Home.css';

const Home = () => {
  const categories = [
    { id: 'floors', title: 'Floors', image: '/images/home-cat-floor.webp', link: '/category/floors' },
    { id: 'walls', title: 'Walls', image: '/images/home-cat-wall.webp', link: '/category/walls' },
    { id: 'ceilings', title: 'Ceilings', image: '/images/home-cat-ceiling2.webp', link: '/category/ceilings' },
    { id: 'accessories', title: 'Accessories', image: '/images/home-cat-access.webp', link: '/category/accessories' },
  ];

  const topSellers = [
    {
      id: 1,
      name: 'Green Glue: Case / 12 tubes',
      image: '/images/products/img_0020_thumbnail.jpg',
      price: '$279.99'
    },
    {
      id: 2,
      name: 'Furring Channel- 7/8", 25g, 12FT-SINGLE',
      image: '/images/products/furring_channel_thumbnail.jpg',
      price: '$14.00'
    },
    {
      id: 3,
      name: 'Serenity Ultimate Underlay™: 6mm',
      image: '/images/products/privacy_ultimate_underlay_thumbnail.jpg',
      price: '$199.99'
    },
    {
      id: 4,
      name: 'Vinyl Seam Tape 2pk',
      image: '/images/products/black_vinyl_seam_tape_1_thumbnail.jpg',
      price: '$30.00'
    }
  ];

  return (
    <div className="home-page">
      {/* Full Width Hero Section */}
      <section className="animate-fade-in-up">
        <div className="hero hero-slide" style={{ backgroundImage: 'url(/images/hero-acoustic.jpg)' }}>
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

      {/* Top Sellers */}
      <section className="container py-5">
        <h2 className="section-title animate-fade-in-up delay-400">Top Sellers</h2>
        <div className="products-grid">
          {topSellers.map((product, index) => (
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
                <span className="product-price">{product.price}</span>
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
          {services.slice(0, 3).map((service, index) => (
            <Link to={`/service/${service.id}`} key={service.id} className={`service-card animate-fade-in-up delay-${(index + 1) * 100}`}>
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

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { services } from '../data/services';
import { products } from '../data/catalog';
import './Home.css';

const faqs = [
  {
    question: "How do I start the soundproofing process?",
    answer: "After an initial consultation, we assess your space and noise concerns. Based on that, we offer a tailored plan that fits your needs, timeline, and budget."
  },
  {
    question: "How much does soundproofing cost?",
    answer: "Pricing depends on the scope of work, the materials used, and the surfaces to be treated (walls, windows, floors, etc.). We provide a detailed quote after evaluating your space."
  },
  {
    question: "Can you soundproof existing structures?",
    answer: "Yes! We specialize in retrofitting soundproofing solutions without the need for major renovations. We work around your existing walls, doors, windows, and finishes."
  },
  {
    question: "How long does installation take?",
    answer: "Most residential soundproofing projects are completed within 1–3 days, depending on the size and complexity. Commercial spaces may require additional time."
  },
  {
    question: "What types of spaces do you work on?",
    answer: "We provide soundproofing solutions for homes, offices, studios, meeting rooms, and even outdoor barriers. Whether you need quiet to sleep, work, or record - we’ve got you covered."
  }
];

const Home = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasPlayedShowcase, setHasPlayedShowcase] = useState(false);
  const carouselRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroVideos = [
    "/video/motion-accoustic-wall-panels-vj-loop-2026-07-10-01-27-29-utc.mp4",
    "/video/acoustic-foam-soundproof-panel-audio-insulation-st-2026-02-10-17-27-07-utc.mp4",
    "/video/modern-interior-design-with-hanging-ceiling-panels-2026-07-16-15-29-27-utc.mp4",
    "/video/modern-soundproof-acoustic-pod-in-a-contemporary-o-2026-01-22-06-05-17-utc.mp4",
    "/video/sound-recording-room-fully-soundproofed-for-record-2025-12-17-14-57-27-utc.mp4"
  ];
  const [currentHeroVideoIndex, setCurrentHeroVideoIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentHeroVideoIndex((prevIndex) => (prevIndex + 1) % heroVideos.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentHeroVideoIndex]);
  const carouselProducts = products.slice(0, 10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const item = carouselRef.current.children[0];
        if (item) {
          const itemWidth = item.clientWidth + 32; // Include gap
          let nextSlide = currentSlide + 1;
          
          // Check if we've reached the end
          if (carouselRef.current.scrollLeft + carouselRef.current.clientWidth >= carouselRef.current.scrollWidth - 10) {
            nextSlide = 0;
          }
          
          carouselRef.current.scrollTo({
            left: nextSlide * itemWidth,
            behavior: 'smooth'
          });
          // State is updated in handleScroll
        }
      }
    }, 4000); // 4 seconds
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0]?.clientWidth + 32;
      const scrollLeft = carouselRef.current.scrollLeft;
      const newSlide = Math.round(scrollLeft / itemWidth);
      if (newSlide !== currentSlide && newSlide >= 0 && newSlide < carouselProducts.length) {
        setCurrentSlide(newSlide);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasPlayedShowcase) {
        setIsVideoPlaying(true);
        setHasPlayedShowcase(true);
      }
    }, { threshold: 0.5 });

    if (videoWrapperRef.current) {
      observer.observe(videoWrapperRef.current);
    }

    return () => {
      if (videoWrapperRef.current) {
        observer.unobserve(videoWrapperRef.current);
      }
    };
  }, [hasPlayedShowcase]);

  const categories = [
    { id: 'floors', title: 'Floors', image: '/images/home-cat-floor.webp', link: '/category/floors' },
    { id: 'walls', title: 'Walls', image: '/images/home-cat-wall.webp', link: '/category/walls' },
    { id: 'ceilings', title: 'Ceilings', image: '/images/home-cat-ceiling2.webp', link: '/category/ceilings' },
    { id: 'accessories', title: 'Accessories', image: '/images/home-cat-access.webp', link: '/category/accessories' },
  ];



  return (
    <div className="home-page">
      <SEO 
        title="Home" 
        description="Silent Guard Acoustics offers professional sound insulation solutions designed to reduce noise, enhance comfort, and protect your peace in any space." 
      />

      {/* Full Width Hero Section */}
      <section className="animate-fade-in-up">
        <div className="hero hero-slide hero-video-wrapper">
          <video 
            className="hero-video-bg"
            src={heroVideos[currentHeroVideoIndex]} 
            autoPlay 
            muted 
            loop
            playsInline
          ></video>
          <div className="hero-gradient"></div>
          <div className="hero-content">
            <h1>Silence Is Not a Luxury - It's a Necessity</h1>
            <p>Noise steals comfort - reclaim your quiet. Explore our smart and affordable soundproofing solutions.</p>
          </div>
        </div>
      </section>

      {/* Welcome / SEO Section */}
      <section className="container py-5 animate-fade-in-up delay-200">
        <div className="home-seo-text">
          <h2>Welcome to your source for Soundproofing</h2>
          <p>Enhance your living or working environment with our tailored soundproofing services - designed to block unwanted noise and boost comfort. From walls to windows, ceilings to floors, we deliver seamless solutions that match your space and acoustic needs.</p>
        </div>
      </section>

      {/* Main Categories Grid */}
      <section className="container py-4">
        <h2 className="section-title animate-fade-in-up delay-300">Explore Categories</h2>
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
        <div className="products-carousel-container animate-fade-in-up delay-400">
          <div 
            className="products-carousel" 
            ref={carouselRef} 
            onScroll={handleCarouselScroll}
          >
            {carouselProducts.map((product, index) => (
              <div key={product.id} className="product-card">
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
          
          <div className="carousel-dots">
            {carouselProducts.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => {
                  if (carouselRef.current) {
                    const itemWidth = carouselRef.current.children[0]?.clientWidth + 32;
                    carouselRef.current.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
                    setCurrentSlide(index);
                  }
                }}
                aria-label={`Go to product slide ${index + 1}`}
              ></button>
            ))}
          </div>
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
      
      {/* Video Showcase Section */}
      <section className="video-showcase-section animate-fade-in-up delay-100">
        <div className="video-showcase-overlay"></div>
        <div className="container video-showcase-content">
          <div className="video-showcase-left">
            <h2>Watch Our Soundproofing<br/>Projects in Action</h2>
            <div className="video-showcase-divider"></div>
            <div className="video-showcase-desc">
              <div className="video-showcase-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <p>From homes to studios, see how we bring silence to life. With years of experience, we specialize in delivering high-performance soundproofing solutions tailored to your space - whether it's doors, walls, windows, or entire rooms. Our work blends technical precision with acoustic comfort to meet your unique needs.</p>
            </div>
            <Link to="/contact" className="btn video-contact-btn">
              Contact Now <span className="arrow">→</span>
            </Link>
          </div>
          <div className="video-showcase-right">
            <div className="video-embed-wrapper" ref={videoWrapperRef} onClick={() => setIsVideoPlaying(true)}>
              {!isVideoPlaying ? (
                <div className="video-thumbnail-overlay">
                  <img src="https://i.ytimg.com/vi/9fKA1_FsLWM/maxresdefault.jpg" alt="Video thumbnail" />
                  <button className="video-play-btn" aria-label="Play video">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              ) : (
                <video 
                  src="/video/soundproofing-projects.mp4" 
                  autoPlay 
                  controls 
                  playsInline
                  controlsList="nodownload"
                  className="native-showcase-video"
                ></video>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Home FAQ Section */}
      <section className="container py-5 animate-fade-in-up delay-200">
        <div className="home-faq-layout">
          <div className="home-faq-left">
            <div className="faq-bg-text">FAQs</div>
            <h2>Our frequently <span>asked questions</span></h2>
            <p className="faq-intro-text">Find answers to the most common questions about our soundproofing services. From installation timelines to compatibility with your current space, we cover everything you need to know about creating a quieter environment.</p>
            
            <div className="faq-contact-card">
              <div className="faq-contact-header">
                <div className="faq-question-mark">?</div>
                <h3>Still Have Questions?</h3>
              </div>
              <p>What question or topic would you like assistance with today?</p>
              <Link to="/contact" className="btn btn-primary btn-block">Get In Touch</Link>
            </div>
          </div>
          
          <div className="home-faq-right">
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details key={index} className="faq-item" name="home-faq-accordion">
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
      </section>

      {/* Bottom SEO Section */}
      <section className="container py-5 bottom-seo-section animate-fade-in-up">
        <h2>Why Choose Silent Guard Acoustics LLC for Sound Insulation?</h2>
        <p>At Silent Guard Acoustics, we specialize in high-performance <strong>sound insulation</strong> solutions tailored for a wide range of environments. Whether you're looking to block noise, improve acoustics, or create a more private and productive atmosphere, our team delivers expert results with precision and professionalism.</p>
        
        <p>Our soundproofing systems are engineered for maximum noise reduction and acoustic performance. We use premium-grade materials and modern installation techniques to ensure optimal results across all project types.</p>
        
        <h3>We provide professional sound insulation services for:</h3>
        <ul className="seo-list">
          <li><strong>Residential Homes</strong> – Reduce street noise, neighbor disturbance, and room-to-room sound transfer.</li>
          <li><strong>Corporate Offices</strong> – Improve focus and confidentiality in open-plan spaces or meeting rooms.</li>
          <li><strong>Recording Studios</strong> – Achieve industry-level acoustic clarity with wall, ceiling, and floor treatments.</li>
          <li><strong>Hotels & Hospitality</strong> – Enhance guest comfort and satisfaction by minimizing noise from adjacent rooms or hallways.</li>
          <li><strong>Hospitals & Clinics</strong> – Promote healing and concentration by reducing ambient and structural noise.</li>
          <li><strong>Educational Institutions</strong> – Improve speech intelligibility and reduce distractions in classrooms and lecture halls.</li>
          <li><strong>Restaurants & Cafés</strong> – Create a pleasant dining atmosphere by managing reverb and chatter.</li>
          <li><strong>Industrial Facilities</strong> – Ensure compliance with noise regulations and improve worker safety.</li>
          <li><strong>Retail Stores & Showrooms</strong> – Maintain a calm and inviting environment for customers.</li>
          <li><strong>Home Theaters & Media Rooms</strong> – Enjoy immersive experiences without disturbing others.</li>
        </ul>

        <p>From small-scale projects to large commercial developments, Silent Guard Acoustics is committed to delivering reliable, effective, and aesthetically pleasing <strong>sound insulation</strong> solutions that transform your environment.</p>
        
        <p><strong><Link to="/contact">Contact us today</Link></strong> to learn how we can help you create a quieter, more comfortable space.</p>
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

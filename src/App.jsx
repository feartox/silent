import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import Subcategory from './pages/Subcategory';
import Product from './pages/Product';
import Service from './pages/Service';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';

import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/subcategory/:id" element={<Subcategory />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/service/:id" element={<Service />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
        <LanguageSwitcher />
      </div>
    </Router>
  );
}

export default App;

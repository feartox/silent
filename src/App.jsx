import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import Subcategory from './pages/Subcategory';
import Product from './pages/Product';
import Service from './pages/Service';
import Contact from './pages/Contact';

import About from './pages/About';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  return (
    <Router>
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
          </Routes>
        </main>
        <Footer />
        <LanguageSwitcher />
      </div>
    </Router>
  );
}

export default App;

import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { products, categories } from '../data/catalog';
import './Product.css';

const Product = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product Not Found</h2>
        <Link to="/" className="btn btn-primary mt-2">Return Home</Link>
      </div>
    );
  }

  // Find parent category for breadcrumb
  let parentCategory = null;
  for (const cat of categories) {
    if (cat.id === product.categoryId) {
      parentCategory = cat;
      break;
    }
  }

  return (
    <div className="product-page py-5">
      <SEO 
        title={product.name} 
        description={`Discover ${product.name} at Silent Guard Acoustics. ${(product.description || '').substring(0, 150)}...`} 
      />
      <div className="container">
        {parentCategory && (
          <div className="breadcrumbs mb-2">
            <Link to="/">Home</Link> &gt; <Link to={`/category/${parentCategory.id}`}>{parentCategory.name}</Link> &gt; <span>{product.name}</span>
          </div>
        )}
        <div className="product-layout">
          <div className="product-image-large">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-details">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-description mt-2">
              <h3>Overview</h3>
              <p>{product.description || 'Professional grade silentguardacoustics material designed to block unwanted noise and enhance comfort in your environment. Suitable for commercial and residential applications.'}</p>
            </div>
            <div className="product-actions-large mt-3">
              <Link to="/contact" className="btn btn-primary">Contact for Orders</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { categories, products } from '../data/catalog';
import './Category.css';

const Subcategory = () => {
  const { id } = useParams();
  
  let parentCategory = null;
  let subcategory = null;
  
  for (const cat of categories) {
    if (cat.subcategories) {
      const found = cat.subcategories.find(s => s.id === id);
      if (found) {
        parentCategory = cat;
        subcategory = found;
        break;
      }
    }
  }

  if (!subcategory) {
    return (
      <div className="container py-5 text-center">
        <h2>Subcategory Not Found</h2>
        <Link to="/" className="btn btn-primary mt-2">Return Home</Link>
      </div>
    );
  }

  const subcategoryProducts = products.filter(p => p.subcategoryId === id);

  return (
    <div className="category-page py-5">
      <SEO 
        title={`${subcategory.name} Silent Guard Acoustics`} 
        description={`Explore our high-quality ${subcategory.name.toLowerCase()} Silent Guard Acoustics products.`} 
      />
      <div className="container">
        <div className="breadcrumbs mb-2">
          <Link to="/">Home</Link> &gt; <Link to={`/category/${parentCategory.id}`}>{parentCategory.name}</Link> &gt; <span>{subcategory.name}</span>
        </div>
      
        <h1 className="section-title"><span>{subcategory.name}</span></h1>
        
        {subcategory.description && (
          <p className="text-center" style={{color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: '1.7'}}>{subcategory.description}</p>
        )}
        
        {subcategoryProducts.length === 0 ? (
          <div className="text-center" style={{padding: '4rem 0'}}>
            <p style={{fontSize: '1.1rem', color: 'var(--text-secondary)'}}>No products currently available in this subcategory.</p>
            <Link to={`/category/${parentCategory.id}`} className="btn btn-outline mt-2">Browse {parentCategory.name}</Link>
          </div>
        ) : (
          <div className="products-grid mt-4">
            {subcategoryProducts.map((product, index) => (
              <div key={product.id} className={`product-card animate-fade-in-up delay-${(index % 5 + 1) * 100}`}>
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
        )}
      </div>
    </div>
  );
};

export default Subcategory;

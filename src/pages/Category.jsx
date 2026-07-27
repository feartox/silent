import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { categories, products } from '../data/catalog';
import './Category.css';

const Category = () => {
  const { id } = useParams();
  const category = categories.find(c => c.id === id);
  
  if (!category) {
    return (
      <div className="container py-5 text-center">
        <h2>Category Not Found</h2>
        <Link to="/" className="btn btn-primary mt-2">Return Home</Link>
      </div>
    );
  }

  // If the category has no subcategories, show its products directly
  const categoryProducts = products.filter(p => p.categoryId === id && !p.subcategoryId);

  return (
    <div className="category-page">
      <SEO 
        title={`${category.name} Silent Guard Acoustics`} 
        description={`Explore our high-quality Silent Guard Acoustics products for ${category.name.toLowerCase()}. Find the perfect acoustic solution for your needs.`} 
      />

      <div className="bg-light py-5 mb-5 text-center">
        <h1 className="section-title animate-fade-in-up"><span>{category.name}</span></h1>
      </div>

      <div className="container">
        {/* Subcategories Grid */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="subcategories-grid mb-5">
            {category.subcategories.map((sub, index) => (
              <div key={sub.id} className={`subcategory-card animate-fade-in-up delay-${(index % 5 + 1) * 100}`}>
                <Link to={`/subcategory/${sub.id}`}>
                  <div className="subcategory-img-wrap">
                    <img src={sub.image} alt={sub.name} />
                  </div>
                  <h3>{sub.name}</h3>
                </Link>
                <div className="subcategory-desc">{sub.description}</div>
              </div>
            ))}
          </div>
        )}
        
        {/* Products Grid (if any direct products) */}
        {categoryProducts.length > 0 && (
          <div className="products-grid mb-5">
            {categoryProducts.map((product, index) => (
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

        {/* SEO Text at the bottom */}
        {category.seoText && (
          <div className="category-seo-text mt-5 animate-fade-in-up delay-500" dangerouslySetInnerHTML={{ __html: category.seoText }}></div>
        )}
      </div>
    </div>
  );
};

export default Category;

const fs = require('fs');
const path = require('path');

const homeJsxPath = path.join(__dirname, 'src/pages/Home.jsx');
let homeJsx = fs.readFileSync(homeJsxPath, 'utf8');

const newSection = `
      {/* Custom Doors Section */}
      <section className="custom-doors-section py-5 animate-fade-in-up delay-300">
        <div className="container">
          <div className="custom-doors-layout">
            <div className="custom-doors-image">
              <img src="/images/Custom-SilentGuardAcoustics-Interior-Doors.webp" alt="Custom Interior Doors" className="img-fluid rounded shadow" />
            </div>
            <div className="custom-doors-content">
              <h2>Custom Interior Doors</h2>
              <p>Experience the perfect blend of elegant design and unparalleled sound isolation. Our custom-built interior doors are engineered to block unwanted noise, ensuring your privacy and comfort without compromising on style. Perfect for home offices, bedrooms, and recording studios.</p>
              <Link to="/service/silentguardacoustics-door" className="btn custom-doors-btn">
                Discover Our Doors
              </Link>
            </div>
          </div>
        </div>
      </section>
`;

if (!homeJsx.includes('custom-doors-section')) {
  // Insert after Categories Grid
  const searchString = '        </div>\n      </section>';
  const insertPos = homeJsx.indexOf(searchString, homeJsx.indexOf('Categories Grid')) + searchString.length;
  homeJsx = homeJsx.slice(0, insertPos) + '\n' + newSection + homeJsx.slice(insertPos);
  fs.writeFileSync(homeJsxPath, homeJsx);
}

const homeCssPath = path.join(__dirname, 'src/pages/Home.css');
let homeCss = fs.readFileSync(homeCssPath, 'utf8');

const newCss = `
/* ===== CUSTOM DOORS SECTION ===== */
.custom-doors-section {
  background-color: var(--primary-color, #1a3d31);
  color: white;
  margin: 3rem auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  max-width: 1200px;
}

.custom-doors-layout {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 3rem;
}

.custom-doors-image {
  flex: 1;
}

.custom-doors-image img {
  border-radius: 12px;
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.custom-doors-image img:hover {
  transform: scale(1.02);
}

.custom-doors-content {
  flex: 1;
}

.custom-doors-content h2 {
  color: white;
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.custom-doors-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgba(255,255,255,0.9);
}

.custom-doors-btn {
  background-color: white;
  color: var(--primary-color, #1a3d31);
  font-weight: 600;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  display: inline-block;
  transition: all 0.3s ease;
  text-decoration: none;
}

.custom-doors-btn:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
  color: var(--primary-color, #1a3d31);
}

@media (max-width: 992px) {
  .custom-doors-layout {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
    padding: 2rem;
  }
}
`;

if (!homeCss.includes('custom-doors-section')) {
  fs.appendFileSync(homeCssPath, '\n' + newCss);
}

console.log('Updated Home.jsx and Home.css');

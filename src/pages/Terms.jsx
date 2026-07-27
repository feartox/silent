import React from 'react';
import SEO from '../components/SEO';

const Terms = () => {
  return (
    <div className="container py-5">
      <SEO 
        title="Terms & Services" 
        description="Terms & Services for Silent Guard Acoustics." 
      />
      
      <div className="row justify-content-center">
        <div className="col-lg-8" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="mb-4 text-center">Terms & Services</h1>
          <p className="text-muted text-center mb-5">Last Updated: July 2026</p>

          <div className="content-block mb-4">
            <h4>1. Acceptance of Terms</h4>
            <p>By accessing and using the Silent Guard Acoustics website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
          </div>

          <div className="content-block mb-4">
            <h4>2. Services Overview</h4>
            <p>Silent Guard Acoustics provides silentguardacoustics and acoustical solutions, including consultations, material recommendations, and installation services. All information provided on this website is for informational purposes and is subject to change without notice.</p>
          </div>

          <div className="content-block mb-4">
            <h4>3. Intellectual Property Rights</h4>
            <p>The website and its original content, features, and functionality are owned by Silent Guard Acoustics and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
          </div>

          <div className="content-block mb-4">
            <h4>4. User Conduct</h4>
            <p>You agree not to use the website in a way that may cause the website to be interrupted, damaged, rendered less efficient, or such that the effectiveness or functionality of the website is in any way impaired.</p>
          </div>

          <div className="content-block mb-4">
            <h4>5. Limitation of Liability</h4>
            <p>In no event shall Silent Guard Acoustics, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
          </div>
          
          <div className="content-block mb-4">
            <h4>6. Contact Us</h4>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>
              Email: info@silentguardacousticspro.com<br />
              Phone: 1-888-927-7495
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;

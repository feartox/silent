import React from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="container py-5">
      <SEO 
        title="Privacy Policy" 
        description="Privacy Policy for Silent Guard Acoustics." 
      />
      
      <div className="row justify-content-center">
        <div className="col-lg-8" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="mb-4 text-center">Privacy Policy</h1>
          <p className="text-muted text-center mb-5">Last Updated: July 2026</p>

          <div className="content-block mb-4">
            <h4>1. Introduction</h4>
            <p>Welcome to Silent Guard Acoustics. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
          </div>

          <div className="content-block mb-4">
            <h4>2. The Data We Collect About You</h4>
            <p>Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul>
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            </ul>
          </div>

          <div className="content-block mb-4">
            <h4>3. How We Use Your Personal Data</h4>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul>
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
          </div>

          <div className="content-block mb-4">
            <h4>4. Data Security</h4>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
          </div>

          <div className="content-block mb-4">
            <h4>5. Contact Details</h4>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
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

export default PrivacyPolicy;

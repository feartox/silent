import { useEffect } from 'react';

const SEO = ({ title, description }) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | Silent Guard Acoustics` : 'Silent Guard Acoustics | Professional Sound Insulation';
    document.title = fullTitle;
    
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', description);
        document.head.appendChild(metaDescription);
      }
    }
  }, [title, description]);

  return null;
};

export default SEO;

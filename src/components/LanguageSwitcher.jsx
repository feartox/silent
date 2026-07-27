import { useState, useEffect } from 'react';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  const languages = [
    { code: 'en', name: 'English', short: 'EN', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'es', name: 'Spanish', short: 'ES', flag: 'https://flagcdn.com/w40/es.png' },
    { code: 'tr', name: 'Turkish', short: 'TR', flag: 'https://flagcdn.com/w40/tr.png' }
  ];

  useEffect(() => {
    // Add Google Translate Script
    const addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);
    
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,es,tr',
        autoDisplay: false
      }, 'google_translate_element');
    };
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    
    // Trigger Google Translate hidden select
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  };

  const current = languages.find(l => l.code === currentLang);
  const others = languages.filter(l => l.code !== currentLang);

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      <div className="language-switcher-container">
        {isOpen && (
          <div className="language-dropdown">
            {others.map(lang => (
              <div 
                key={lang.code} 
                className="language-option"
                onClick={() => handleLanguageChange(lang.code)}
              >
                <img src={lang.flag} alt={lang.name} className="flag-icon" />
                <span>{lang.name}</span>
              </div>
            ))}
          </div>
        )}
        
        <div 
          className="language-toggle" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={current.flag} alt={current.name} className="flag-icon" />
          <span className="lang-short">{current.short}</span>
          <svg className={`chevron ${isOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </>
  );
};

export default LanguageSwitcher;

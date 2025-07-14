import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = ({ language, setLanguage, isMobile }) => {
  const navigate = useNavigate();

  const translations = {
    en: {
      aboutUs: 'About Us',
      terms: 'Terms & Conditions',
      privacy: 'Privacy Policy',
      followUs: 'Follow Us',
      sinhala: 'සිංහල',
      english: 'English',
      copyright: '© 2024 Sri Lanka Bikes. All rights reserved.'
    },
    si: {
      aboutUs: 'අප ගැන',
      terms: 'නියම සහ කොන්දේසි',
      privacy: 'පෞද්ගලිකත්ව ප්‍රතිපත්තිය',
      followUs: 'අපව අනුගමනය කරන්න',
      sinhala: 'සිංහල',
      english: 'English',
      copyright: '© 2024 Sri Lanka Bikes. සියලුම හිමිකම් ආරක්ෂිතයි.'
    }
  };

  const t = translations[language];

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <i className="pi pi-car text-3xl"></i>
            <span>Sri Lanka Bikes</span>
          </div>
          <p>Sri Lanka's premier motorcycle marketplace</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Button label={t.aboutUs} className="p-button-text footer-link" /></li>
            <li><Button label={t.terms} className="p-button-text footer-link" /></li>
            <li><Button label={t.privacy} className="p-button-text footer-link" /></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{t.followUs}</h4>
          <div className="social-links">
            <Button
              icon="pi pi-facebook"
              className="p-button-rounded p-button-text social-btn"
              onClick={() => window.open('https://facebook.com', '_blank')}
            />
            <Button
              icon="pi pi-youtube"
              className="p-button-rounded p-button-text social-btn"
              onClick={() => window.open('https://youtube.com', '_blank')}
            />
          </div>
        </div>

        <div className="footer-section">
          <h4>Language</h4>
          <div className="footer-language-toggle">
            <Button
              label={t.sinhala}
              className={`p-button-text ${language === 'si' ? 'active' : ''}`}
              onClick={() => setLanguage('si')}
            />
            <span>|</span>
            <Button
              label={t.english}
              className={`p-button-text ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;

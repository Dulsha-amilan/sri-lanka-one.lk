import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ language, setLanguage, isMobile }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const translations = {
    en: {
      home: 'Home',
      motorcycles: 'Motorcycles',
      spareParts: 'Spare Parts',
      bikerGear: 'Biker Gear',
      garages: 'Garages',
      help: 'Help & Tips',
      postAd: 'Post Your Ad',
      sinhala: 'සිංහල',
      english: 'English'
    },
    si: {
      home: 'මුල් පිටුව',
      motorcycles: 'යතුරුපැදි',
      spareParts: 'අමතර කොටස්',
      bikerGear: 'බයිකර් උපකරණ',
      garages: 'ගරාජ්',
      help: 'උදව් සහ ඉඟි',
      postAd: 'ඔබේ දැන්වීම',
      sinhala: 'සිංහල',
      english: 'English'
    }
  };

  const t = translations[language];

  const menuItems = [
    { label: t.home, command: () => navigate('/') },
    { label: t.motorcycles, command: () => navigate('/motorcycles') },
    { label: t.spareParts, command: () => navigate('/spare-parts') },
    { label: t.bikerGear, command: () => navigate('/biker-gear') },
    { label: t.garages, command: () => navigate('/garages') },
    { label: t.help, command: () => navigate('/help') }
  ];

  const logo = (
    <div className="logo" onClick={() => navigate('/')}>
      <i className="pi pi-car text-4xl"></i>
      <span className="logo-text">Sri Lanka Bikes</span>
    </div>
  );

  const rightContent = (
    <div className="header-right">
      <div className="language-toggle">
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
      <Button
        label={t.postAd}
        className="post-ad-btn"
        onClick={() => navigate('/post-ad')}
      />
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div className="mobile-header">
          <Button
            icon="pi pi-bars"
            className="p-button-text"
            onClick={() => setSidebarVisible(true)}
          />
          {logo}
          <div className="mobile-language">
            <Button
              label={language === 'en' ? 'සි' : 'En'}
              className="p-button-text"
              onClick={() => setLanguage(language === 'en' ? 'si' : 'en')}
            />
          </div>
        </div>
        
        <Sidebar
          visible={sidebarVisible}
          onHide={() => setSidebarVisible(false)}
          className="mobile-sidebar"
        >
          <div className="mobile-menu">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                label={item.label}
                className="p-button-text mobile-menu-item"
                onClick={() => {
                  item.command();
                  setSidebarVisible(false);
                }}
              />
            ))}
            <Button
              label={t.postAd}
              className="mobile-post-ad-btn"
              onClick={() => {
                navigate('/post-ad');
                setSidebarVisible(false);
              }}
            />
          </div>
        </Sidebar>
      </>
    );
  }

  return (
    <Menubar
      model={menuItems}
      start={logo}
      end={rightContent}
      className="main-header"
    />
  );
};

export default Header;

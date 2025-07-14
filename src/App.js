import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import BuySellMotorcycles from './pages/BuySellMotorcycles';
import SpareParts from './pages/SpareParts';
import BikerGear from './pages/BikerGear';
import GaragesServices from './pages/GaragesServices';
import BikeHelp from './pages/BikeHelp';
import PostAd from './pages/PostAd';
import UserPanel from './pages/UserPanel';
import CustomerSupport from './components/CustomerSupport';

function App() {
  const [language, setLanguage] = useState('en');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <PrimeReactProvider>
      <Router>
        <div className="App">
          <Header language={language} setLanguage={setLanguage} isMobile={isMobile} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Homepage language={language} isMobile={isMobile} />} />
              <Route path="/motorcycles" element={<BuySellMotorcycles language={language} isMobile={isMobile} />} />
              <Route path="/spare-parts" element={<SpareParts language={language} isMobile={isMobile} />} />
              <Route path="/biker-gear" element={<BikerGear language={language} isMobile={isMobile} />} />
              <Route path="/garages" element={<GaragesServices language={language} isMobile={isMobile} />} />
              <Route path="/help" element={<BikeHelp language={language} isMobile={isMobile} />} />
              <Route path="/post-ad" element={<PostAd language={language} isMobile={isMobile} />} />
              <Route path="/user-panel" element={<UserPanel language={language} isMobile={isMobile} />} />
            </Routes>
          </main>
          <CustomerSupport isMobile={isMobile} />
          <Footer language={language} setLanguage={setLanguage} isMobile={isMobile} />
        </div>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;

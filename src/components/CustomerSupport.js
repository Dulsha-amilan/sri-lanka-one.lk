import React from 'react';
import { Button } from 'primereact/button';
import './CustomerSupport.css';

const CustomerSupport = ({ isMobile }) => {
  const handleCall = () => {
    window.location.href = 'tel:+94112345678';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/94712345678', '_blank');
  };

  return (
    <div className="customer-support">
      <Button
        icon="pi pi-phone"
        className="support-btn call-btn"
        onClick={handleCall}
        tooltip="Call us now"
        tooltipOptions={{ position: 'top' }}
      />
      <Button
        icon="pi pi-whatsapp"
        className="support-btn whatsapp-btn"
        onClick={handleWhatsApp}
        tooltip="WhatsApp"
        tooltipOptions={{ position: 'top' }}
      />
    </div>
  );
};

export default CustomerSupport;

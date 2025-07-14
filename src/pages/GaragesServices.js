import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Badge } from 'primereact/badge';
import { Dialog } from 'primereact/dialog';
import './GaragesServices.css';

const GaragesServices = ({ language, isMobile }) => {
  const [garages, setGarages] = useState([]);
  const [filteredGarages, setFilteredGarages] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    service: '',
    searchTerm: ''
  });
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  const translations = {
    en: {
      title: 'Garages & Service Stations',
      filters: 'Filters',
      city: 'City',
      service: 'Service Type',
      search: 'Search garages...',
      applyFilters: 'Apply Filters',
      clearFilters: 'Clear Filters',
      results: 'Results',
      noResults: 'No garages found matching your criteria',
      viewDetails: 'View Details',
      callNow: 'Call Now',
      getDirections: 'Get Directions',
      addGarage: 'Add Your Garage',
      listView: 'List View',
      mapView: 'Map View',
      services: 'Services',
      contact: 'Contact',
      address: 'Address',
      openHours: 'Open Hours',
      rating: 'Rating',
      reviews: 'Reviews'
    },
    si: {
      title: 'ගරාජ් සහ සේවා මධ්‍යස්ථාන',
      filters: 'පෙරහන්',
      city: 'නගරය',
      service: 'සේවා වර්ගය',
      search: 'ගරාජ් සොයන්න...',
      applyFilters: 'පෙරහන් යොදන්න',
      clearFilters: 'පෙරහන් ඉවත් කරන්න',
      results: 'ප්‍රතිඵල',
      noResults: 'ඔබේ නිර්ණායක වලට ගැලපෙන ගරාජ් හමු නොවීය',
      viewDetails: 'විස්තර බලන්න',
      callNow: 'දැන් අමතන්න',
      getDirections: 'දිශාව ලබා ගන්න',
      addGarage: 'ඔබේ ගරාජය එක් කරන්න',
      listView: 'ලැයිස්තු දර්ශනය',
      mapView: 'සිතියම් දර්ශනය',
      services: 'සේවා',
      contact: 'සම්බන්ධතා',
      address: 'ලිපිනය',
      openHours: 'විවෘත වේලාවන්',
      rating: 'ශ්‍රේණිගත කිරීම',
      reviews: 'සමාලෝචන'
    }
  };

  const t = translations[language];

  const cities = [
    { label: 'Colombo', value: 'colombo' },
    { label: 'Kandy', value: 'kandy' },
    { label: 'Galle', value: 'galle' },
    { label: 'Jaffna', value: 'jaffna' },
    { label: 'Negombo', value: 'negombo' },
    { label: 'Matara', value: 'matara' },
    { label: 'Kurunegala', value: 'kurunegala' }
  ];

  const serviceTypes = [
    { label: 'General Repair', value: 'general' },
    { label: 'Engine Service', value: 'engine' },
    { label: 'Brake Service', value: 'brake' },
    { label: 'Electrical Work', value: 'electrical' },
    { label: 'Body Work', value: 'body' },
    { label: 'Tire Service', value: 'tire' },
    { label: 'Oil Change', value: 'oil' }
  ];

  // Mock data
  useEffect(() => {
    const mockGarages = [
      {
        id: 1,
        name: 'Pro Bike Service Center',
        city: 'colombo',
        address: '123 Galle Road, Colombo 03',
        phone: '+94112345678',
        services: ['general', 'engine', 'brake', 'electrical'],
        rating: 4.8,
        reviewCount: 156,
        openHours: '8:00 AM - 6:00 PM',
        image: '/api/placeholder/300/200',
        verified: true,
        description: 'Professional motorcycle service center with experienced technicians.'
      },
      {
        id: 2,
        name: 'Kandy Bike Repairs',
        city: 'kandy',
        address: '45 Peradeniya Road, Kandy',
        phone: '+94812345678',
        services: ['general', 'body', 'tire'],
        rating: 4.5,
        reviewCount: 89,
        openHours: '9:00 AM - 5:00 PM',
        image: '/api/placeholder/300/200',
        verified: false,
        description: 'Reliable bike repair service in the heart of Kandy.'
      },
      {
        id: 3,
        name: 'Galle Motor Works',
        city: 'galle',
        address: '78 Matara Road, Galle',
        phone: '+94912345678',
        services: ['engine', 'brake', 'electrical', 'oil'],
        rating: 4.9,
        reviewCount: 203,
        openHours: '7:30 AM - 6:30 PM',
        image: '/api/placeholder/300/200',
        verified: true,
        description: 'Complete motorcycle service solutions with modern equipment.'
      }
    ];
    
    setGarages(mockGarages);
    setFilteredGarages(mockGarages);
  }, []);

  const applyFilters = () => {
    let filtered = [...garages];

    if (filters.city) {
      filtered = filtered.filter(garage => garage.city === filters.city);
    }

    if (filters.service) {
      filtered = filtered.filter(garage => garage.services.includes(filters.service));
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(garage => 
        garage.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        garage.address.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    setFilteredGarages(filtered);
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      service: '',
      searchTerm: ''
    });
    setFilteredGarages(garages);
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleDirections = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
  };

  const getServiceLabel = (serviceCode) => {
    const service = serviceTypes.find(s => s.value === serviceCode);
    return service ? service.label : serviceCode;
  };

  const garageTemplate = (garage) => (
    <Card className="garage-card">
      <div className="garage-header">
        <div className="garage-image">
          <img src={garage.image} alt={garage.name} />
          {garage.verified && (
            <div className="verified-badge">
              <i className="pi pi-verified"></i>
            </div>
          )}
        </div>
        <div className="garage-info">
          <h3>{garage.name}</h3>
          <div className="garage-rating">
            <Rating value={garage.rating} readOnly cancel={false} />
            <span className="rating-text">
              {garage.rating} ({garage.reviewCount} {t.reviews})
            </span>
          </div>
          <div className="garage-address">
            <i className="pi pi-map-marker"></i>
            <span>{garage.address}</span>
          </div>
          <div className="garage-hours">
            <i className="pi pi-clock"></i>
            <span>{garage.openHours}</span>
          </div>
        </div>
      </div>
      
      <div className="garage-services">
        <h4>{t.services}:</h4>
        <div className="service-badges">
          {garage.services.map((service, index) => (
            <Badge key={index} value={getServiceLabel(service)} />
          ))}
        </div>
      </div>
      
      <div className="garage-actions">
        <Button
          icon="pi pi-phone"
          label={t.callNow}
          onClick={() => handleCall(garage.phone)}
          className="p-button-success"
        />
        <Button
          icon="pi pi-map"
          label={t.getDirections}
          onClick={() => handleDirections(garage.address)}
          className="p-button-outlined"
        />
        <Button
          label={t.viewDetails}
          onClick={() => {
            setSelectedGarage(garage);
            setDialogVisible(true);
          }}
          className="p-button-text"
        />
      </div>
    </Card>
  );

  return (
    <div className="garages-page">
      <div className="page-header">
        <h1>{t.title}</h1>
        <div className="page-actions">
          <div className="view-toggle">
            <Button
              icon="pi pi-list"
              label={t.listView}
              className={viewMode === 'list' ? 'p-button-filled' : 'p-button-outlined'}
              onClick={() => setViewMode('list')}
            />
            <Button
              icon="pi pi-map"
              label={t.mapView}
              className={viewMode === 'map' ? 'p-button-filled' : 'p-button-outlined'}
              onClick={() => setViewMode('map')}
            />
          </div>
          <Button
            label={t.addGarage}
            className="add-garage-btn"
          />
        </div>
      </div>

      <div className="filters-section">
        <div className="filters-grid">
          <InputText
            value={filters.searchTerm}
            onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
            placeholder={t.search}
            className="search-input"
          />
          <Dropdown
            value={filters.city}
            options={cities}
            onChange={(e) => setFilters({...filters, city: e.value})}
            placeholder={t.city}
            className="filter-dropdown"
          />
          <Dropdown
            value={filters.service}
            options={serviceTypes}
            onChange={(e) => setFilters({...filters, service: e.value})}
            placeholder={t.service}
            className="filter-dropdown"
          />
          <Button
            label={t.applyFilters}
            onClick={applyFilters}
            className="apply-btn"
          />
          <Button
            label={t.clearFilters}
            onClick={clearFilters}
            className="p-button-outlined clear-btn"
          />
        </div>
      </div>

      <div className="garages-content">
        <div className="results-header">
          <span>{filteredGarages.length} {t.results}</span>
        </div>

        {viewMode === 'list' ? (
          <div className="garages-list">
            {filteredGarages.length > 0 ? (
              filteredGarages.map((garage) => (
                <div key={garage.id}>
                  {garageTemplate(garage)}
                </div>
              ))
            ) : (
              <div className="no-results">
                <i className="pi pi-search text-6xl"></i>
                <h3>{t.noResults}</h3>
                <Button
                  label={t.clearFilters}
                  onClick={clearFilters}
                  className="p-button-outlined"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="map-view">
            <div className="map-placeholder">
              <i className="pi pi-map text-6xl"></i>
              <h3>Map View Coming Soon</h3>
              <p>Interactive map with garage locations will be available here</p>
            </div>
          </div>
        )}
      </div>

      {/* Garage Details Dialog */}
      <Dialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        header={selectedGarage?.name}
        className="garage-details-dialog"
        style={{ width: isMobile ? '95vw' : '50vw' }}
      >
        {selectedGarage && (
          <div className="garage-details">
            <img src={selectedGarage.image} alt={selectedGarage.name} className="detail-image" />
            
            <div className="detail-section">
              <h4>{t.rating}</h4>
              <div className="garage-rating">
                <Rating value={selectedGarage.rating} readOnly cancel={false} />
                <span>{selectedGarage.rating} ({selectedGarage.reviewCount} {t.reviews})</span>
              </div>
            </div>

            <div className="detail-section">
              <h4>{t.address}</h4>
              <p>{selectedGarage.address}</p>
            </div>

            <div className="detail-section">
              <h4>{t.contact}</h4>
              <p>{selectedGarage.phone}</p>
            </div>

            <div className="detail-section">
              <h4>{t.openHours}</h4>
              <p>{selectedGarage.openHours}</p>
            </div>

            <div className="detail-section">
              <h4>{t.services}</h4>
              <div className="service-badges">
                {selectedGarage.services.map((service, index) => (
                  <Badge key={index} value={getServiceLabel(service)} />
                ))}
              </div>
            </div>

            <div className="detail-section">
              <p>{selectedGarage.description}</p>
            </div>

            <div className="detail-actions">
              <Button
                icon="pi pi-phone"
                label={t.callNow}
                onClick={() => handleCall(selectedGarage.phone)}
                className="p-button-success"
              />
              <Button
                icon="pi pi-map"
                label={t.getDirections}
                onClick={() => handleDirections(selectedGarage.address)}
                className="p-button-outlined"
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default GaragesServices;

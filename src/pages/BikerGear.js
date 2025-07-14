import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import { Sidebar } from 'primereact/sidebar';
import { Badge } from 'primereact/badge';
import './BikerGear.css';

const BikerGear = ({ language, isMobile }) => {
  const [gear, setGear] = useState([]);
  const [filteredGear, setFilteredGear] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    size: '',
    condition: '',
    searchTerm: ''
  });
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows] = useState(12);

  const translations = {
    en: {
      title: 'Biker Gear & Helmets',
      filters: 'Filters',
      category: 'Category',
      brand: 'Brand',
      size: 'Size',
      condition: 'Condition',
      search: 'Search gear...',
      applyFilters: 'Apply Filters',
      clearFilters: 'Clear Filters',
      results: 'Results',
      noResults: 'No biker gear found matching your criteria',
      viewDetails: 'View Details',
      contactSeller: 'Contact Seller',
      verifiedSeller: 'Verified Seller',
      new: 'New',
      used: 'Used'
    },
    si: {
      title: 'බයිකර් උපකරණ සහ හිස්වැසුම්',
      filters: 'පෙරහන්',
      category: 'කාණ්ඩය',
      brand: 'සන්නාමය',
      size: 'ප්‍රමාණය',
      condition: 'තත්ත්වය',
      search: 'උපකරණ සොයන්න...',
      applyFilters: 'පෙරහන් යොදන්න',
      clearFilters: 'පෙරහන් ඉවත් කරන්න',
      results: 'ප්‍රතිඵල',
      noResults: 'ඔබේ නිර්ණායක වලට ගැලපෙන බයිකර් උපකරණ හමු නොවීය',
      viewDetails: 'විස්තර බලන්න',
      contactSeller: 'විකුණන්නා සම්බන්ධ කරන්න',
      verifiedSeller: 'සත්‍යාපිත විකුණන්නා',
      new: 'නව',
      used: 'පාවිච්චි කළ'
    }
  };

  const t = translations[language];

  const categories = [
    { label: 'Full Face Helmets', value: 'helmet-full' },
    { label: 'Half Face Helmets', value: 'helmet-half' },
    { label: 'Modular Helmets', value: 'helmet-modular' },
    { label: 'Gloves', value: 'gloves' },
    { label: 'Jackets', value: 'jackets' },
    { label: 'Boots', value: 'boots' },
    { label: 'Rain Gear', value: 'rain-gear' },
    { label: 'Reflective Vests', value: 'reflective' }
  ];

  const brands = [
    { label: 'Shoei', value: 'shoei' },
    { label: 'Arai', value: 'arai' },
    { label: 'HJC', value: 'hjc' },
    { label: 'AGV', value: 'agv' },
    { label: 'Alpinestars', value: 'alpinestars' },
    { label: 'Dainese', value: 'dainese' }
  ];

  const sizes = [
    { label: 'XS', value: 'xs' },
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
    { label: 'XL', value: 'xl' },
    { label: 'XXL', value: 'xxl' }
  ];

  const conditions = [
    { label: 'New', value: 'new' },
    { label: 'Used', value: 'used' }
  ];

  // Mock data
  useEffect(() => {
    const mockGear = [
      {
        id: 1,
        title: 'Shoei RF-1200 Full Face Helmet',
        price: 85000,
        image: '/api/placeholder/300/200',
        category: 'helmet-full',
        brand: 'shoei',
        size: 'l',
        condition: 'new',
        seller: 'Helmet World Colombo',
        location: 'Colombo',
        verified: true,
        rating: 4.8
      },
      {
        id: 2,
        title: 'Alpinestars GP Plus R Gloves',
        price: 12500,
        image: '/api/placeholder/300/200',
        category: 'gloves',
        brand: 'alpinestars',
        size: 'm',
        condition: 'used',
        seller: 'Biker Gear Shop',
        location: 'Kandy',
        verified: false,
        rating: 4.5
      },
      {
        id: 3,
        title: 'Dainese Racing Jacket',
        price: 45000,
        image: '/api/placeholder/300/200',
        category: 'jackets',
        brand: 'dainese',
        size: 'l',
        condition: 'new',
        seller: 'Pro Biker Store',
        location: 'Galle',
        verified: true,
        rating: 4.9
      }
    ];
    
    setGear(mockGear);
    setFilteredGear(mockGear);
  }, []);

  const applyFilters = () => {
    let filtered = [...gear];

    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    if (filters.brand) {
      filtered = filtered.filter(item => item.brand === filters.brand);
    }

    if (filters.size) {
      filtered = filtered.filter(item => item.size === filters.size);
    }

    if (filters.condition) {
      filtered = filtered.filter(item => item.condition === filters.condition);
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    setFilteredGear(filtered);
    setFirst(0);
    if (isMobile) setSidebarVisible(false);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      size: '',
      condition: '',
      searchTerm: ''
    });
    setFilteredGear(gear);
    setFirst(0);
  };

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const gearTemplate = (item) => (
    <Card className="biker-gear-card">
      <div className="gear-image">
        <img src={item.image} alt={item.title} />
        <div className="gear-condition">{item.condition}</div>
        {item.verified && (
          <div className="verified-badge">
            <i className="pi pi-verified"></i>
          </div>
        )}
      </div>
      <div className="gear-content">
        <h3>{item.title}</h3>
        <div className="gear-price">{formatPrice(item.price)}</div>
        <div className="gear-details">
          <span className="gear-size">Size: {item.size.toUpperCase()}</span>
          <div className="gear-rating">
            <i className="pi pi-star-fill"></i>
            <span>{item.rating}</span>
          </div>
        </div>
        <div className="gear-seller">
          <i className="pi pi-user"></i>
          <span>{item.seller}</span>
          {item.verified && (
            <Badge value={t.verifiedSeller} severity="success" />
          )}
        </div>
        <div className="gear-location">
          <i className="pi pi-map-marker"></i> {item.location}
        </div>
        <div className="gear-actions">
          <Button label={t.viewDetails} className="p-button-outlined" />
          <Button label={t.contactSeller} />
        </div>
      </div>
    </Card>
  );

  const filtersPanel = (
    <div className="filters-panel">
      <div className="filters-header">
        <h3>{t.filters}</h3>
        <Button
          label={t.clearFilters}
          className="p-button-text"
          onClick={clearFilters}
        />
      </div>

      <div className="filter-group">
        <label>{t.search}</label>
        <InputText
          value={filters.searchTerm}
          onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
          placeholder={t.search}
          className="w-full"
        />
      </div>

      <div className="filter-group">
        <label>{t.category}</label>
        <Dropdown
          value={filters.category}
          options={categories}
          onChange={(e) => setFilters({...filters, category: e.value})}
          placeholder="Select category"
          className="w-full"
        />
      </div>

      <div className="filter-group">
        <label>{t.brand}</label>
        <Dropdown
          value={filters.brand}
          options={brands}
          onChange={(e) => setFilters({...filters, brand: e.value})}
          placeholder="Select brand"
          className="w-full"
        />
      </div>

      <div className="filter-group">
        <label>{t.size}</label>
        <Dropdown
          value={filters.size}
          options={sizes}
          onChange={(e) => setFilters({...filters, size: e.value})}
          placeholder="Select size"
          className="w-full"
        />
      </div>

      <div className="filter-group">
        <label>{t.condition}</label>
        <Dropdown
          value={filters.condition}
          options={conditions}
          onChange={(e) => setFilters({...filters, condition: e.value})}
          placeholder="Select condition"
          className="w-full"
        />
      </div>

      <Button
        label={t.applyFilters}
        onClick={applyFilters}
        className="apply-filters-btn"
      />
    </div>
  );

  return (
    <div className="biker-gear-page">
      <div className="page-header">
        <h1>{t.title}</h1>
        {isMobile && (
          <Button
            icon="pi pi-filter"
            label={t.filters}
            onClick={() => setSidebarVisible(true)}
            className="p-button-outlined"
          />
        )}
      </div>

      <div className="biker-gear-content">
        {!isMobile && (
          <div className="filters-sidebar">
            {filtersPanel}
          </div>
        )}

        <div className="gear-main">
          <div className="results-header">
            <span>{filteredGear.length} {t.results}</span>
          </div>

          {filteredGear.length > 0 ? (
            <>
              <div className="gear-grid">
                {filteredGear
                  .slice(first, first + rows)
                  .map((item) => (
                    <div key={item.id}>
                      {gearTemplate(item)}
                    </div>
                  ))}
              </div>

              <Paginator
                first={first}
                rows={rows}
                totalRecords={filteredGear.length}
                onPageChange={(e) => setFirst(e.first)}
                className="gear-paginator"
              />
            </>
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
      </div>

      {isMobile && (
        <Sidebar
          visible={sidebarVisible}
          onHide={() => setSidebarVisible(false)}
          className="filters-sidebar-mobile"
          position="left"
        >
          {filtersPanel}
        </Sidebar>
      )}
    </div>
  );
};

export default BikerGear;

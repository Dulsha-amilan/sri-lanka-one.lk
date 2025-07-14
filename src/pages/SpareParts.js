import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import { Sidebar } from 'primereact/sidebar';
import './SpareParts.css';

const SpareParts = ({ language, isMobile }) => {
  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    compatibility: '',
    condition: '',
    searchTerm: ''
  });
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows] = useState(12);

  const translations = {
    en: {
      title: 'Motorcycle Spare Parts',
      filters: 'Filters',
      category: 'Category',
      brand: 'Brand',
      compatibility: 'Compatibility',
      condition: 'Condition',
      search: 'Search parts...',
      applyFilters: 'Apply Filters',
      clearFilters: 'Clear Filters',
      results: 'Results',
      noResults: 'No spare parts found matching your criteria',
      viewDetails: 'View Details',
      contactSeller: 'Contact Seller'
    },
    si: {
      title: 'යතුරුපැදි අමතර කොටස්',
      filters: 'පෙරහන්',
      category: 'කාණ්ඩය',
      brand: 'සන්නාමය',
      compatibility: 'ගැළපීම',
      condition: 'තත්ත්වය',
      search: 'කොටස් සොයන්න...',
      applyFilters: 'පෙරහන් යොදන්න',
      clearFilters: 'පෙරහන් ඉවත් කරන්න',
      results: 'ප්‍රතිඵල',
      noResults: 'ඔබේ නිර්ණායක වලට ගැලපෙන අමතර කොටස් හමු නොවීය',
      viewDetails: 'විස්තර බලන්න',
      contactSeller: 'විකුණන්නා සම්බන්ධ කරන්න'
    }
  };

  const t = translations[language];

  const categories = [
    { label: 'Engine Parts', value: 'engine' },
    { label: 'Tyres & Rims', value: 'tyres' },
    { label: 'Lights & Electrical', value: 'electrical' },
    { label: 'Chains & Sprockets', value: 'chains' },
    { label: 'Seats, Tanks & Mirrors', value: 'body' }
  ];

  const brands = [
    { label: 'Honda', value: 'honda' },
    { label: 'Yamaha', value: 'yamaha' },
    { label: 'Bajaj', value: 'bajaj' },
    { label: 'TVS', value: 'tvs' },
    { label: 'Hero', value: 'hero' }
  ];

  const conditions = [
    { label: 'New', value: 'new' },
    { label: 'Used', value: 'used' },
    { label: 'Refurbished', value: 'refurbished' }
  ];

  // Mock data
  useEffect(() => {
    const mockParts = [
      {
        id: 1,
        title: 'Honda CB150R Engine Oil Filter',
        price: 1500,
        image: '/api/placeholder/300/200',
        category: 'engine',
        brand: 'honda',
        condition: 'new',
        compatibility: 'Honda CB150R, CB125R',
        seller: 'Auto Parts Colombo',
        location: 'Colombo'
      },
      {
        id: 2,
        title: 'Yamaha FZ Headlight Assembly',
        price: 8500,
        image: '/api/placeholder/300/200',
        category: 'electrical',
        brand: 'yamaha',
        condition: 'used',
        compatibility: 'Yamaha FZ, FZ-S',
        seller: 'Bike Parts Kandy',
        location: 'Kandy'
      },
      {
        id: 3,
        title: 'Universal Chain Set 428H',
        price: 3200,
        image: '/api/placeholder/300/200',
        category: 'chains',
        brand: 'universal',
        condition: 'new',
        compatibility: 'Most 150cc bikes',
        seller: 'Chain World',
        location: 'Galle'
      }
    ];
    
    setParts(mockParts);
    setFilteredParts(mockParts);
  }, []);

  const applyFilters = () => {
    let filtered = [...parts];

    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    if (filters.brand) {
      filtered = filtered.filter(item => item.brand === filters.brand);
    }

    if (filters.condition) {
      filtered = filtered.filter(item => item.condition === filters.condition);
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.compatibility.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    setFilteredParts(filtered);
    setFirst(0);
    if (isMobile) setSidebarVisible(false);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      compatibility: '',
      condition: '',
      searchTerm: ''
    });
    setFilteredParts(parts);
    setFirst(0);
  };

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const partTemplate = (part) => (
    <Card className="spare-part-card">
      <div className="part-image">
        <img src={part.image} alt={part.title} />
        <div className="part-condition">{part.condition}</div>
      </div>
      <div className="part-content">
        <h3>{part.title}</h3>
        <div className="part-price">{formatPrice(part.price)}</div>
        <div className="part-compatibility">
          <strong>Compatible:</strong> {part.compatibility}
        </div>
        <div className="part-seller">
          <i className="pi pi-user"></i> {part.seller}
        </div>
        <div className="part-location">
          <i className="pi pi-map-marker"></i> {part.location}
        </div>
        <div className="part-actions">
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
    <div className="spare-parts-page">
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

      <div className="spare-parts-content">
        {!isMobile && (
          <div className="filters-sidebar">
            {filtersPanel}
          </div>
        )}

        <div className="parts-main">
          <div className="results-header">
            <span>{filteredParts.length} {t.results}</span>
          </div>

          {filteredParts.length > 0 ? (
            <>
              <div className="parts-grid">
                {filteredParts
                  .slice(first, first + rows)
                  .map((part) => (
                    <div key={part.id}>
                      {partTemplate(part)}
                    </div>
                  ))}
              </div>

              <Paginator
                first={first}
                rows={rows}
                totalRecords={filteredParts.length}
                onPageChange={(e) => setFirst(e.first)}
                className="parts-paginator"
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

export default SpareParts;

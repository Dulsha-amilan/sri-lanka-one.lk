import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Slider } from 'primereact/slider';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import { Sidebar } from 'primereact/sidebar';
import './BuySellMotorcycles.css';

const BuySellMotorcycles = ({ language, isMobile }) => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    model: '',
    year: '',
    location: '',
    condition: '',
    priceRange: [0, 1000000],
    sortBy: 'latest'
  });
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows] = useState(12);

  const translations = {
    en: {
      title: 'Buy & Sell Motorcycles',
      filters: 'Filters',
      category: 'Category',
      brand: 'Brand',
      model: 'Model',
      year: 'Year',
      location: 'Location',
      condition: 'Condition',
      priceRange: 'Price Range',
      sortBy: 'Sort By',
      applyFilters: 'Apply Filters',
      clearFilters: 'Clear Filters',
      results: 'Results',
      noResults: 'No motorcycles found matching your criteria',
      latest: 'Latest',
      lowestPrice: 'Lowest Price',
      featured: 'Featured'
    },
    si: {
      title: 'යතුරුපැදි මිලදී ගැනීම සහ විකිණීම',
      filters: 'පෙරහන්',
      category: 'කාණ්ඩය',
      brand: 'සන්නාමය',
      model: 'මාදිලිය',
      year: 'වර්ෂය',
      location: 'ස්ථානය',
      condition: 'තත්ත්වය',
      priceRange: 'මිල පරාසය',
      sortBy: 'වර්ග කරන්න',
      applyFilters: 'පෙරහන් යොදන්න',
      clearFilters: 'පෙරහන් ඉවත් කරන්න',
      results: 'ප්‍රතිඵල',
      noResults: 'ඔබේ නිර්ණායක වලට ගැලපෙන යතුරුපැදි හමු නොවීය',
      latest: 'නවතම',
      lowestPrice: 'අඩුම මිල',
      featured: 'විශේෂ'
    }
  };

  const t = translations[language];

  const categories = [
    { label: 'Trail Bikes', value: 'trail' },
    { label: 'Cruisers', value: 'cruisers' },
    { label: 'Retro / Classic', value: 'classic' },
    { label: 'Scooters', value: 'scooters' },
    { label: 'Sports Bikes', value: 'sports' },
    { label: 'High-Capacity Bikes', value: 'high-capacity' }
  ];

  const brands = [
    { label: 'Honda', value: 'honda' },
    { label: 'Yamaha', value: 'yamaha' },
    { label: 'Bajaj', value: 'bajaj' },
    { label: 'TVS', value: 'tvs' },
    { label: 'Hero', value: 'hero' },
    { label: 'Kawasaki', value: 'kawasaki' }
  ];

  const conditions = [
    { label: 'New', value: 'new' },
    { label: 'Used', value: 'used' }
  ];

  const locations = [
    { label: 'Colombo', value: 'colombo' },
    { label: 'Kandy', value: 'kandy' },
    { label: 'Galle', value: 'galle' },
    { label: 'Jaffna', value: 'jaffna' },
    { label: 'Negombo', value: 'negombo' },
    { label: 'Matara', value: 'matara' }
  ];

  const sortOptions = [
    { label: t.latest, value: 'latest' },
    { label: t.lowestPrice, value: 'price-low' },
    { label: t.featured, value: 'featured' }
  ];

  // Mock data - replace with API call
  useEffect(() => {
    const mockListings = [
      {
        id: 1,
        title: 'Honda CB 150R',
        price: 450000,
        location: 'Colombo',
        image: '/api/placeholder/300/200',
        year: 2022,
        condition: 'used',
        category: 'sports',
        brand: 'honda',
        featured: true,
        datePosted: new Date('2024-01-15')
      },
      {
        id: 2,
        title: 'Yamaha FZ-S',
        price: 320000,
        location: 'Kandy',
        image: '/api/placeholder/300/200',
        year: 2021,
        condition: 'used',
        category: 'sports',
        brand: 'yamaha',
        featured: false,
        datePosted: new Date('2024-01-10')
      },
      // Add more mock listings...
    ];
    
    setListings(mockListings);
    setFilteredListings(mockListings);
  }, []);

  const applyFilters = () => {
    let filtered = [...listings];

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    // Apply brand filter
    if (filters.brand) {
      filtered = filtered.filter(item => item.brand === filters.brand);
    }

    // Apply condition filter
    if (filters.condition) {
      filtered = filtered.filter(item => item.condition === filters.condition);
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(item => item.location.toLowerCase() === filters.location);
    }

    // Apply price range filter
    filtered = filtered.filter(item => 
      item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'featured':
        filtered.sort((a, b) => b.featured - a.featured);
        break;
      case 'latest':
      default:
        filtered.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
        break;
    }

    setFilteredListings(filtered);
    setFirst(0);
    if (isMobile) setSidebarVisible(false);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      model: '',
      year: '',
      location: '',
      condition: '',
      priceRange: [0, 1000000],
      sortBy: 'latest'
    });
    setFilteredListings(listings);
    setFirst(0);
  };

  const onPageChange = (event) => {
    setFirst(event.first);
  };

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const listingTemplate = (listing) => (
    <Card className="motorcycle-listing-card">
      <div className="listing-image">
        <img src={listing.image} alt={listing.title} />
        {listing.featured && <div className="featured-badge">Featured</div>}
        <div className="listing-condition">{listing.condition}</div>
      </div>
      <div className="listing-content">
        <h3>{listing.title}</h3>
        <div className="listing-price">{formatPrice(listing.price)}</div>
        <div className="listing-details">
          <span><i className="pi pi-calendar"></i> {listing.year}</span>
          <span><i className="pi pi-map-marker"></i> {listing.location}</span>
        </div>
        <div className="listing-actions">
          <Button label="View Details" className="p-button-outlined" />
          <Button icon="pi pi-heart" className="p-button-text" />
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

      <div className="filter-group">
        <label>{t.location}</label>
        <Dropdown
          value={filters.location}
          options={locations}
          onChange={(e) => setFilters({...filters, location: e.value})}
          placeholder="Select location"
          className="w-full"
        />
      </div>

      <div className="filter-group">
        <label>{t.priceRange}</label>
        <Slider
          value={filters.priceRange}
          onChange={(e) => setFilters({...filters, priceRange: e.value})}
          range
          min={0}
          max={1000000}
          step={10000}
          className="w-full"
        />
        <div className="price-range-display">
          <span>{formatPrice(filters.priceRange[0])}</span>
          <span>{formatPrice(filters.priceRange[1])}</span>
        </div>
      </div>

      <Button
        label={t.applyFilters}
        onClick={applyFilters}
        className="apply-filters-btn"
      />
    </div>
  );

  return (
    <div className="motorcycles-page">
      <div className="page-header">
        <h1>{t.title}</h1>
        <div className="page-actions">
          <Dropdown
            value={filters.sortBy}
            options={sortOptions}
            onChange={(e) => setFilters({...filters, sortBy: e.value})}
            placeholder={t.sortBy}
          />
          {isMobile && (
            <Button
              icon="pi pi-filter"
              label={t.filters}
              onClick={() => setSidebarVisible(true)}
              className="p-button-outlined"
            />
          )}
        </div>
      </div>

      <div className="motorcycles-content">
        {!isMobile && (
          <div className="filters-sidebar">
            {filtersPanel}
          </div>
        )}

        <div className="listings-main">
          <div className="results-header">
            <span>{filteredListings.length} {t.results}</span>
          </div>

          {filteredListings.length > 0 ? (
            <>
              <div className="listings-grid">
                {filteredListings
                  .slice(first, first + rows)
                  .map((listing) => (
                    <div key={listing.id}>
                      {listingTemplate(listing)}
                    </div>
                  ))}
              </div>

              <Paginator
                first={first}
                rows={rows}
                totalRecords={filteredListings.length}
                onPageChange={onPageChange}
                className="listings-paginator"
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

export default BuySellMotorcycles;

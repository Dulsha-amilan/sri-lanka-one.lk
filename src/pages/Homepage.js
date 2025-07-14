import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Carousel } from 'primereact/carousel';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = ({ language, isMobile }) => {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    brand: '',
    model: '',
    price: '',
    location: ''
  });

  const translations = {
    en: {
      searchPlaceholder: 'Search motorcycles...',
      brand: 'Brand',
      model: 'Model',
      price: 'Price Range',
      location: 'Location',
      search: 'Search',
      featuredListings: 'Featured Listings',
      quickFilters: 'Quick Filters',
      postYourAd: 'Post Your Ad',
      scooters: 'Scooters',
      trail: 'Trail Bikes',
      classic: 'Classic',
      sports: 'Sports Bikes',
      cruisers: 'Cruisers',
      viewAll: 'View All'
    },
    si: {
      searchPlaceholder: 'යතුරුපැදි සොයන්න...',
      brand: 'සන්නාමය',
      model: 'මාදිලිය',
      price: 'මිල පරාසය',
      location: 'ස්ථානය',
      search: 'සොයන්න',
      featuredListings: 'විශේෂ දැන්වීම්',
      quickFilters: 'ඉක්මන් පෙරහන්',
      postYourAd: 'ඔබේ දැන්වීම',
      scooters: 'ස්කූටර්',
      trail: 'ට්‍රේල් බයික්',
      classic: 'ක්ලැසික්',
      sports: 'ක්‍රීඩා බයික්',
      cruisers: 'ක්‍රූසර්',
      viewAll: 'සියල්ල බලන්න'
    }
  };

  const t = translations[language];

  const brands = [
    { label: 'Honda', value: 'honda' },
    { label: 'Yamaha', value: 'yamaha' },
    { label: 'Bajaj', value: 'bajaj' },
    { label: 'TVS', value: 'tvs' },
    { label: 'Hero', value: 'hero' }
  ];

  const locations = [
    { label: 'Colombo', value: 'colombo' },
    { label: 'Kandy', value: 'kandy' },
    { label: 'Galle', value: 'galle' },
    { label: 'Jaffna', value: 'jaffna' },
    { label: 'Negombo', value: 'negombo' }
  ];

  const priceRanges = [
    { label: 'Under Rs. 100,000', value: '0-100000' },
    { label: 'Rs. 100,000 - 300,000', value: '100000-300000' },
    { label: 'Rs. 300,000 - 500,000', value: '300000-500000' },
    { label: 'Above Rs. 500,000', value: '500000+' }
  ];

  const quickFilters = [
    { name: t.scooters, icon: 'pi-car', category: 'scooters' },
    { name: t.trail, icon: 'pi-car', category: 'trail' },
    { name: t.classic, icon: 'pi-car', category: 'classic' },
    { name: t.sports, icon: 'pi-car', category: 'sports' },
    { name: t.cruisers, icon: 'pi-car', category: 'cruisers' }
  ];

  const featuredListings = [
    {
      id: 1,
      title: 'Honda CB 150R',
      price: 'Rs. 450,000',
      location: 'Colombo',
      image: '/api/placeholder/300/200',
      year: '2022',
      condition: 'Used'
    },
    {
      id: 2,
      title: 'Yamaha FZ-S',
      price: 'Rs. 320,000',
      location: 'Kandy',
      image: '/api/placeholder/300/200',
      year: '2021',
      condition: 'Used'
    },
    {
      id: 3,
      title: 'Bajaj Pulsar NS200',
      price: 'Rs. 380,000',
      location: 'Galle',
      image: '/api/placeholder/300/200',
      year: '2023',
      condition: 'New'
    }
  ];

  const handleSearch = () => {
    navigate('/motorcycles', { state: { filters: searchFilters } });
  };

  const handleQuickFilter = (category) => {
    navigate('/motorcycles', { state: { category } });
  };

  const listingTemplate = (listing) => (
    <Card className="listing-card">
      <div className="listing-image">
        <img src={listing.image} alt={listing.title} />
        <div className="listing-condition">{listing.condition}</div>
      </div>
      <div className="listing-content">
        <h3>{listing.title}</h3>
        <div className="listing-price">{listing.price}</div>
        <div className="listing-details">
          <span><i className="pi pi-calendar"></i> {listing.year}</span>
          <span><i className="pi pi-map-marker"></i> {listing.location}</span>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Sri Lanka's #1 Bike Marketplace</h1>
          <p>Buy and sell motorcycles, spare parts, and gear</p>
          
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-grid">
              <InputText
                placeholder={t.searchPlaceholder}
                value={searchFilters.brand}
                onChange={(e) => setSearchFilters({...searchFilters, brand: e.target.value})}
                className="search-input"
              />
              <Dropdown
                value={searchFilters.brand}
                options={brands}
                onChange={(e) => setSearchFilters({...searchFilters, brand: e.value})}
                placeholder={t.brand}
                className="search-dropdown"
              />
              <Dropdown
                value={searchFilters.price}
                options={priceRanges}
                onChange={(e) => setSearchFilters({...searchFilters, price: e.value})}
                placeholder={t.price}
                className="search-dropdown"
              />
              <Dropdown
                value={searchFilters.location}
                options={locations}
                onChange={(e) => setSearchFilters({...searchFilters, location: e.value})}
                placeholder={t.location}
                className="search-dropdown"
              />
            </div>
            <Button
              label={t.search}
              onClick={handleSearch}
              className="search-btn"
            />
          </div>
        </div>
      </section>

      {/* Quick Filters */}
      <section className="quick-filters-section">
        <div className="container">
          <h2>{t.quickFilters}</h2>
          <div className="quick-filters-grid">
            {quickFilters.map((filter, index) => (
              <Button
                key={index}
                className="quick-filter-btn"
                onClick={() => handleQuickFilter(filter.category)}
              >
                <i className={`pi ${filter.icon}`}></i>
                <span>{filter.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>{t.featuredListings}</h2>
            <Button
              label={t.viewAll}
              className="p-button-text"
              onClick={() => navigate('/motorcycles')}
            />
          </div>
          
          {isMobile ? (
            <Carousel
              value={featuredListings}
              itemTemplate={listingTemplate}
              numVisible={1}
              numScroll={1}
              className="featured-carousel"
            />
          ) : (
            <div className="featured-grid">
              {featuredListings.map((listing) => (
                <div key={listing.id}>
                  {listingTemplate(listing)}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{t.postYourAd}</h2>
            <p>Sell your motorcycle quickly and easily</p>
            <Button
              label={t.postYourAd}
              onClick={() => navigate('/post-ad')}
              className="cta-btn"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;

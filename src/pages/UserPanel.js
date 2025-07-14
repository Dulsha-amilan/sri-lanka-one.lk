import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import './UserPanel.css';

const UserPanel = ({ language, isMobile }) => {
  const [myAds, setMyAds] = useState([]);
  const [savedListings, setSavedListings] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const toast = useRef(null);

  const translations = {
    en: {
      title: 'My Dashboard',
      myAds: 'My Ads',
      savedListings: 'Saved Listings',
      editProfile: 'Edit Profile',
      adTitle: 'Ad Title',
      category: 'Category',
      price: 'Price',
      status: 'Status',
      datePosted: 'Date Posted',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      active: 'Active',
      pending: 'Pending',
      expired: 'Expired',
      sold: 'Sold',
      noAds: 'You have no ads posted yet',
      noSaved: 'You have no saved listings',
      confirmDelete: 'Are you sure you want to delete this ad?',
      deleteSuccess: 'Ad deleted successfully',
      editAd: 'Edit Ad',
      save: 'Save',
      cancel: 'Cancel'
    },
    si: {
      title: 'මගේ උපකරණ පුවරුව',
      myAds: 'මගේ දැන්වීම්',
      savedListings: 'සුරකින ලද ලැයිස්තු',
      editProfile: 'පැතිකඩ සංස්කරණය',
      adTitle: 'දැන්වීම් මාතෘකාව',
      category: 'කාණ්ඩය',
      price: 'මිල',
      status: 'තත්ත්වය',
      datePosted: 'පළ කළ දිනය',
      actions: 'ක්‍රියාමාර්ග',
      edit: 'සංස්කරණය',
      delete: 'මකන්න',
      view: 'බලන්න',
      active: 'සක්‍රිය',
      pending: 'පොරොත්තුවෙන්',
      expired: 'කල් ඉකුත්',
      sold: 'විකුණන ලද',
      noAds: 'ඔබ තවම දැන්වීම් පළ කර නැත',
      noSaved: 'ඔබට සුරකින ලද ලැයිස්තු නැත',
      confirmDelete: 'ඔබට මෙම දැන්වීම මකා දැමීමට අවශ්‍ය බව විශ්වාසද?',
      deleteSuccess: 'දැන්වීම සාර්ථකව මකා දමන ලදී',
      editAd: 'දැන්වීම සංස්කරණය',
      save: 'සුරකින්න',
      cancel: 'අවලංගු කරන්න'
    }
  };

  const t = translations[language];

  // Mock data
  useEffect(() => {
    const mockMyAds = [
      {
        id: 1,
        title: 'Honda CB 150R - Excellent Condition',
        category: 'Motorcycles',
        price: 450000,
        status: 'active',
        datePosted: '2024-01-15',
        views: 156,
        image: '/api/placeholder/100/80'
      },
      {
        id: 2,
        title: 'Yamaha FZ Headlight Assembly',
        category: 'Spare Parts',
        price: 8500,
        status: 'pending',
        datePosted: '2024-01-10',
        views: 23,
        image: '/api/placeholder/100/80'
      },
      {
        id: 3,
        title: 'Shoei Helmet - Full Face',
        category: 'Biker Gear',
        price: 25000,
        status: 'sold',
        datePosted: '2024-01-05',
        views: 89,
        image: '/api/placeholder/100/80'
      }
    ];

    const mockSavedListings = [
      {
        id: 1,
        title: 'Kawasaki Ninja 250R',
        category: 'Motorcycles',
        price: 680000,
        location: 'Colombo',
        dateSaved: '2024-01-12',
        image: '/api/placeholder/100/80'
      },
      {
        id: 2,
        title: 'Alpinestars Gloves',
        category: 'Biker Gear',
        price: 15000,
        location: 'Kandy',
        dateSaved: '2024-01-08',
        image: '/api/placeholder/100/80'
      }
    ];

    setMyAds(mockMyAds);
    setSavedListings(mockSavedListings);
  }, []);

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { severity: 'success', label: t.active },
      pending: { severity: 'warning', label: t.pending },
      expired: { severity: 'danger', label: t.expired },
      sold: { severity: 'info', label: t.sold }
    };

    const config = statusConfig[status] || statusConfig.active;
    return <Badge value={config.label} severity={config.severity} />;
  };

  const handleEdit = (ad) => {
    setSelectedAd(ad);
    setEditDialog(true);
  };

  const handleDelete = (ad) => {
    if (window.confirm(t.confirmDelete)) {
      setMyAds(myAds.filter(item => item.id !== ad.id));
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: t.deleteSuccess,
        life: 3000
      });
    }
  };

  const handleSave = () => {
    // Update the ad in the list
    setMyAds(myAds.map(ad => 
      ad.id === selectedAd.id ? selectedAd : ad
    ));
    setEditDialog(false);
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Ad updated successfully',
      life: 3000
    });
  };

  const removeSavedListing = (listing) => {
    setSavedListings(savedListings.filter(item => item.id !== listing.id));
    toast.current.show({
      severity: 'info',
      summary: 'Removed',
      detail: 'Listing removed from saved items',
      life: 3000
    });
  };

  // Column templates
  const imageTemplate = (rowData) => (
    <img src={rowData.image} alt={rowData.title} className="ad-image" />
  );

  const titleTemplate = (rowData) => (
    <div className="ad-title-cell">
      <h4>{rowData.title}</h4>
      <span className="ad-category">{rowData.category}</span>
    </div>
  );

  const priceTemplate = (rowData) => (
    <span className="ad-price">{formatPrice(rowData.price)}</span>
  );

  const statusTemplate = (rowData) => getStatusBadge(rowData.status);

  const dateTemplate = (rowData) => formatDate(rowData.datePosted);

  const actionsTemplate = (rowData) => (
    <div className="ad-actions">
      <Button
        icon="pi pi-eye"
        className="p-button-rounded p-button-text"
        tooltip={t.view}
      />
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text"
        tooltip={t.edit}
        onClick={() => handleEdit(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-text p-button-danger"
        tooltip={t.delete}
        onClick={() => handleDelete(rowData)}
      />
    </div>
  );

  const savedActionsTemplate = (rowData) => (
    <div className="ad-actions">
      <Button
        icon="pi pi-eye"
        className="p-button-rounded p-button-text"
        tooltip={t.view}
      />
      <Button
        icon="pi pi-heart-fill"
        className="p-button-rounded p-button-text p-button-danger"
        tooltip="Remove"
        onClick={() => removeSavedListing(rowData)}
      />
    </div>
  );

  const renderMyAds = () => (
    <div className="my-ads-section">
      {myAds.length > 0 ? (
        <DataTable
          value={myAds}
          className="ads-table"
          responsiveLayout="scroll"
          paginator
          rows={10}
        >
          <Column body={imageTemplate} header="" style={{ width: '80px' }} />
          <Column body={titleTemplate} header={t.adTitle} />
          <Column body={priceTemplate} header={t.price} />
          <Column body={statusTemplate} header={t.status} />
          <Column body={dateTemplate} header={t.datePosted} />
          <Column body={actionsTemplate} header={t.actions} style={{ width: '120px' }} />
        </DataTable>
      ) : (
        <div className="empty-state">
          <i className="pi pi-plus-circle text-6xl"></i>
          <h3>{t.noAds}</h3>
          <Button label="Post Your First Ad" />
        </div>
      )}
    </div>
  );

  const renderSavedListings = () => (
    <div className="saved-listings-section">
      {savedListings.length > 0 ? (
        <DataTable
          value={savedListings}
          className="ads-table"
          responsiveLayout="scroll"
          paginator
          rows={10}
        >
          <Column body={imageTemplate} header="" style={{ width: '80px' }} />
          <Column body={titleTemplate} header={t.adTitle} />
          <Column body={priceTemplate} header={t.price} />
          <Column 
            field="location" 
            header="Location" 
            body={(rowData) => (
              <span><i className="pi pi-map-marker"></i> {rowData.location}</span>
            )}
          />
          <Column 
            body={(rowData) => formatDate(rowData.dateSaved)} 
            header="Date Saved" 
          />
          <Column body={savedActionsTemplate} header={t.actions} style={{ width: '120px' }} />
        </DataTable>
      ) : (
        <div className="empty-state">
          <i className="pi pi-heart text-6xl"></i>
          <h3>{t.noSaved}</h3>
          <Button label="Browse Listings" />
        </div>
      )}
    </div>
  );

  return (
    <div className="user-panel-page">
      <Toast ref={toast} />
      
      <div className="page-header">
        <h1>{t.title}</h1>
        <Button
          label={t.editProfile}
          icon="pi pi-user-edit"
          className="edit-profile-btn"
        />
      </div>

      <div className="dashboard-stats">
        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-number">{myAds.length}</div>
            <div className="stat-label">Total Ads</div>
          </div>
          <i className="pi pi-list stat-icon"></i>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-number">{myAds.filter(ad => ad.status === 'active').length}</div>
            <div className="stat-label">Active Ads</div>
          </div>
          <i className="pi pi-check-circle stat-icon"></i>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-number">{savedListings.length}</div>
            <div className="stat-label">Saved Items</div>
          </div>
          <i className="pi pi-heart stat-icon"></i>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-number">{myAds.reduce((sum, ad) => sum + ad.views, 0)}</div>
            <div className="stat-label">Total Views</div>
          </div>
          <i className="pi pi-eye stat-icon"></i>
        </Card>
      </div>

      <Card className="main-content-card">
        <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
          <TabPanel header={t.myAds}>
            {renderMyAds()}
          </TabPanel>
          <TabPanel header={t.savedListings}>
            {renderSavedListings()}
          </TabPanel>
        </TabView>
      </Card>

      {/* Edit Dialog */}
      <Dialog
        visible={editDialog}
        onHide={() => setEditDialog(false)}
        header={t.editAd}
        style={{ width: isMobile ? '95vw' : '50vw' }}
      >
        {selectedAd && (
          <div className="edit-form">
            <div className="form-group">
              <label>Title</label>
              <InputText
                value={selectedAd.title}
                onChange={(e) => setSelectedAd({...selectedAd, title: e.target.value})}
                className="w-full"
              />
            </div>
            
            <div className="form-group">
              <label>Price</label>
              <InputText
                value={selectedAd.price}
                onChange={(e) => setSelectedAd({...selectedAd, price: e.target.value})}
                className="w-full"
              />
            </div>

            <div className="dialog-actions">
              <Button
                label={t.cancel}
                onClick={() => setEditDialog(false)}
                className="p-button-outlined"
              />
              <Button
                label={t.save}
                onClick={handleSave}
                className="save-btn"
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default UserPanel;

import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { useRef } from 'react';
import './PostAd.css';

const PostAd = ({ language, isMobile }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    title: '',
    description: '',
    price: null,
    brand: '',
    model: '',
    year: null,
    condition: '',
    mileage: null,
    location: '',
    contactName: '',
    contactPhone: '',
    contactWhatsApp: '',
    images: [],
    terms: false
  });
  const toast = useRef(null);

  const translations = {
    en: {
      title: 'Post Your Ad',
      step1: 'Category',
      step2: 'Details',
      step3: 'Contact',
      step4: 'Preview',
      selectCategory: 'Select Category',
      selectSubcategory: 'Select Subcategory',
      adTitle: 'Ad Title',
      description: 'Description',
      price: 'Price (Rs.)',
      brand: 'Brand',
      model: 'Model',
      year: 'Year',
      condition: 'Condition',
      mileage: 'Mileage (km)',
      location: 'Location',
      contactName: 'Contact Name',
      contactPhone: 'Contact Phone',
      contactWhatsApp: 'WhatsApp Number',
      uploadImages: 'Upload Images',
      terms: 'I agree to the terms and conditions',
      next: 'Next',
      previous: 'Previous',
      publish: 'Publish Ad',
      preview: 'Preview',
      required: 'This field is required',
      success: 'Ad published successfully!',
      error: 'Please fill all required fields'
    },
    si: {
      title: 'ඔබේ දැන්වීම පළ කරන්න',
      step1: 'කාණ්ඩය',
      step2: 'විස්තර',
      step3: 'සම්බන්ධතා',
      step4: 'පෙරදසුන',
      selectCategory: 'කාණ්ඩය තෝරන්න',
      selectSubcategory: 'උප කාණ්ඩය තෝරන්න',
      adTitle: 'දැන්වීම් මාතෘකාව',
      description: 'විස්තරය',
      price: 'මිල (රු.)',
      brand: 'සන්නාමය',
      model: 'මාදිලිය',
      year: 'වර්ෂය',
      condition: 'තත්ත්වය',
      mileage: 'සැතපුම් (කි.මී.)',
      location: 'ස්ථානය',
      contactName: 'සම්බන්ධතා නම',
      contactPhone: 'සම්බන්ධතා දුරකථනය',
      contactWhatsApp: 'WhatsApp අංකය',
      uploadImages: 'පින්තූර උඩුගත කරන්න',
      terms: 'මම නියම සහ කොන්දේසි වලට එකඟ වෙමි',
      next: 'ඊළඟ',
      previous: 'පෙර',
      publish: 'දැන්වීම පළ කරන්න',
      preview: 'පෙරදසුන',
      required: 'මෙම ක්ෂේත්‍රය අවශ්‍යයි',
      success: 'දැන්වීම සාර්ථකව පළ කරන ලදී!',
      error: 'කරුණාකර සියලුම අවශ්‍ය ක්ෂේත්‍ර පුරවන්න'
    }
  };

  const t = translations[language];

  const steps = [
    { label: t.step1 },
    { label: t.step2 },
    { label: t.step3 },
    { label: t.step4 }
  ];

  const categories = [
    { label: 'Motorcycles', value: 'motorcycles' },
    { label: 'Spare Parts', value: 'spare-parts' },
    { label: 'Biker Gear', value: 'biker-gear' }
  ];

  const subcategories = {
    motorcycles: [
      { label: 'Trail Bikes', value: 'trail' },
      { label: 'Cruisers', value: 'cruisers' },
      { label: 'Scooters', value: 'scooters' },
      { label: 'Sports Bikes', value: 'sports' }
    ],
    'spare-parts': [
      { label: 'Engine Parts', value: 'engine' },
      { label: 'Tyres & Rims', value: 'tyres' },
      { label: 'Lights & Electrical', value: 'electrical' }
    ],
    'biker-gear': [
      { label: 'Helmets', value: 'helmets' },
      { label: 'Jackets', value: 'jackets' },
      { label: 'Gloves', value: 'gloves' }
    ]
  };

  const brands = [
    { label: 'Honda', value: 'honda' },
    { label: 'Yamaha', value: 'yamaha' },
    { label: 'Bajaj', value: 'bajaj' },
    { label: 'TVS', value: 'tvs' }
  ];

  const conditions = [
    { label: 'New', value: 'new' },
    { label: 'Used', value: 'used' },
    { label: 'Refurbished', value: 'refurbished' }
  ];

  const locations = [
    { label: 'Colombo', value: 'colombo' },
    { label: 'Kandy', value: 'kandy' },
    { label: 'Galle', value: 'galle' },
    { label: 'Jaffna', value: 'jaffna' }
  ];

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(activeStep + 1);
    } else {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: t.error,
        life: 3000
      });
    }
  };

  const handlePrevious = () => {
    setActiveStep(activeStep - 1);
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return formData.category && formData.subcategory;
      case 1:
        return formData.title && formData.description && formData.price;
      case 2:
        return formData.contactName && formData.contactPhone && formData.location;
      case 3:
        return formData.terms;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: t.success,
        life: 3000
      });
      // Here you would typically send the data to your backend
      console.log('Form Data:', formData);
    }
  };

  const onImageUpload = (event) => {
    setFormData({
      ...formData,
      images: [...formData.images, ...event.files]
    });
  };

  const renderStep1 = () => (
    <Card className="step-card">
      <h3>{t.step1}</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>{t.selectCategory} *</label>
          <Dropdown
            value={formData.category}
            options={categories}
            onChange={(e) => setFormData({...formData, category: e.value, subcategory: ''})}
            placeholder={t.selectCategory}
            className="w-full"
          />
        </div>
        
        {formData.category && (
          <div className="form-group">
            <label>{t.selectSubcategory} *</label>
            <Dropdown
              value={formData.subcategory}
              options={subcategories[formData.category] || []}
              onChange={(e) => setFormData({...formData, subcategory: e.value})}
              placeholder={t.selectSubcategory}
              className="w-full"
            />
          </div>
        )}
      </div>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="step-card">
      <h3>{t.step2}</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>{t.adTitle} *</label>
          <InputText
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder={t.adTitle}
            className="w-full"
          />
        </div>

        <div className="form-group">
          <label>{t.description} *</label>
          <InputTextarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder={t.description}
            rows={4}
            className="w-full"
          />
        </div>

        <div className="form-group">
          <label>{t.price} *</label>
          <InputNumber
            value={formData.price}
            onValueChange={(e) => setFormData({...formData, price: e.value})}
            placeholder={t.price}
            className="w-full"
            currency="LKR"
            locale="en-US"
          />
        </div>

        {formData.category === 'motorcycles' && (
          <>
            <div className="form-group">
              <label>{t.brand}</label>
              <Dropdown
                value={formData.brand}
                options={brands}
                onChange={(e) => setFormData({...formData, brand: e.value})}
                placeholder={t.brand}
                className="w-full"
              />
            </div>

            <div className="form-group">
              <label>{t.model}</label>
              <InputText
                value={formData.model}
                onChange={(e) => setFormData({...formData, model: e.target.value})}
                placeholder={t.model}
                className="w-full"
              />
            </div>

            <div className="form-group">
              <label>{t.year}</label>
              <InputNumber
                value={formData.year}
                onValueChange={(e) => setFormData({...formData, year: e.value})}
                placeholder={t.year}
                className="w-full"
                min={1990}
                max={2024}
              />
            </div>

            <div className="form-group">
              <label>{t.mileage}</label>
              <InputNumber
                value={formData.mileage}
                onValueChange={(e) => setFormData({...formData, mileage: e.value})}
                placeholder={t.mileage}
                className="w-full"
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>{t.condition}</label>
          <Dropdown
            value={formData.condition}
            options={conditions}
            onChange={(e) => setFormData({...formData, condition: e.value})}
            placeholder={t.condition}
            className="w-full"
          />
        </div>

        <div className="form-group full-width">
          <label>{t.uploadImages}</label>
          <FileUpload
            name="images"
            multiple
            accept="image/*"
            maxFileSize={5000000}
            onUpload={onImageUpload}
            emptyTemplate={<p>Drag and drop images here or click to select.</p>}
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="step-card">
      <h3>{t.step3}</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>{t.contactName} *</label>
          <InputText
            value={formData.contactName}
            onChange={(e) => setFormData({...formData, contactName: e.target.value})}
            placeholder={t.contactName}
            className="w-full"
          />
        </div>

        <div className="form-group">
          <label>{t.contactPhone} *</label>
          <InputText
            value={formData.contactPhone}
            onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
            placeholder={t.contactPhone}
            className="w-full"
          />
        </div>

        <div className="form-group">
          <label>{t.contactWhatsApp}</label>
          <InputText
            value={formData.contactWhatsApp}
            onChange={(e) => setFormData({...formData, contactWhatsApp: e.target.value})}
            placeholder={t.contactWhatsApp}
            className="w-full"
          />
        </div>

        <div className="form-group">
          <label>{t.location} *</label>
          <Dropdown
            value={formData.location}
            options={locations}
            onChange={(e) => setFormData({...formData, location: e.value})}
            placeholder={t.location}
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );

  const renderStep4 = () => (
    <Card className="step-card">
      <h3>{t.preview}</h3>
      <div className="preview-content">
        <div className="preview-section">
          <h4>{formData.title}</h4>
          <p className="preview-price">Rs. {formData.price?.toLocaleString()}</p>
          <p className="preview-description">{formData.description}</p>
        </div>

        {formData.category === 'motorcycles' && (
          <div className="preview-section">
            <h5>Details:</h5>
            <div className="preview-details">
              <span><strong>Brand:</strong> {formData.brand}</span>
              <span><strong>Model:</strong> {formData.model}</span>
              <span><strong>Year:</strong> {formData.year}</span>
              <span><strong>Condition:</strong> {formData.condition}</span>
              <span><strong>Mileage:</strong> {formData.mileage} km</span>
            </div>
          </div>
        )}

        <div className="preview-section">
          <h5>Contact:</h5>
          <div className="preview-contact">
            <span><strong>Name:</strong> {formData.contactName}</span>
            <span><strong>Phone:</strong> {formData.contactPhone}</span>
            <span><strong>Location:</strong> {formData.location}</span>
          </div>
        </div>

        <div className="terms-section">
          <Checkbox
            checked={formData.terms}
            onChange={(e) => setFormData({...formData, terms: e.checked})}
          />
          <label>{t.terms}</label>
        </div>
      </div>
    </Card>
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderStep1();
      case 1:
        return renderStep2();
      case 2:
        return renderStep3();
      case 3:
        return renderStep4();
      default:
        return null;
    }
  };

  return (
    <div className="post-ad-page">
      <Toast ref={toast} />
      
      <div className="page-header">
        <h1>{t.title}</h1>
      </div>

      <div className="steps-container">
        <Steps
          model={steps}
          activeIndex={activeStep}
          className="post-ad-steps"
        />
      </div>

      <div className="form-container">
        {renderStepContent()}
      </div>

      <div className="form-actions">
        {activeStep > 0 && (
          <Button
            label={t.previous}
            onClick={handlePrevious}
            className="p-button-outlined"
          />
        )}
        
        {activeStep < 3 ? (
          <Button
            label={t.next}
            onClick={handleNext}
            className="next-btn"
          />
        ) : (
          <Button
            label={t.publish}
            onClick={handleSubmit}
            className="publish-btn"
          />
        )}
      </div>
    </div>
  );
};

export default PostAd;

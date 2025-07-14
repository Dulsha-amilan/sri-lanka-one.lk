import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import './BikeHelp.css';

const BikeHelp = ({ language, isMobile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const translations = {
    en: {
      title: 'Bike Help & Tips',
      search: 'Search help topics...',
      registration: 'Registration & Ownership',
      problems: 'Common Problems & Fixes',
      insurance: 'Insurance Guides',
      safety: 'Buyer & Seller Safety',
      searchResults: 'Search Results',
      noResults: 'No results found for your search',
      readMore: 'Read More',
      helpful: 'Was this helpful?',
      yes: 'Yes',
      no: 'No'
    },
    si: {
      title: 'බයිසිකල් උදව් සහ ඉඟි',
      search: 'උදව් මාතෘකා සොයන්න...',
      registration: 'ලියාපදිංචි කිරීම සහ හිමිකාරිත්වය',
      problems: 'සාමාන්‍ය ගැටළු සහ විසඳුම්',
      insurance: 'රක්ෂණ මාර්ගෝපදේශ',
      safety: 'ගැනුම්කරු සහ විකුණුම්කරු ආරක්ෂාව',
      searchResults: 'සෙවුම් ප්‍රතිඵල',
      noResults: 'ඔබේ සෙවුම සඳහා ප්‍රතිඵල හමු නොවීය',
      readMore: 'තව කියවන්න',
      helpful: 'මෙය ප්‍රයෝජනවත් වූවාද?',
      yes: 'ඔව්',
      no: 'නැත'
    }
  };

  const t = translations[language];

  const helpContent = {
    registration: [
      {
        title: 'How to Register a New Motorcycle',
        content: 'Step-by-step guide to register your new motorcycle with the Department of Motor Traffic (DMT).',
        details: `
          1. Visit the nearest DMT office with required documents
          2. Fill out the registration form (Form A)
          3. Submit vehicle inspection report
          4. Pay registration fees
          5. Obtain registration certificate and number plates
          
          Required Documents:
          - Invoice from dealer
          - Insurance certificate
          - National ID card
          - Proof of address
        `
      },
      {
        title: 'Ownership Transfer Process',
        content: 'Complete guide for transferring motorcycle ownership between parties.',
        details: `
          1. Both parties must visit DMT office together
          2. Fill out transfer form (Form B)
          3. Submit current registration certificate
          4. Provide valid insurance certificate
          5. Pay transfer fees
          6. Update registration details
          
          Required from Seller:
          - Original registration certificate
          - National ID card
          - NOC (if vehicle is financed)
          
          Required from Buyer:
          - National ID card
          - Proof of address
          - Insurance certificate
        `
      },
      {
        title: 'Duplicate Registration Certificate',
        content: 'How to obtain a duplicate registration certificate if original is lost or damaged.',
        details: `
          1. File a police report for lost documents
          2. Visit DMT office with police report
          3. Fill out duplicate certificate application
          4. Submit affidavit and required documents
          5. Pay duplicate certificate fees
          
          Required Documents:
          - Police report
          - Affidavit
          - National ID card
          - Proof of address
        `
      }
    ],
    problems: [
      {
        title: 'Engine Won\'t Start',
        content: 'Common reasons why your motorcycle engine won\'t start and how to fix them.',
        details: `
          Common Causes:
          1. Dead battery - Check battery voltage and connections
          2. Fuel issues - Ensure fuel tank has petrol and fuel lines are clear
          3. Spark plug problems - Clean or replace spark plug
          4. Clogged air filter - Clean or replace air filter
          5. Faulty starter motor - Check starter motor connections
          
          Quick Fixes:
          - Try kick-starting if electric start fails
          - Check kill switch position
          - Ensure motorcycle is in neutral
          - Check fuel petcock position
        `
      },
      {
        title: 'Brake Problems',
        content: 'How to identify and fix common brake issues for safety.',
        details: `
          Warning Signs:
          1. Squealing or grinding noises
          2. Soft or spongy brake lever/pedal
          3. Brake lever goes to handlebar
          4. Vibration when braking
          5. Motorcycle pulls to one side
          
          Solutions:
          - Replace brake pads if worn
          - Bleed brake system if spongy
          - Check brake fluid level
          - Inspect brake discs for damage
          - Adjust brake cable tension
          
          Safety Note: Always consult a professional for brake repairs
        `
      },
      {
        title: 'Overheating Issues',
        content: 'Prevent and fix motorcycle overheating problems.',
        details: `
          Common Causes:
          1. Low coolant level
          2. Blocked radiator
          3. Faulty thermostat
          4. Water pump issues
          5. Damaged cooling fan
          
          Prevention:
          - Regular coolant changes
          - Clean radiator fins
          - Check coolant level regularly
          - Avoid prolonged idling in traffic
          - Service cooling system annually
          
          Immediate Actions:
          - Stop riding immediately
          - Let engine cool down
          - Check coolant level when cool
          - Inspect for leaks
        `
      }
    ],
    insurance: [
      {
        title: 'Types of Motorcycle Insurance',
        content: 'Understanding different types of motorcycle insurance available in Sri Lanka.',
        details: `
          1. Third Party Insurance (Mandatory):
          - Covers damage to other vehicles/property
          - Personal injury to third parties
          - Minimum legal requirement
          
          2. Comprehensive Insurance:
          - Covers own vehicle damage
          - Theft protection
          - Natural disaster coverage
          - Personal accident benefits
          
          3. Third Party, Fire & Theft:
          - Third party coverage
          - Fire damage protection
          - Theft coverage
          - More affordable than comprehensive
        `
      },
      {
        title: 'How to Claim Insurance',
        content: 'Step-by-step process for making motorcycle insurance claims.',
        details: `
          Immediate Steps:
          1. Ensure safety of all parties
          2. Call police if required
          3. Take photos of damage
          4. Exchange information with other parties
          5. Note down witness details
          
          Claim Process:
          1. Notify insurance company within 24 hours
          2. Submit claim form with required documents
          3. Arrange vehicle inspection
          4. Get repair estimates
          5. Follow up on claim status
          
          Required Documents:
          - Insurance certificate
          - Registration certificate
          - Driving license
          - Police report (if applicable)
          - Repair estimates
        `
      },
      {
        title: 'Choosing the Right Insurance',
        content: 'Tips for selecting the best motorcycle insurance policy.',
        details: `
          Factors to Consider:
          1. Vehicle value and age
          2. Usage pattern (daily/occasional)
          3. Parking location (secure/street)
          4. Riding experience
          5. Budget constraints
          
          Coverage Options:
          - Passenger liability
          - Medical expenses
          - Roadside assistance
          - Replacement vehicle
          - Accessories coverage
          
          Money-Saving Tips:
          - Compare quotes from multiple insurers
          - Maintain good driving record
          - Install security devices
          - Consider higher deductibles
          - Bundle with other policies
        `
      }
    ],
    safety: [
      {
        title: 'Safe Buying Tips',
        content: 'Essential safety tips when buying a used motorcycle.',
        details: `
          Before Meeting:
          1. Verify seller identity and contact details
          2. Research market value of the motorcycle
          3. Meet in public, well-lit locations
          4. Bring a knowledgeable friend
          5. Inform someone about your plans
          
          During Inspection:
          1. Check all documents thoroughly
          2. Verify VIN/chassis number
          3. Test ride in safe area
          4. Inspect for accident damage
          5. Check maintenance records
          
          Payment Safety:
          - Avoid cash transactions for high amounts
          - Use bank transfers or certified checks
          - Complete paperwork before payment
          - Get proper receipts
          - Verify ownership transfer
        `
      },
      {
        title: 'Safe Selling Tips',
        content: 'How to safely sell your motorcycle online.',
        details: `
          Listing Safety:
          1. Don't include personal information in ads
          2. Use watermarked photos
          3. Meet buyers in public places
          4. Verify buyer identity
          5. Be cautious of overpayment scams
          
          During Meetings:
          1. Meet during daylight hours
          2. Bring a friend for support
          3. Allow test rides only with valid license
          4. Hold buyer's license during test ride
          5. Accompany buyer during test ride
          
          Payment Security:
          - Accept bank transfers or cash
          - Verify payment before transfer
          - Complete ownership transfer immediately
          - Provide proper documentation
          - Keep records of transaction
        `
      },
      {
        title: 'Avoiding Scams',
        content: 'Common scams in motorcycle buying/selling and how to avoid them.',
        details: `
          Common Scams:
          1. Fake payment confirmations
          2. Overpayment scams
          3. Stolen vehicle sales
          4. Fake documentation
          5. Advance fee frauds
          
          Red Flags:
          - Prices too good to be true
          - Pressure to decide quickly
          - Reluctance to meet in person
          - Requests for advance payments
          - Incomplete or suspicious documents
          
          Protection Measures:
          - Verify all documents with authorities
          - Use secure payment methods
          - Meet in public places
          - Trust your instincts
          - Report suspicious activities
        `
      }
    ]
  };

  const filteredContent = () => {
    if (!searchTerm) return null;
    
    const results = [];
    Object.keys(helpContent).forEach(category => {
      helpContent[category].forEach(item => {
        if (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.details.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({ ...item, category });
        }
      });
    });
    
    return results;
  };

  const renderContent = (items) => (
    <div className="help-items">
      {items.map((item, index) => (
        <Card key={index} className="help-item-card">
          <div className="help-item-header">
            <h3>{item.title}</h3>
          </div>
          <p className="help-item-summary">{item.content}</p>
          <Accordion>
            <AccordionTab header={t.readMore}>
              <div className="help-item-details">
                {item.details.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </AccordionTab>
          </Accordion>
          <div className="help-feedback">
            <span>{t.helpful}</span>
            <Button label={t.yes} className="p-button-text p-button-sm" />
            <Button label={t.no} className="p-button-text p-button-sm" />
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="bike-help-page">
      <div className="page-header">
        <h1>{t.title}</h1>
        <div className="search-section">
          <InputText
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.search}
            className="help-search"
          />
        </div>
      </div>

      {searchTerm ? (
        <div className="search-results">
          <h2>{t.searchResults}</h2>
          {filteredContent().length > 0 ? (
            renderContent(filteredContent())
          ) : (
            <div className="no-results">
              <i className="pi pi-search text-4xl"></i>
              <p>{t.noResults}</p>
            </div>
          )}
        </div>
      ) : (
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header={t.registration}>
            {renderContent(helpContent.registration)}
          </TabPanel>
          <TabPanel header={t.problems}>
            {renderContent(helpContent.problems)}
          </TabPanel>
          <TabPanel header={t.insurance}>
            {renderContent(helpContent.insurance)}
          </TabPanel>
          <TabPanel header={t.safety}>
            {renderContent(helpContent.safety)}
          </TabPanel>
        </TabView>
      )}
    </div>
  );
};

export default BikeHelp;

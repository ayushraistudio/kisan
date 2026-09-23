"use client";

import { useTranslation } from 'react-i18next';
import { Search, Mic, Bell, User } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Topbar() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    toast.success('Language updated');
  };

  const languages = [
    { code: 'en', label: '🌐 English' },
    { code: 'hi', label: '🌐 हिन्दी (Hindi)' },
    { code: 'gu', label: '🌐 ગુજરાતી (Gujarati)' },
    { code: 'mr', label: '🌐 मराठी (Marathi)' },
    { code: 'bn', label: '🌐 বাংলা (Bengali)' },
    { code: 'pa', label: '🌐 ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'ta', label: '🌐 தமிழ் (Tamil)' },
    { code: 'te', label: '🌐 తెలుగు (Telugu)' },
    { code: 'kn', label: '🌐 ಕನ್ನಡ (Kannada)' },
    { code: 'ml', label: '🌐 മലയാളം (Malayalam)' },
    { code: 'or', label: '🌐 ଓଡ଼ିଆ (Odia)' },
    { code: 'as', label: '🌐 অসমীয়া (Assamese)' }
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: '260px', right: 0, height: '80px',
      backgroundColor: '#0a0514', // Deep purple dark theme
      borderBottom: '1px solid #23163b', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', zIndex: 10
    }}>
      {/* Search Input */}
      <div style={{
        display: 'flex', alignItems: 'center', backgroundColor: '#160d2b',
        border: '1px solid #2d1f4a', borderRadius: '8px', padding: '10px 16px', width: '450px'
      }}>
        <Search style={{ color: '#8b849c', width: '20px', height: '20px' }} />
        <input 
          type="text" 
          placeholder={t('topbar.searchPlaceholder', 'Search village, district or farm location...')}
          style={{ background: 'transparent', border: 'none', color: '#FFF', marginLeft: '12px', width: '100%', outline: 'none' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {/* Multilingual Switcher */}
        <select 
          onChange={toggleLanguage} 
          value={i18n.language}
          style={{
            padding: '8px 16px', backgroundColor: '#160d2b', color: '#FFF',
            border: '1px solid #2d1f4a', borderRadius: '8px', cursor: 'pointer', appearance: 'none'
          }}
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.label}</option>
          ))}
        </select>

        {/* Talk to Saathi Button */}
        <button style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 16px', backgroundColor: 'rgba(139, 92, 246, 0.2)', // Purple tint
          color: '#a78bfa', border: '1px solid #8b5cf6', borderRadius: '8px', cursor: 'pointer'
        }}>
          <Mic style={{ width: '16px', height: '16px' }} />
          Talk to Saathi
        </button>

        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell style={{ color: '#c4b5fd', width: '24px', height: '24px' }} />
          <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '10px', height: '10px', backgroundColor: '#ef4444', borderRadius: '50%' }}></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid #2d1f4a', paddingLeft: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2d1f4a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User style={{ color: '#c4b5fd', width: '20px', height: '20px' }} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#FFF' }}>Hello, Farmer</p>
            <p style={{ margin: 0, fontSize: '12px', color: '#8b849c' }}>ID: 240033</p>
          </div>
        </div>
      </div>
    </header>
  );
}
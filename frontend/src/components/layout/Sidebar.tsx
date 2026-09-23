"use client";

import { useTranslation } from 'react-i18next';
import { Home, Map, Camera, Leaf, CloudSun, LineChart, BookOpen, Users, Bell, Settings } from 'lucide-react';

export default function Sidebar() {
  const { t } = useTranslation();

  const menuItems = [
    { icon: Home, label: t('sidebar.dashboard'), active: true },
    { icon: Map, label: t('sidebar.myFarm'), active: false },
    { icon: Camera, label: t('sidebar.diseaseDetection'), active: false },
    { icon: Leaf, label: t('sidebar.cropAdvisory'), active: false },
    { icon: CloudSun, label: t('sidebar.weather'), active: false },
    { icon: LineChart, label: t('sidebar.marketPrices'), active: false },
    { icon: BookOpen, label: t('sidebar.knowledgeHub'), active: false },
    { icon: Users, label: t('sidebar.expertConnect'), active: false },
    { icon: Bell, label: t('sidebar.alerts'), active: false, badge: 3 },
    { icon: Settings, label: t('sidebar.settings'), active: false },
  ];

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      backgroundColor: '#160d2b',
      borderRight: '1px solid #2a3644',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 20
    }}>
      <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #2a3644' }}>
        <Leaf style={{ color: '#45A29E', width: '32px', height: '32px' }} />
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', color: '#FFFFFF' }}>Kisan Saathi</h1>
          <p style={{ margin: 0, fontSize: '12px', color: '#45A29E' }}>Smart Farming</p>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item, index) => (
          <button key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '8px',
            border: item.active ? '1px solid #45A29E' : '1px solid transparent',
            backgroundColor: item.active ? 'rgba(69, 162, 158, 0.1)' : 'transparent',
            color: item.active ? '#45A29E' : '#C5C6C7',
            cursor: 'pointer',
            textAlign: 'left',
            outline: 'none',
            width: '100%'
          }}>
            <item.icon style={{ width: '20px', height: '20px' }} />
            <span style={{ flex: 1, fontSize: '14px', fontWeight: item.active ? 'bold' : 'normal' }}>{item.label}</span>
            {item.badge && (
              <span style={{ backgroundColor: '#EF4444', color: '#FFF', fontSize: '10px', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}
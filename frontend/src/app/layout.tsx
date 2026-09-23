"use client";

import { Toaster } from 'react-hot-toast';
import '../i18n/config';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        padding: 0, 
        boxSizing: 'border-box', 
        backgroundColor: '#0B0C10', 
        color: '#C5C6C7', 
        fontFamily: 'system-ui, -apple-system, sans-serif' 
      }}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
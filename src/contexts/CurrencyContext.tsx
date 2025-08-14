import React, { createContext, useContext, useState, useEffect } from 'react';

interface CurrencyContextType {
  region: 'Africa' | 'Worldwide';
  currency: 'NGN' | 'USD' | 'EUR' | 'GBP';
  setRegion: (region: 'Africa' | 'Worldwide') => void;
  setCurrency: (currency: 'NGN' | 'USD' | 'EUR' | 'GBP') => void;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Currency conversion rates (static for display only)
const exchangeRates = {
  NGN: 1,
  USD: 0.0012, // 1 NGN = 0.0012 USD
  EUR: 0.0011, // 1 NGN = 0.0011 EUR
  GBP: 0.0009, // 1 NGN = 0.0009 GBP
};

const currencySymbols = {
  NGN: '₦',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [region, setRegion] = useState<'Africa' | 'Worldwide'>('Africa');
  const [currency, setCurrency] = useState<'NGN' | 'USD' | 'EUR' | 'GBP'>('NGN');

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedRegion = localStorage.getItem('miv-region') as 'Africa' | 'Worldwide';
    const savedCurrency = localStorage.getItem('miv-currency') as 'NGN' | 'USD' | 'EUR' | 'GBP';
    
    if (savedRegion) setRegion(savedRegion);
    if (savedCurrency) setCurrency(savedCurrency);
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('miv-region', region);
    localStorage.setItem('miv-currency', currency);
  }, [region, currency]);

  // Auto-lock currency to NGN when region is Africa
  useEffect(() => {
    if (region === 'Africa') {
      setCurrency('NGN');
    }
  }, [region]);

  const handleSetRegion = (newRegion: 'Africa' | 'Worldwide') => {
    setRegion(newRegion);
  };

  const handleSetCurrency = (newCurrency: 'NGN' | 'USD' | 'EUR' | 'GBP') => {
    if (region === 'Africa' && newCurrency !== 'NGN') {
      return; // Don't allow non-NGN currencies for Africa region
    }
    setCurrency(newCurrency);
  };

  const formatPrice = (priceInNGN: number): string => {
    const convertedPrice = priceInNGN * exchangeRates[currency];
    const symbol = currencySymbols[currency];
    
    // Format the number appropriately for each currency
    if (currency === 'NGN') {
      return `${symbol}${priceInNGN.toLocaleString()}`;
    } else {
      return `${symbol}${convertedPrice.toFixed(0)}`;
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        region,
        currency,
        setRegion: handleSetRegion,
        setCurrency: handleSetCurrency,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrency } from '@/contexts/CurrencyContext';

const CurrencySelector = () => {
  const { region, currency, setRegion, setCurrency } = useCurrency();

  const currencies = [
    { code: 'USD' as const, name: 'US Dollar', symbol: '$' },
    { code: 'EUR' as const, name: 'Euro', symbol: '€' },
    { code: 'GBP' as const, name: 'British Pound', symbol: '£' },
  ];

  const getCurrentCurrencySymbol = () => {
    const symbols = { NGN: '₦', USD: '$', EUR: '€', GBP: '£' };
    return symbols[currency];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{region}</span>
          <span className="text-sm font-medium">{getCurrentCurrencySymbol()}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2">
          <p className="text-sm font-medium mb-2">Region</p>
          <div className="space-y-1">
            <Button
              variant={region === 'Africa' ? 'default' : 'ghost'}
              size="sm"
              className="w-full justify-start"
              onClick={() => setRegion('Africa')}
            >
              Africa
            </Button>
            <Button
              variant={region === 'Worldwide' ? 'default' : 'ghost'}
              size="sm"
              className="w-full justify-start"
              onClick={() => setRegion('Worldwide')}
            >
              Worldwide
            </Button>
          </div>
        </div>
        
        {region === 'Africa' ? (
          <div className="p-2">
            <DropdownMenuSeparator />
            <p className="text-sm font-medium mb-2">Currency</p>
            <div className="text-xs text-muted-foreground">
              Locked to Nigerian Naira (₦) for Africa region
            </div>
          </div>
        ) : (
          <div className="p-2">
            <DropdownMenuSeparator />
            <p className="text-sm font-medium mb-2">Currency</p>
            <div className="space-y-1">
              {currencies.map((curr) => (
                <Button
                  key={curr.code}
                  variant={currency === curr.code ? 'default' : 'ghost'}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setCurrency(curr.code)}
                >
                  <span className="mr-2">{curr.symbol}</span>
                  {curr.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;
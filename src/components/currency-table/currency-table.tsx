import { currencies as initialCurrencies} from '../../const/currencies';
import React, { useState, useEffect } from 'react';
import { getCurrenciesSubscription } from '../../api/currencies';
import { Currency } from '../../const/types';

export const CurrencyTable = () => {
  const interestingCurrencies = [
    "EUR",
    "USD",
    "DKK",
    "NOK",
    "GBP",
    "CHF",
    "JPY",
  ]

  const [currencies, setCurrencies] = useState(initialCurrencies);
  useEffect(() => {
    getCurrenciesSubscription().subscribe((apiCurrencies: Record<string, Currency>) => {
      setCurrencies(apiCurrencies)
    });
  }, []);
  
  return (
    <div className="currencyTable" style={{ textAlign: 'left' }}>
      {interestingCurrencies.map((c: string, i: number) => (
        <div 
          style={{
            padding: '2px 8px',
            backgroundColor: !!(i % 2) ? '#313640' : 'transparent'
          }} 
          key={currencies[c].currencyCode}
        >
          <span>{currencies[c].currencyCode} {currencies[c].icon}</span>
          <span style={{ float: 'right' }}>{currencies[c].exchangeRate}</span>
        </div>
      ))}
    </div>
  )
}

export default CurrencyTable;
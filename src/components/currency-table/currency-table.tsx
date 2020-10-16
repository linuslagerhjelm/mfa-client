import { currencies } from '../../const/currencies';
import React from 'react';

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
  
  return (
    <div className="currencyTable" style={{ textAlign: 'left' }}>
      {interestingCurrencies.map((c: string, i: number) => (
        <div style={{ padding: '2px 8px', backgroundColor: !!(i % 2) ? '#313640' : 'transparent' }}>
          <span>{currencies[c].currencyCode} {currencies[c].icon}</span>
          <span style={{ float: 'right' }}>-</span>
        </div>
      ))}
    </div>
  )
}

export default CurrencyTable;
import React from 'react';
import './App.css';
import CurrencyTable from './components/currency-table/currency-table';
import { CurrencyConverter } from './components/currency-converter/currency-converter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="content" style={{ width: '500px' }}>
          <h1 style={{ textAlign: 'left' }}>
            Exchange rates
          </h1>
          <CurrencyConverter />
          <CurrencyTable />
        </div>
      </header>
    </div>
  );
}

export default App;

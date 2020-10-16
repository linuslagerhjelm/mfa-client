import React from 'react';
import './App.css';
import CurrencyTable from './components/currency-table/currency-table';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="content">
          <h1>
            Exchange rates
          </h1>
          <CurrencyTable />
        </div>
      </header>
    </div>
  );
}

export default App;

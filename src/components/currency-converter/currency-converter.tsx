import React, { ChangeEvent, useState } from 'react';
import { createStyles, makeStyles, Theme, Paper, IconButton, InputBase, Divider, Select, MenuItem, withStyles, Button } from '@material-ui/core';
import { currencies } from '../../const/currencies';
import { convert } from '../../api/currencies';

type SimpleChange = ChangeEvent<{ name?: string | undefined; value: unknown; }>

export const CurrencyConverter = () => {

  const dropDownValues = Object.values(currencies);

  const classes = makeInputStyles();
  const BootstrapInput = makeSelectStyles(InputBase);

  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [inputValue, setInputValue] = useState('0');
  const [convertedValue, setConvertedValue] = useState('-');

  const changeCurrrency = (e: SimpleChange) => {
    setConvertedValue('-');
    setSelectedCurrency(e.target.value as string);
  }

  const updateInput = (e: SimpleChange) => {
    setInputValue(e.target.value as string);
  }

  const convertCurrency = () => {
    console.log({selectedCurrency, inputValue})
    convert({
      base: selectedCurrency,
      amount: parseFloat(inputValue),
      quote: 'SEK',
    }).then(value => {
      setConvertedValue(value.toString())
    });
  }

  return (
    <div className="currency-convreter" style={{ width: '100%' }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedCurrency}
        input={<BootstrapInput />}
        style={{
          width: '47%',
          marginBottom: '10px',
        }}
        onChange={changeCurrrency}
      >
        {dropDownValues.map(((currency, i) => (
          <MenuItem value={currency.currencyCode} key={`item${currency.currencyCode}${i.toString()}`}>
            <span key={`value${currency.currencyCode}`}>{currency.currencyName} ({currency.currencyCode})</span>
          </MenuItem>
        )))}
      </Select>
        <Paper
          component="form"
          className={classes.root}
          style={{
            width: 'calc(45% + 2px)',
            marginTop: '6px',
            marginLeft: '133px',
          }}
        >
          <InputBase
            className={classes.input}
            placeholder={currencies[selectedCurrency].currencyCode}
            inputProps={{ 'aria-label': 'convert currency' }}
            onChange={updateInput}
          />
  
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton color="primary" className={classes.iconButton} aria-label="directions">
            {currencies[selectedCurrency].icon}
        </IconButton>
        </Paper>
        <Button
          variant="contained"
          color="primary" 
          onClick={convertCurrency}
          style={{marginTop: '6px'}}>
          Convert
        </Button>
      <Paper
        component="form"
        className={classes.root}
        style={{
          width: 'calc(45% + 2px)',
          marginTop: '6px',
          marginLeft: '133px',
        }}
      >
          <InputBase
            className={classes.input}
            placeholder={`${convertedValue}`}
            inputProps={{ 'aria-label': 'convert currency' }}
            style={{color: 'black'}}
          />
  
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton color="primary" disabled className={classes.iconButton} aria-label="directions">
            {currencies['SEK'].icon}
        </IconButton>
        </Paper>
    </div>
  )
}

const makeInputStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}),
)

const makeSelectStyles = withStyles((theme: Theme) =>
createStyles({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}),
);
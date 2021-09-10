import React, { useEffect, useState } from 'react';
import { Select, InputNumber, Button } from 'antd';
import moment from 'moment';
import { StarFilled, StarOutlined } from '@ant-design/icons';

import { observer } from 'mobx-react';
import currencyStore from '../../../store/currencyStore';
import ConvertHistory from './ConvertHistory';
import CurrencyGraph from './CurrencyGraph';

const { Option } = Select;

const styles = {
  currencyInput: {
    width: 400,
  },
  currencySelector: {
    width: 400,
  },
  button: {
    width: 150,
  },
};

const Converter = observer(() => {
  const {
    isLoading, currencyArray,
    dataDisclaimer, dataTimeStamp,
  } = currencyStore;
  const [inputValue, setInputValue] = useState(1);
  const [inputSymbol, setInputSymbol] = useState('USD');
  const [convertValue, setConvertValue] = useState(undefined);
  const [convertSymbol, setConvertSymbol] = useState(undefined);

  const [inputSymbolFavourited, setInputSymbolFavourited] = useState(false);
  const [convertSymbolFavourited, setConvertSymbolFavourited] = useState(false);

  useEffect(() => {
    if (inputValue > 0 && inputSymbol && convertSymbol) {
      const result = currencyStore.convertCurrency(inputValue, inputSymbol, convertSymbol)
      setConvertValue(result);
    }
  }, [inputValue, inputSymbol, convertSymbol]);

  useEffect(() => {
    setInputSymbolFavourited(currencyStore.checkFavouriteCurrency(inputSymbol));
  }, [inputSymbol]);

  useEffect(() => {
    if (convertSymbol) {
      setConvertSymbolFavourited(currencyStore.checkFavouriteCurrency(convertSymbol));
    }
  }, [convertSymbol]);

  const saveToHistory = () => {
    currencyStore.addToHistory({
      id: `${moment().unix()}${Math.floor(Math.random() * 100)}`,
      from: inputValue,
      fromSymbol: inputSymbol,
      to: convertValue,
      toSymbol: convertSymbol,
    });
  }

  const toggleInputFavourite = () => {
    if (currencyStore.checkFavouriteCurrency(inputSymbol)) {
      currencyStore.removeFavouriteCurrency(inputSymbol);
      setInputSymbolFavourited(false)
    } else {
      currencyStore.addFavouriteCurrency(inputSymbol);
      setInputSymbolFavourited(true)
    }
  }

  const toggleConvertFavourite = () => {
    if (convertSymbol) {
      if (currencyStore.checkFavouriteCurrency(convertSymbol)) {
        currencyStore.removeFavouriteCurrency(convertSymbol);
        setConvertSymbolFavourited(false)
      } else {
        currencyStore.addFavouriteCurrency(convertSymbol);
        setConvertSymbolFavourited(true)
      }
    }
  }

  const switchInputSymbol = (currency) => {
    if (currency === convertSymbol) {
      setConvertSymbol(inputSymbol)
    }
    setInputSymbol(currency)
  }

  const switchConvertSymbol = (currency) => {
    if (currency === inputSymbol) {
      setInputSymbol(convertSymbol)
    }
    setConvertSymbol(currency)
  }

  return (
    <div className='flexColumn'>
      <CurrencyGraph
        switchInputSymbol={switchInputSymbol}
        switchConvertSymbol={switchConvertSymbol}
      />
      <i className='font--20 m4b'>
        {'From'}
      </i>
      <div className='flexRow flexCenterCenter m8b'>
        <InputNumber
          min={0}
          value={inputValue}
          onChange={setInputValue}
          style={styles.currencyInput}
          stringMode
        />
        <Select
          showSearch
          placeholder='Please select a currency'
          optionFilterProp="key"
          disabled={isLoading}
          value={inputSymbol}
          dropdownMatchSelectWidth={false}
          onChange={switchInputSymbol}
          style={styles.currencySelector}
        >
          {
            currencyArray.map(currency =>
              <Option key={`${currency.symbol}(${currency.name})`} value={currency.symbol}>
                {`${currency.symbol}(${currency.name})`}
              </Option>
            )
          }
        </Select>
        {inputSymbolFavourited
          ? <StarFilled onClick={toggleInputFavourite} />
          : <StarOutlined onClick={toggleInputFavourite} />
        }
      </div>
      <i className='font--20 m4b'>
        {'To'}
      </i>
      <div className='flexRow flexCenterCenter m8b'>
        <InputNumber
          min={0}
          value={convertValue}
          onChange={setConvertValue}
          style={styles.currencyInput}
          disabled
          stringMode
        />
        <Select
          showSearch
          placeholder='Please select a currency'
          optionFilterProp="key"
          disabled={isLoading}
          value={convertSymbol}
          dropdownMatchSelectWidth={false}
          onChange={switchConvertSymbol}
          style={styles.currencySelector}
        >
          {
            currencyArray.map(currency =>
              <Option key={`${currency.symbol}(${currency.name})`} value={currency.symbol}>
                {`${currency.symbol}(${currency.name})`}
              </Option>
            )
          }
        </Select>
        {convertSymbolFavourited
          ? <StarFilled onClick={toggleConvertFavourite} />
          : <StarOutlined onClick={toggleConvertFavourite} />
        }
      </div>
      <label className='font--18 m8b'>
        {dataTimeStamp && `Latest data from: ${dataTimeStamp}`}
      </label>
      <label className='font--12 m16b'>
        {dataDisclaimer}
      </label>
      <div className='flexRow flexCenterCenter m8b'>
        <Button
          className='mr8'
          style={styles.button}
          onClick={saveToHistory}
          disabled={!inputSymbol || !convertSymbol || isLoading}
        >
          Save to History
        </Button>
        <Button
          style={styles.button}
          onClick={() => {
            setInputValue(1);
            setInputSymbol('USD');
            setConvertSymbol(undefined);
            setConvertValue(undefined);
          }}
          disabled={isLoading}
        >
          Reset
        </Button>
      </div>
      <ConvertHistory />
    </div>
  );
});

export default Converter;
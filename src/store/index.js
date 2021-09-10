import _ from 'lodash';
import moment from 'moment';
import currencyStore from './currencyStore';

import {
  getAllCurrency, convertCurrency, getLatestRate, getTimeSeries,
} from '../api/serverRequest/currencyEpic';

export class Store {
  constructor() {
    this.load();
  }

  async load() {
    await this.initCurrencyStore();
  }

  async initCurrencyStore() {
    await this.getAllCurrencies();
    await this.latestRate();
  }

  async getAllCurrencies() {
    currencyStore.isLoading = true;
    let allCurrencyObject = await getAllCurrency();
    currencyStore.setCurrencyArray(allCurrencyObject);
    currencyStore.isLoading = false;
    return allCurrencyObject;
  }

  // can not be used on free paln
  async convert(value, from, to) {
    currencyStore.isLoading = true;
    let convertAmount = await convertCurrency(value, from, to);
    currencyStore.isLoading = false;
    return convertAmount;
  }

  async latestRate(baseCurrency) {
    currencyStore.isLoading = true;
    let latestRate = await getLatestRate(baseCurrency);
    currencyStore.setlatestRateObject(latestRate);
    currencyStore.isLoading = false;
    return latestRate;
  }

  async timeSeries() {
    const start = moment().subtract(1, 'month').format('YYYY-MM-DD')
    const end = moment().format('YYYY-MM-DD')
    let latestRate = await getTimeSeries(start, end, currencyStore.favouriteCurrency.join());
    // currencyStore.setlatestRateObject(latestRate);
    console.log(latestRate)
    return latestRate;
  }

}
export default new Store()

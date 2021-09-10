import _ from 'lodash';
import moment from 'moment';
import { set, get, observable, computed, makeObservable } from 'mobx';


export class CurrencyStore {
  constructor() {
    makeObservable(this);
  }

  @observable isLoading = false;
  @observable currencyArray = [];
  @observable latestRateObject = observable.object({});
  @observable favouriteCurrency = ['USD', 'CAD'];
  @observable history = [];
  @observable pageNumber = 1;

  @computed get dataDisclaimer() {
    return _.get(this.latestRateObject['USD'], 'disclaimer');
  }

  @computed get lastXHistory() {
    return this.history.slice(0, this.pageNumber * 10);
  }

  @computed get hasMoreHistory() {
    return this.pageNumber * 10 < this.history.length;
  }

  @computed get dataTimeStamp() {
    const timestamp = _.get(this.latestRateObject['USD'], 'timestamp');
    if (timestamp) {
      return moment.unix(timestamp).format("YYYY-MM-DD hh:mm:ss")
    }
    return '';
  }

  setCurrencyArray(currencyObject) {
    this.currencyArray = Object.keys(currencyObject).map((currency) => ({ symbol: currency, name: currencyObject[currency] }));
  }

  setlatestRateObject(latestRate) {
    set(this.latestRateObject, latestRate.base, latestRate);
  }

  getLatestRateByCode(code) {
    return _.get(get(this.latestRateObject, code), ['rates']);
  }

  convertCurrency(value, from, to) {
    const latestRate = this.getLatestRateByCode('USD');
    if (latestRate) {
      if (from === 'USD') {
        return value * (latestRate[to] || 1);
      } else {
        // since we cant change the base currency in free plan convert both to usd then compare
        return value / (latestRate[from] || 1) * (latestRate[to] || 1);;
      }
    }
    return undefined;
  }

  addFavouriteCurrency(code) {
    this.favouriteCurrency.push(code);
  }

  removeFavouriteCurrency(code) {
    this.favouriteCurrency = this.favouriteCurrency.filter(currency => currency !== code);
  }

  checkFavouriteCurrency(code) {
    return this.favouriteCurrency.includes(code);
  }

  addToHistory(newHistoryData) {
    this.history = [
      newHistoryData,
      ...this.history,
    ];
  }

  clearHistory() {
    this.history = [];
  }

  loadMoreHistory() {
    if (this.history.length > this.pageNumber * 10 ) {
      this.pageNumber = this.pageNumber + 1;
    }
  }

}
export default new CurrencyStore()

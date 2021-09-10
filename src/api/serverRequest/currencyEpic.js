import request from '../request';
import { appID } from '../request/config';

/**
 * get all supported currency
 * @returns Returns a json fil that parse into js object.
 */
export async function getAllCurrency() {
  let allCurrency = await request.get('/currencies.json');
  return JSON.parse(allCurrency);
}

/**
 * Not supported for free plan
 * @param {int} value The value to be converted
 * @param {string} from The base ('from') currency (3-letter code)
 * @param {string} to The target ('to') currency (3-letter code)
 * @returns Returns converted ammount //not tested
 */
export async function convertCurrency(value, from, to) {
  let res = await request.get(`/convert/${value}/${from}/${to}?app_id=${appID}`);
  return res
}

/**
 * free plan only supports USD as base currency
 * @returns Returns a .
 */
export async function getLatestRate() {
  let res = await request.get(`/latest.json?app_id=${appID}`);
  return JSON.parse(res);
}

/**
 * start
 * @param {string} start The time series start date in YYYY-MM-DD format
 * @param {string} end The time series end date in YYYY-MM-DD format (see notes)
 * @param {string} symbols Limit results to specific currencies (comma-separated list of 3-letter codes)
 * @returns Returns a .
 */
export async function getTimeSeries(start, end, symbols) {
  let res = await request.get(`/time-series.json?app_id=${appID}&start=${start}&end=${end}&symbols=${symbols}`);
  return JSON.parse(res);
}
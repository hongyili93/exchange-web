import _ from 'lodash';
import { backendAPI } from './config';

export async function request(url, method, body, ) {
  let relative = url.startsWith('/')
  if (relative) {
    url = backendAPI + url;
  }
  let data = {
    method: method || 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
  if (!_.isUndefined(body)) {
    data.body = JSON.stringify(body)
  }
  let response = await fetch(url, data)
  if (response.ok) {
    let result = null
    try {
      if (response.headers.get('content-type') === 'application/json') {
        result = await response.json()
      } else {
        result = await response.text()
      }
    } catch (e) {
      console.log(`Request fail for URL: ${url}`)
    }
    return result
  } else {
    console.log(`Request fail for URL: ${url}, status: ${response.status}`)
  }
}

export default {
  async get(url, ) {
    return await request(url, 'GET', undefined)
  },
  async post(url, body, ) {
    return await request(url, 'POST', body)
  },
  async put(url, body, ) {
    return await request(url, 'PUT', body)
  },
  async delete(url, body, ) {
    return await request(url, 'DELETE', body)
  }
}

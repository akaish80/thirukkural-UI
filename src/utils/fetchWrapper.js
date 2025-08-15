/* eslint-disable no-console */

async function responseHandler(response) {
  if (response.statusText !== 'OK') {
    console.log('Error');
  }
  const data = await response.json();
  return data;
}

export default async function fetchWrapper(path) {
  try {
    const response = await fetch(path);
    const result = await responseHandler(response);
    console.log('Suc');
    return result;
  } catch (errorObj) {
    console.log('Error', errorObj);
    return errorObj;
  }
}

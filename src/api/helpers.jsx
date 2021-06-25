const BASE_URL = 'https://boiling-refuge-66454.herokuapp.com';

export const request = async(url, options) => {
  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const result = await response.json();

  return result;
};

export const post = (url, data) => request(url, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(data),
});

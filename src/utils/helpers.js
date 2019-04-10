export const postUser = (company_name) => {
  return new Promise((resolve, reject) => {
    window.fetch('/api/companies', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ company_name }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    .then(data => {
      resolve(data)
    })
    .catch(err => reject(err))
  })
};

export const genNumbers = () => {
  return new Promise((resolve, reject) => {
    window.fetch('/api/generate', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    .then(data => {
      resolve(data)
    })
    .catch(err => reject(err))
  })
};

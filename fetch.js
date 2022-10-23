const axios = require('axios');

const userInfoFetcher = (token) => {
  return axios({
    url: 'https://api.github.com/graphql',
    method: 'post',
    headers: {
      Authorization: `bearer ${token}`,
    },
    data: {
      query: `
        query userInfo {
          viewer {
            name
            login
          }
        }`,
    },
  });
};

module.exports = {
  userInfoFetcher,
};

import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.giphy.com/v1/',
  params: {
    api_key: 'OcLKJ3izPTySFP1XJtcVnlOu33dVGPJ7',
  },
});
